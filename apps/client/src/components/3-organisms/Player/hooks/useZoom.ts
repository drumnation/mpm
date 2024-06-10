import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const useZoom = (wavesurfer: WaveSurfer | null, containerRef: React.RefObject<HTMLDivElement>) => {
  const zoomLevel = useRef(100);
  const [displayZoomLevel, setDisplayZoomLevel] = useState(100);

  useEffect(() => {
    if (!wavesurfer || !containerRef.current) return;

    const handleWheel = (event: WheelEvent) => {
      if (!wavesurfer) return;

      if (event.ctrlKey) {
        event.preventDefault();
        const newZoomLevel = Math.min(Math.max(zoomLevel.current + event.deltaY * -0.1, 0), 1000);
        zoomLevel.current = newZoomLevel;
        setDisplayZoomLevel(newZoomLevel);
        wavesurfer.zoom(newZoomLevel);
      }
    };

    const setInitialZoomLevel = () => {
      if (!containerRef.current) return;
      const duration = wavesurfer.getDuration() + 20;
      const containerWidth = containerRef.current.clientWidth;
      const pixelsPerSecond = containerWidth / duration;
      const initialZoomLevel = Math.max(pixelsPerSecond, 1);
      zoomLevel.current = initialZoomLevel;
      setDisplayZoomLevel(initialZoomLevel);
      wavesurfer.zoom(initialZoomLevel);
    };

    wavesurfer.on('ready', setInitialZoomLevel);

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wavesurfer.un('ready', setInitialZoomLevel);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [wavesurfer, containerRef]);

  return { displayZoomLevel };
};
