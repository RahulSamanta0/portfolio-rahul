import {
  TOTAL_FRAMES,
  getFramePath,
} from "./character.config";

export type ProgressCallback = (progress: number, loadedCount: number) => void;

/**
 * Manages progressive image preloading for smooth 60fps frame animation.
 */
export class FrameLoader {
  private images: HTMLImageElement[] = [];
  private loadedCount: number = 0;
  private onProgressCallbacks: Set<ProgressCallback> = new Set();
  private isPreloading: boolean = false;
  private aborted: boolean = false;
  private fallbackCache: HTMLImageElement | null = null;

  constructor() {
    // Pre-create image elements
    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      this.images.push(img);
    }
  }

  /**
   * Subscribe to frame loading progress updates (0 to 100%).
   */
  public onProgress(cb: ProgressCallback): () => void {
    this.onProgressCallbacks.add(cb);
    cb(this.getProgress(), this.loadedCount);
    return () => this.onProgressCallbacks.delete(cb);
  }

  public getProgress(): number {
    return Math.min(100, Math.round((this.loadedCount / TOTAL_FRAMES) * 100));
  }

  public isReady(): boolean {
    return this.loadedCount >= 1 || this.fallbackCache !== null;
  }

  /**
   * Starts progressive loading:
   * 1. Milestone frames first (189 [Front], 142 [45°], 95 [90°], 47 [135°], 0 [180°])
   * 2. Strided step sampling (every 3rd frame)
   * 3. All remaining frames
   */
  public startPreload(): void {
    if (this.isPreloading || this.aborted) return;
    this.isPreloading = true;

    // 1. Key milestone frames
    const milestones = [
      TOTAL_FRAMES - 1, // 189: Front view (0°)
      Math.round(TOTAL_FRAMES * 0.75), // 142: 45°
      Math.round(TOTAL_FRAMES * 0.5),  // 95: 90°
      Math.round(TOTAL_FRAMES * 0.25), // 47: 135°
      0,                               // 0: Back view (180°)
    ];

    const loadSingle = (index: number): Promise<void> => {
      if (index < 0 || index >= TOTAL_FRAMES || this.aborted) return Promise.resolve();
      const img = this.images[index];
      if (img.src) {
        return img.complete
          ? Promise.resolve()
          : new Promise((res) => {
              img.onload = () => res();
              img.onerror = () => res();
            });
      }

      return new Promise<void>((resolve) => {
        img.onload = () => {
          this.loadedCount++;
          if (!this.fallbackCache) this.fallbackCache = img;
          this.notifyProgress();
          resolve();
        };
        img.onerror = () => {
          this.loadedCount++;
          this.notifyProgress();
          resolve();
        };
        img.src = getFramePath(index);
      });
    };

    // Load key milestones immediately
    Promise.all(milestones.map((idx) => loadSingle(idx))).then(() => {
      if (this.aborted) return;

      // 2. Strided pass (every 3rd frame from 189 down to 0)
      const strided: number[] = [];
      for (let i = TOTAL_FRAMES - 1; i >= 0; i -= 3) {
        if (!milestones.includes(i)) strided.push(i);
      }

      Promise.all(strided.map((idx) => loadSingle(idx))).then(() => {
        if (this.aborted) return;

        // 3. All remaining frames
        const remaining: number[] = [];
        for (let i = TOTAL_FRAMES - 1; i >= 0; i--) {
          if (!milestones.includes(i) && !strided.includes(i)) {
            remaining.push(i);
          }
        }
        remaining.forEach((idx) => loadSingle(idx));
      });
    });
  }

  private notifyProgress(): void {
    const progress = this.getProgress();
    for (const cb of this.onProgressCallbacks) {
      cb(progress, this.loadedCount);
    }
  }

  /**
   * Retrieves an HTMLImageElement for the specified frame index.
   * If exact frame isn't loaded yet, returns the closest loaded frame.
   */
  public getImage(frameIndex: number): HTMLImageElement | null {
    const index = Math.max(0, Math.min(TOTAL_FRAMES - 1, frameIndex));
    const img = this.images[index];
    if (img && img.complete && img.naturalWidth > 0) {
      this.fallbackCache = img;
      return img;
    }
    return this.getClosestLoadedImage(index);
  }

  private getClosestLoadedImage(targetIndex: number): HTMLImageElement | null {
    for (let d = 1; d < TOTAL_FRAMES; d++) {
      const prev = targetIndex - d;
      if (prev >= 0) {
        const prevImg = this.images[prev];
        if (prevImg && prevImg.complete && prevImg.naturalWidth > 0) {
          this.fallbackCache = prevImg;
          return prevImg;
        }
      }
      const next = targetIndex + d;
      if (next < TOTAL_FRAMES) {
        const nextImg = this.images[next];
        if (nextImg && nextImg.complete && nextImg.naturalWidth > 0) {
          this.fallbackCache = nextImg;
          return nextImg;
        }
      }
    }
    return this.fallbackCache;
  }

  /**
   * Cleanup everything on unmount.
   */
  public dispose(): void {
    this.aborted = true;
    this.images = [];
    this.onProgressCallbacks.clear();
    this.loadedCount = 0;
    this.fallbackCache = null;
  }
}
