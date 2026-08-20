/**
 * Configuration settings for the 360° Character Animation Viewer.
 */

export const TOTAL_FRAMES = 240;

/**
 * Returns the relative public path for a given frame index (0-based: 0 to 239).
 * Files: /avtar img/ezgif-frame-001.jpg -> ezgif-frame-240.jpg
 */
export const getFramePath = (index: number): string => {
  const frameNumber = Math.max(1, Math.min(TOTAL_FRAMES, index + 1));
  const padded = String(frameNumber).padStart(3, "0");
  return `/avtar img/ezgif-frame-${padded}.jpg`;
};

/**
 * Image dimensions and aspect ratio
 */
export const IMAGE_WIDTH = 1280;
export const IMAGE_HEIGHT = 720;
export const ASPECT_RATIO = IMAGE_WIDTH / IMAGE_HEIGHT;

/**
 * Interpolation damping factor for requestAnimationFrame rendering.
 * Higher = faster snap; Lower = smoother cinematic glide.
 */
export const LERP_FACTOR = 0.12;

/**
 * Direct drag / scroll sensitivity factors
 */
export const DRAG_SENSITIVITY = 0.0035;
export const WHEEL_SENSITIVITY = 0.0018;

/**
 * Progressive preloading phases:
 * Phase 1: 0 - 30 (instant start)
 * Phase 2: 30 - 120 (quarter and half rotation)
 * Phase 3: 120 - 240 (complete rotation)
 */
export const PRELOAD_BATCHES = [
  { start: 0, end: 30, name: "Initial batch" },
  { start: 30, end: 120, name: "Quarter-to-half batch" },
  { start: 120, end: TOTAL_FRAMES, name: "Full rotation batch" },
] as const;

/**
 * Sliding window size for active GPU textures (± window frames around current).
 * Prevents allocating all 240 textures on the GPU simultaneously.
 */
export const GPU_TEXTURE_WINDOW = 10;

/**
 * Responsive Device Pixel Ratio (DPR) caps
 */
export const DPR_MAX_DESKTOP = 2.0;
export const DPR_MAX_MOBILE = 1.5;
