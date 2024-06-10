import { useWavesurfer } from '@wavesurfer/react';
import { RefObject, useCallback, useEffect, useMemo, useRef } from 'react';
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useTrack } from '../../../../contexts';

export const useWavesurferSetup = (wavesurferRef: RefObject<HTMLElement>) => {
  const { state, dispatch } = useTrack();

  const regionsPluginRef = useRef<RegionsPlugin | null>(null);

  const { wavesurfer, isReady, isPlaying } = useWavesurfer({
    autoScroll: true,
    barRadius: 3,
    barWidth: 3,
    container: wavesurferRef,
    cursorColor: '#4353FF',
    dragToSeek: true,
    fillParent: true,
    interact: true,
    height: 200,
    hideScrollbar: true,
    minPxPerSec: 100,
    normalize: true,
    plugins: useMemo(() => [Timeline.create(), Minimap.create({ height: 30, waveColor: '#ddd', progressColor: '#999' })], []),
    progressColor: '#4353FF',
    url: state.selectedTrack?.filename,
    waveColor: '#D9DCFF',
  });

  const handleSeek = useCallback((time: number) => {
    console.debug("time", time);
    if (wavesurfer) {
      if (time === 0) {
        wavesurfer.seekTo(0);
      } else {
        wavesurfer.seekTo(time / state.duration);
      }
    }
  }, [wavesurfer, state.duration]);
  console.debug('state.seekTime', state.seekTime);

  useEffect(() => {
    console.debug("seekTime", state.seekTime);
    if (state.seekTime !== null) {
      handleSeek(state.seekTime);
      dispatch({ type: 'SET_SEEK_TIME', payload: null }); // Reset seekTime after seeking
    }
  }, [state.seekTime, handleSeek, dispatch]);

  useEffect(() => {
    if (!wavesurfer) return;

    const wsRegions = RegionsPlugin.create();
    wavesurfer.registerPlugin(wsRegions);
    regionsPluginRef.current = wsRegions;
    console.log('Regions plugin registered');
  }, [wavesurfer]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('audioprocess', () => dispatch({ type: 'SET_CURRENT_TIME', payload: wavesurfer.getCurrentTime() }));
      wavesurfer.on('ready', () => dispatch({ type: 'SET_DURATION', payload: wavesurfer.getDuration() }));
    }
  }, [wavesurfer, dispatch]);

  const handlePlayPause = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.playPause();
    }
  }, [wavesurfer]);

  const handleSkipForward = useCallback(() => {
    if (wavesurfer) {
      wavesurfer.skip(5);
    }
  }, [wavesurfer]);

  const handleSkipBackward = useCallback(() => {
    if (wavesurfer) {
      const currentTime = wavesurfer.getCurrentTime();
      const newTime = currentTime - 5;
      wavesurfer.setTime(newTime);
    }
  }, [wavesurfer]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === 'Space') {
        event.preventDefault();
        handlePlayPause();
      } else if (event.code === 'ArrowRight' || event.code === 'KeyD') {
        event.preventDefault();
        handleSkipForward();
      } else if (event.code === 'ArrowLeft' || event.code === 'KeyA') {
        event.preventDefault();
        handleSkipBackward();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handlePlayPause, handleSkipForward, handleSkipBackward]);

  return {
    currentTime: state.currentTime,
    duration: state.duration,
    isPlaying,
    isReady,
    setCurrentTime: (time: number) => dispatch({ type: 'SET_CURRENT_TIME', payload: time }),
    regionsPluginRef,
    wavesurfer,
    handleSeek,
    handlePlayPause,
    handleSkipForward,
    handleSkipBackward,
  };
};
