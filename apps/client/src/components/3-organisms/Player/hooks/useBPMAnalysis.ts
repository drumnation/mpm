import { useTrack } from '../../../../contexts';
import { useCallback, useEffect, useState } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { analyze } from 'web-audio-beat-detector';

export const useBPMAnalysis = (wavesurfer: WaveSurfer | null) => {
  const { state } = useTrack();
  const [originalBpm, setOriginalBpm] = useState<number | null>(null);
  const [relativeBpm, setRelativeBpm] = useState<number | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

  const [audioContext, setAudioContext] = useState<AudioContext | null>(null);

  const initializeAudioContext = useCallback(() => {
    const context = new AudioContext();
    setAudioContext(context);
  }, []);

  // @ts-expect-error - Not sure how to fix
  const analyzeBPM = useCallback(async () => {
    if (!state.selectedTrack?.filename) {
      console.error('No file selected');
      return;
    }

    if (!audioContext) {
      console.error('AudioContext not initialized');
      return;
    }

    setLoading(true);
    try {
      const file = state.selectedTrack.filename;
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
      const tempo = await analyze(audioBuffer);
      const calculatedBpm = Math.round(tempo);

      setOriginalBpm(calculatedBpm);
      setRelativeBpm(calculatedBpm);
      setPlaybackRate(1);
    } catch (error) {
      console.error('Error analyzing BPM:', error);
    } finally {
      setLoading(false);
    }
  }, [state.selectedTrack, audioContext]);

  useEffect(() => {
    if (state.selectedTrack?.filename && !audioContext) {
      initializeAudioContext();
    }
  }, [state.selectedTrack, audioContext, initializeAudioContext]);

  useEffect(() => {
    if (state.selectedTrack?.filename && audioContext) {
      analyzeBPM();
    }
  }, [state.selectedTrack, audioContext, analyzeBPM]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setPlaybackRate(playbackRate);
    }
  }, [wavesurfer, playbackRate]);

  const handleBpmChange = useCallback(
    (newRelativeBpm: number) => {
      setRelativeBpm(newRelativeBpm);
      if (originalBpm) {
        setPlaybackRate(newRelativeBpm / originalBpm);
      }
    },
    [originalBpm]
  );

  const resetBpm = useCallback(() => {
    if (originalBpm) {
      setRelativeBpm(originalBpm);
      setPlaybackRate(1);
    }
  }, [originalBpm]);

  return {
    handleBpmChange,
    loading,
    originalBpm,
    playbackRate,
    relativeBpm,
    resetBpm,
  };
};
