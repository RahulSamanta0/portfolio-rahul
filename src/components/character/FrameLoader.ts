import * as THREE from "three";
import {
  TOTAL_FRAMES,
  getFramePath,
  PRELOAD_BATCHES,
  GPU_TEXTURE_WINDOW,
} from "./character.config";

export type ProgressCallback = (progress: number, loadedCount: number) => void;

/**
 * Manages progressive image preloading and Three.js GPU texture caching.
 */
export class FrameLoader {
  private images: (HTMLImageElement | null)[] = new Array(TOTAL_FRAMES).fill(null);
  private textureCache: Map<number, THREE.Texture> = new Map();
  private loadedCount: number = 0;
  private onProgressCallbacks: Set<ProgressCallback> = new Set();
  private isPreloading: boolean = false;
  private aborted: boolean = false;

  constructor() {
    // Initial setup
  }

  /**
   * Subscribe to frame loading progress updates (0 to 100%).
   */
  public onProgress(cb: ProgressCallback): () => void {
    this.onProgressCallbacks.add(cb);
    // Immediately emit current state
    cb(this.getProgress(), this.loadedCount);
    return () => this.onProgressCallbacks.delete(cb);
  }

  public getProgress(): number {
    return Math.min(100, Math.round((this.loadedCount / TOTAL_FRAMES) * 100));
  }

  public isInitialBatchReady(): boolean {
    // Ready when first batch (frames 0..30) is ready to display
    const firstBatchEnd = PRELOAD_BATCHES[0].end;
    let count = 0;
    for (let i = 0; i < firstBatchEnd; i++) {
      if (this.images[i]?.complete && this.images[i]?.naturalWidth !== 0) {
        count++;
      }
    }
    return count >= Math.min(15, firstBatchEnd);
  }

  /**
   * Starts progressive 3-phase preloading.
   */
  public startPreload(): void {
    if (this.isPreloading || this.aborted) return;
    this.isPreloading = true;

    // Load Phase 1 (0..30)
    this.loadBatch(PRELOAD_BATCHES[0].start, PRELOAD_BATCHES[0].end).then(() => {
      if (this.aborted) return;
      // Load Phase 2 (30..120)
      this.loadBatch(PRELOAD_BATCHES[1].start, PRELOAD_BATCHES[1].end).then(() => {
        if (this.aborted) return;
        // Load Phase 3 (120..240)
        this.loadBatch(PRELOAD_BATCHES[2].start, PRELOAD_BATCHES[2].end);
      });
    });
  }

  /**
   * Loads a specific slice of frames asynchronously.
   */
  private async loadBatch(start: number, end: number): Promise<void> {
    const promises: Promise<void>[] = [];
    for (let i = start; i < end; i++) {
      if (this.aborted) break;
      promises.push(this.preloadSingleFrame(i));
    }
    await Promise.all(promises);
  }

  /**
   * Preload an individual image element.
   */
  public preloadSingleFrame(index: number): Promise<void> {
    if (index < 0 || index >= TOTAL_FRAMES) return Promise.resolve();
    if (this.images[index]) {
      return this.images[index]!.complete
        ? Promise.resolve()
        : new Promise((res) => {
            const img = this.images[index]!;
            img.addEventListener("load", () => res(), { once: true });
            img.addEventListener("error", () => res(), { once: true });
          });
    }

    return new Promise<void>((resolve) => {
      const img = new Image();
      this.images[index] = img;

      img.onload = () => {
        this.loadedCount++;
        this.notifyProgress();
        resolve();
      };

      img.onerror = () => {
        // Increment on error as well to prevent blocking progress
        this.loadedCount++;
        this.notifyProgress();
        resolve();
      };

      img.src = getFramePath(index);
    });
  }

  private notifyProgress(): void {
    const progress = this.getProgress();
    for (const cb of this.onProgressCallbacks) {
      cb(progress, this.loadedCount);
    }
  }

  /**
   * Retrieves or creates a Three.js Texture for the specified frame index.
   * If the frame image is not yet loaded, triggers on-demand prioritized loading.
   */
  public getTexture(frameIndex: number): THREE.Texture | null {
    const index = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));

    // Return cached GPU texture if already generated
    const existing = this.textureCache.get(index);
    if (existing) return existing;

    const img = this.images[index];
    if (!img) {
      // Prioritize loading this frame and adjacent frames
      this.preloadSingleFrame(index);
      for (let offset = 1; offset <= 3; offset++) {
        this.preloadSingleFrame(index + offset);
        this.preloadSingleFrame(index - offset);
      }
      return this.getClosestLoadedTexture(index);
    }

    if (!img.complete || img.naturalWidth === 0) {
      return this.getClosestLoadedTexture(index);
    }

    // Create GPU Texture
    const texture = new THREE.Texture(img);
    texture.generateMipmaps = false;
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;

    this.textureCache.set(index, texture);

    // Maintain memory by clearing distant textures from GPU VRAM
    this.cleanGPUTextureCache(index);

    return texture;
  }

  /**
   * Fallback to closest available loaded texture if current frame is loading.
   */
  private getClosestLoadedTexture(targetIndex: number): THREE.Texture | null {
    // Search outwards from targetIndex
    for (let d = 1; d <= 20; d++) {
      const prev = targetIndex - d;
      if (prev >= 0 && this.textureCache.has(prev)) {
        return this.textureCache.get(prev)!;
      }
      const next = targetIndex + d;
      if (next < TOTAL_FRAMES && this.textureCache.has(next)) {
        return this.textureCache.get(next)!;
      }
    }
    // If no GPU texture in cache, check if image is loaded and make a texture
    for (let d = 0; d <= 20; d++) {
      const prev = targetIndex - d;
      if (prev >= 0 && this.images[prev]?.complete && this.images[prev]?.naturalWidth !== 0) {
        return this.getTexture(prev);
      }
      const next = targetIndex + d;
      if (next < TOTAL_FRAMES && this.images[next]?.complete && this.images[next]?.naturalWidth !== 0) {
        return this.getTexture(next);
      }
    }
    return null;
  }

  /**
   * Memory optimization: Disposes GPU textures outside the sliding window.
   */
  private cleanGPUTextureCache(currentFrame: number): void {
    const minFrame = currentFrame - GPU_TEXTURE_WINDOW;
    const maxFrame = currentFrame + GPU_TEXTURE_WINDOW;

    for (const [frame, texture] of this.textureCache.entries()) {
      if (frame < minFrame || frame > maxFrame) {
        texture.dispose();
        this.textureCache.delete(frame);
      }
    }
  }

  /**
   * Cleanup everything on unmount.
   */
  public dispose(): void {
    this.aborted = true;
    for (const texture of this.textureCache.values()) {
      texture.dispose();
    }
    this.textureCache.clear();
    this.images.fill(null);
    this.onProgressCallbacks.clear();
    this.loadedCount = 0;
  }
}
