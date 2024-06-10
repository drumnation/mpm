import { useWavesurfer } from '@wavesurfer/react';
import { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Minimap from 'wavesurfer.js/dist/plugins/minimap.esm.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.esm.js';
import Timeline from 'wavesurfer.js/dist/plugins/timeline.esm.js';
import { useTrack } from '../..';

export const useWavesurferSetup = (wavesurferRef: RefObject<HTMLElement>) => {
  const { state, dispatch } = useTrack();

  const regionsPluginRef = useRef<RegionsPlugin | null>(null);
  const isInitialized = useRef(false);
  const [isReady, setIsReady] = useState(false);

  const plugins = useMemo(() => [
    Timeline.create(),
    Minimap.create({ height: 30, waveColor: '#ddd', progressColor: '#999' }),
    RegionsPlugin.create()
  ], []);

  const { wavesurfer, isPlaying } = useWavesurfer({
    autoScroll: true,
    barRadius: 3,
    barWidth: 3,
    container: wavesurferRef,
    cursorColor: '#000',
    dragToSeek: true,
    fillParent: true,
    interact: true,
    height: 200,
    hideScrollbar: true,
    minPxPerSec: 100,
    normalize: true,
    plugins,
    progressColor: '#4353FF',
    url: state.selectedTrack?.filename,
    waveColor: '#D9DCFF',
  });

  const handleSeek = useCallback(
    (time: number) => {
      if (wavesurfer) {
        if (time === 0) {
          wavesurfer.seekTo(0);
        } else {
          wavesurfer.seekTo(time / state.duration);
        }
      }
    },
    [wavesurfer, state.duration]
  );

  useEffect(() => {
    if (state.seekTime !== null) {
      handleSeek(state.seekTime);
      dispatch({ type: 'SET_SEEK_TIME', payload: null });
    }
  }, [state.seekTime, handleSeek, dispatch]);

  useEffect(() => {
    if (!wavesurfer || isInitialized.current) return;

    const wsRegions = plugins.find(plugin => plugin instanceof RegionsPlugin);
    if (wsRegions) {
      regionsPluginRef.current = wsRegions;
    }

    isInitialized.current = true;
  }, [wavesurfer, plugins]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.on('audioprocess', () => dispatch({ type: 'SET_CURRENT_TIME', payload: wavesurfer.getCurrentTime() }));
      wavesurfer.on('ready', () => {
        dispatch({ type: 'SET_DURATION', payload: wavesurfer.getDuration() });
        setIsReady(true);
      });
    }
  }, [wavesurfer, dispatch]);

  useEffect(() => {
    if (state.selectedTrack?.filename) {
      setIsReady(false);
    }
  }, [state.selectedTrack?.filename]);

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
      const target = event.target as HTMLElement;
      const isInputField = target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable;

      if (isInputField) {
        return;
      }

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
