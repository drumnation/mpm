import { useTrack } from '@contexts/TrackContext/TrackContext.js';
import { useCallback, useEffect, useState, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import { analyze, guess } from 'web-audio-beat-detector';

const DEFAULT_BPM = 100;

export const useBPMAnalysis = (wavesurfer: WaveSurfer | null) => {
  const { state } = useTrack();
  const [originalBpm, setOriginalBpm] = useState<number | null>(null);
  const [relativeBpm, setRelativeBpm] = useState<number | null>(null);
  const [playbackRate, setPlaybackRate] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const retryCountRef = useRef<number>(0);
  const analyzedTrackRef = useRef<string | null>(null);

  const analyzeBPM = useCallback(async () => {
    if (!state.selectedTrack?.filename) {
      console.error('No file selected');
      return;
    }

    setLoading(true);
    console.log('Loading set to true, starting BPM analysis');
    try {
      const file = state.selectedTrack.filename;
      const response = await fetch(file);

      if (!response.ok) {
        throw new Error(`Failed to fetch the file: ${response.statusText}`);
      }

      const arrayBuffer = await response.arrayBuffer();
      const AudioContextClass = (window.AudioContext || (window as any).webkitAudioContext) as typeof AudioContext;
      const audioContext = new AudioContextClass();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      let tempo;
      try {
        tempo = await analyze(audioBuffer);
      } catch (error) {
        console.warn('Analyze failed, falling back to guess', error);
        const guessResult = await guess(audioBuffer);
        tempo = guessResult.bpm;
      }

      const calculatedBpm = Math.round(tempo);
      setOriginalBpm(calculatedBpm);
      setRelativeBpm(calculatedBpm);
      setPlaybackRate(1);
      analyzedTrackRef.current = state.selectedTrack.filename;
      retryCountRef.current = 0;
      console.log('BPM analysis complete:', calculatedBpm);
    } catch (error) {
      console.error('Error analyzing BPM:', error);
      retryCountRef.current += 1;
      if (retryCountRef.current === 1) {
        const fallbackBpm = Number(state.selectedTrack?.bpm) || DEFAULT_BPM;
        setOriginalBpm(fallbackBpm);
        setRelativeBpm(fallbackBpm);
        setPlaybackRate(1);
        analyzedTrackRef.current = state.selectedTrack.filename;
        retryCountRef.current = 0;
        setLoading(false);
        console.log(`Fallback to BPM: ${fallbackBpm}`);
      }
    } finally {
      setLoading(false);
      console.log('Loading set to false, BPM analysis finished');
    }
  }, [state.selectedTrack]);

  useEffect(() => {
    if (state.selectedTrack?.filename && analyzedTrackRef.current !== state.selectedTrack.filename) {
      setRelativeBpm(null);
      setOriginalBpm(null);
      setPlaybackRate(1);
      setLoading(true);
      analyzedTrackRef.current = null;
      retryCountRef.current = 0;
      console.log('New file selected, states reset, loading set to true');
    }
  }, [state.selectedTrack]);

  useEffect(() => {
    if (state.selectedTrack?.filename && analyzedTrackRef.current !== state.selectedTrack.filename) {
      console.log('Triggering BPM analysis');
      analyzeBPM();
    }
  }, [state.selectedTrack, analyzeBPM]);

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setPlaybackRate(playbackRate);
      console.log('Playback rate set to:', playbackRate);
    }
  }, [wavesurfer, playbackRate]);

  const handleBpmChange = useCallback(
    (newRelativeBpm: number) => {
      if (originalBpm) {
        const newPlaybackRate = newRelativeBpm / originalBpm;
        setRelativeBpm(newRelativeBpm);
        setPlaybackRate(newPlaybackRate);
        console.log('Changing BPM:', newRelativeBpm, 'New Playback Rate:', newPlaybackRate);
      }
    },
    [originalBpm]
  );

  return {
    handleBpmChange,
    loading,
    originalBpm,
    playbackRate,
    relativeBpm,
  };
};
