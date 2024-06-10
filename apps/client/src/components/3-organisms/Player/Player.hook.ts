import { useEffect, useState } from 'react';
import { useTrack, useWavesurfer } from '../../../contexts';
import { useBPMAnalysis, useEventHandlers, useZoom } from './hooks';

const usePlayer = () => {
  const {
    currentTime,
    duration,
    handleAddComment,
    handleRegionUpdate,
    handleSeek,
    handleTimeUpdate,
    isPlaying,
    isReady,
    regionsPluginRef,
    wavesurfer,
    wavesurferRef,
  } = useWavesurfer();

  const { state } = useTrack();

  const { handleBpmChange, loading: loadingBPM, originalBpm, relativeBpm } = useBPMAnalysis(wavesurfer);

  useEventHandlers(wavesurfer, regionsPluginRef, handleTimeUpdate, handleRegionUpdate);

  // const [zoomLevel, setZoomLevel] = useState(100);

  // useEffect(() => {
  //   const setZoom = () => {
  //     if (wavesurfer && isReady) {
  //       wavesurfer.zoom(zoomLevel);
  //     }
  //   };

  //   if (wavesurfer) {
  //     wavesurfer.on('ready', setZoom);
  //     if (isReady) {
  //       setZoom();
  //     }
  //   }

  //   return () => {
  //     if (wavesurfer) {
  //       wavesurfer.un('ready', setZoom);
  //     }
  //   };
  // }, [zoomLevel, wavesurfer, isReady]);
  const { setZoomLevel, zoomLevel, waveformContainerRef } = useZoom(wavesurfer, isReady);

  return {
    comments: state.comments,
    currentTime,
    duration,
    filename: state.selectedTrack?.filename,
    genre: state.selectedTrack?.genre,
    handleAddComment,
    handleBpmChange,
    handleSeek,
    isPlaying,
    loadingBPM,
    originalBpm,
    relativeBpm,
    setZoomLevel,
    trackName: state.selectedTrack?.trackName,
    wavesurfer,
    wavesurferRef,
    waveformContainerRef,
    zoomLevel,
  };
};

export default usePlayer;


