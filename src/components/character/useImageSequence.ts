import { useEffect, useRef, useState, useCallback } from "react";
import { FrameLoader } from "./FrameLoader";

export interface ImageSequenceState {
  loader: FrameLoader | null;
  loadProgress: number;
  loadedCount: number;
  isReady: boolean;
  getImage: (frame: number) => HTMLImageElement | null;
}

export function useImageSequence(): ImageSequenceState {
  const loaderRef = useRef<FrameLoader | null>(null);
  const [loadProgress, setLoadProgress] = useState<number>(0);
  const [loadedCount, setLoadedCount] = useState<number>(0);
  const [isReady, setIsReady] = useState<boolean>(false);

  useEffect(() => {
    const loader = new FrameLoader();
    loaderRef.current = loader;

    const unsubscribe = loader.onProgress((progress, count) => {
      setLoadProgress(progress);
      setLoadedCount(count);
      if (loader.isReady()) {
        setIsReady(true);
      }
    });

    // Start preloading frames
    loader.startPreload();

    return () => {
      unsubscribe();
      loader.dispose();
      loaderRef.current = null;
    };
  }, []);

  const getImage = useCallback((frame: number): HTMLImageElement | null => {
    if (!loaderRef.current) return null;
    return loaderRef.current.getImage(frame);
  }, []);

  return {
    loader: loaderRef.current,
    loadProgress,
    loadedCount,
    isReady,
    getImage,
  };
}

