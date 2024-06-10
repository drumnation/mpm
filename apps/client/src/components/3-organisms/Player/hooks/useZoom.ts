import { useEffect, useRef, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';

export const useZoom = (wavesurfer: WaveSurfer | null, isReady: boolean) => {
  const waveformContainerRef = useRef<HTMLDivElement>(null);
  const [zoomLevel, setZoomLevel] = useState(100);

  useEffect(() => {
    if (!wavesurfer || !waveformContainerRef.current) return;

    const handleWheel = (event: WheelEvent) => {
      if (!wavesurfer) return;

      if (event.ctrlKey) {
        event.preventDefault();
        const newZoomLevel = Math.min(Math.max(zoomLevel + event.deltaY * -0.1, 0), 1000);
        setZoomLevel(newZoomLevel);
        wavesurfer.zoom(newZoomLevel);
      }
    };

    const setInitialZoomLevel = () => {
      if (!waveformContainerRef.current) return;
      const duration = wavesurfer.getDuration() + 20;
      const containerWidth = waveformContainerRef.current.clientWidth;
      const pixelsPerSecond = containerWidth / duration;
      const initialZoomLevel = Math.max(pixelsPerSecond, 1);
      setZoomLevel(initialZoomLevel);
      wavesurfer.zoom(initialZoomLevel);
    };

    wavesurfer.on('ready', setInitialZoomLevel);

    window.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      wavesurfer.un('ready', setInitialZoomLevel);
      window.removeEventListener('wheel', handleWheel);
    };
  }, [wavesurfer, waveformContainerRef, zoomLevel]);

  useEffect(() => {
    if (wavesurfer && isReady) {
      wavesurfer.zoom(zoomLevel);
    }
  }, [zoomLevel, wavesurfer, isReady]);

  return { zoomLevel, setZoomLevel, waveformContainerRef };
};
