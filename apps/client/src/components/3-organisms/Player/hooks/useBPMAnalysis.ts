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

  // @ts-expect-error - can't figure out how to type this

  const analyzeBPM = useCallback(async () => {
    setLoading(true);
    try {
      const file = state.selectedTrack?.filename ?? '';
      const audioContext = new AudioContext();
      const response = await fetch(file);
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
  }, [state.selectedTrack]);

  useEffect(() => {
    analyzeBPM();
  }, [analyzeBPM]);

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
