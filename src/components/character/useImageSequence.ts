import { useEffect, useRef, useState } from "react";
import { FrameLoader } from "./FrameLoader";
import * as THREE from "three";

export interface ImageSequenceState {
  loader: FrameLoader | null;
  loadProgress: number;
  loadedCount: number;
  isReady: boolean;
  getTexture: (frame: number) => THREE.Texture | null;
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
      if (loader.isInitialBatchReady() || count >= 15) {
        setIsReady(true);
      }
    });

    // Start preloading frames in progressive batches
    loader.startPreload();

    return () => {
      unsubscribe();
      loader.dispose();
      loaderRef.current = null;
    };
  }, []);

  const getTexture = (frame: number): THREE.Texture | null => {
    if (!loaderRef.current) return null;
    return loaderRef.current.getTexture(frame);
  };

  return {
    loader: loaderRef.current,
    loadProgress,
    loadedCount,
    isReady,
    getTexture,
  };
}
