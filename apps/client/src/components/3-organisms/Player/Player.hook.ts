import { useBPMAnalysis } from '@/contexts/WavesurferContext/hooks/useBPMAnalysis.js';
import { useEventHandlers } from '@components/3-organisms/Player/hooks/useEventHandlers.js';
import { useZoom } from '@components/3-organisms/Player/hooks/useZoom.js';
import { useTrack } from '@contexts/TrackContext/TrackContext.js';
import { useWavesurfer } from '@contexts/WavesurferContext/WavesurferContext.js';

const usePlayer = () => {
  const {
    currentTime,
    duration,
    handleAddComment,
    handleBpmChange,
    handleRegionUpdate,
    handleSeek,
    handleTimeUpdate,
    isPlaying,
    isReady,
    loadingBPM,
    originalBpm,
    regionsPluginRef,
    relativeBpm,
    wavesurfer,
    wavesurferRef,
  } = useWavesurfer();

  const { state } = useTrack();

  useEventHandlers(wavesurfer, regionsPluginRef, handleTimeUpdate, handleRegionUpdate);

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
