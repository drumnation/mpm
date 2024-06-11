import React, { createContext, useCallback, useContext, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.js';

import { useSeedComments } from './hooks/useSeedComments.js';
import { isString, regenerateLetters } from '@/library/helpers.js';
import { useWavesurferSetup } from './hooks/useWaveSurferSetup.js';
import { useTrack } from '@/contexts/TrackContext/TrackContext.js';
import { useBPMAnalysis } from '@/contexts/WavesurferContext/hooks/useBPMAnalysis.js';

interface WavesurferContextValue {
  currentTime: number;
  duration: number;
  handleAddComment: (timeStart: number, timeEnd: number, text: string, id?: string) => void;
  handleBpmChange: (newRelativeBpm: number) => void;
  handleDeleteComment: (commentId: string) => void;
  handleEditComment: (commentId: string, newText: string) => void;
  handleRegionUpdate: (region: Region) => void;
  handleSeek: (time: number) => void;
  handleTimeUpdate: (time: number) => void;
  isPlaying: boolean;
  isReady: boolean;
  loadingBPM: boolean;
  originalBpm: number | null;
  regionsPluginRef: React.MutableRefObject<RegionsPlugin | null>;
  relativeBpm: number | null;
  setCurrentTime: (time: number) => void;
  wavesurfer: WaveSurfer | null;
  wavesurferRef: React.RefObject<HTMLDivElement>;
}

const WavesurferContext = createContext<WavesurferContextValue>({
  currentTime: 0,
  duration: 0,
  handleAddComment: (timeStart: number, timeEnd: number, text: string, id?: string) => console.warn('handleAddComment method not implemented', timeStart, timeEnd, text, id),
  handleBpmChange: (newRelativeBpm: number) => console.warn('handleBpmChange method not implemented', newRelativeBpm),
  handleDeleteComment: (commentId: string) => console.warn('handleDeleteComment method not implemented', commentId),
  handleEditComment: (commentId: string, newText: string) => console.warn('handleEditComment method not implemented', commentId, newText),
  handleRegionUpdate: (region: Region) => console.warn('handleRegionUpdate method not implemented', region),
  handleSeek: (time: number) => console.warn('handleSeek method not implemented', time),
  handleTimeUpdate: (time: number) => console.warn('handleTimeUpdate method not implemented', time),
  isPlaying: false,
  isReady: false,
  loadingBPM: false,
  originalBpm: null,
  regionsPluginRef: { current: null },
  relativeBpm: null,
  setCurrentTime: (time: number) => console.warn('setCurrentTime method not implemented', time),
  wavesurfer: null,
  wavesurferRef: { current: null },
});

export const WavesurferProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const wavesurferRef = useRef(null);
  const { state, dispatch } = useTrack();

  const { currentTime, duration, wavesurfer, setCurrentTime, regionsPluginRef, isPlaying, isReady, handleSeek } = useWavesurferSetup(wavesurferRef);

  const { handleBpmChange, loading: loadingBPM, originalBpm, relativeBpm } = useBPMAnalysis(wavesurfer);

  useSeedComments(dispatch, regionsPluginRef, state, isReady);

  const handleAddComment = useCallback(
    (timeStart: number, timeEnd: number, text: string, id?: string) => {
      const generateUniqueId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      const newComment = { id: id || generateUniqueId(), timeStart, timeEnd, text, label: '' };
      const updatedComments = regenerateLetters([...state.comments, newComment]);
      dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

      if (regionsPluginRef.current) {
        const newCommentWithLabel = updatedComments.find(comment => comment.id === newComment.id);
        if (newCommentWithLabel) {
          regionsPluginRef.current.addRegion({
            id: newCommentWithLabel.id,
            start: newCommentWithLabel.timeStart,
            end: newCommentWithLabel.timeEnd,
            color: 'rgba(255, 0, 0, 0.3)',
            drag: true,
            resize: true,
            content: `${newCommentWithLabel.label}`,
          });
        }
      }
    },
    [state.comments, dispatch, regionsPluginRef]
  );

  const handleRegionUpdate = useCallback((region: Region) => {
    const updatedComments = state.comments.map(comment => {
      if (comment.id === region.id) {
        let updatedText = comment.text;
        if (isString(region.content)) {
          updatedText = region.content.split(':')[1]?.trim() || comment.text;
        }

        return {
          ...comment,
          timeStart: region.start,
          timeEnd: region.end,
          text: updatedText,
        };
      }
      return comment;
    });

    const sortedComments = regenerateLetters(updatedComments);
    dispatch({ type: 'SET_COMMENTS', payload: sortedComments });

    sortedComments.forEach(comment => {
      if (regionsPluginRef.current) {
        const regions = regionsPluginRef.current.getRegions();
        const region = regions.find((r: Region) => r.id === comment.id);
        if (region) {
          region.setOptions({
            content: `${comment.label}`,
            start: comment.timeStart,
            end: comment.timeEnd,
          });
        }
      }
    });
  }, [state.comments, dispatch, regionsPluginRef]);

  const handleDeleteComment = useCallback(
    (commentId: string) => {
      const updatedComments = state.comments.filter(comment => comment.id !== commentId);
      dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

      if (regionsPluginRef.current) {
        const regions = regionsPluginRef.current.getRegions();
        const region = regions.find((r: Region) => r.id === commentId);
        if (region) {
          region.remove();
        }
      }
    },
    [state.comments, dispatch, regionsPluginRef]
  );

  const handleEditComment = useCallback(
    (commentId: string, newText: string) => {
      const updatedComments = state.comments.map(comment => {
        if (comment.id === commentId) {
          return {
            ...comment,
            text: newText,
          };
        }
        return comment;
      });

      dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

      if (regionsPluginRef.current) {
        const regions = regionsPluginRef.current.getRegions();
        const region = regions.find((r: Region) => r.id === commentId);
        if (region) {
          const updatedComment = updatedComments.find(comment => comment.id === commentId);
          if (updatedComment) {
            region.setOptions({
              content: updatedComment.label,
              start: updatedComment.timeStart,
              end: updatedComment.timeEnd,
            });
          }
        }
      }
    },
    [state.comments, dispatch, regionsPluginRef]
  );

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, [setCurrentTime]);

  return (
    <WavesurferContext.Provider
      value={{
        currentTime,
        duration,
        handleAddComment,
        handleDeleteComment,
        handleEditComment,
        handleRegionUpdate,
        handleTimeUpdate,
        handleSeek,
        isPlaying,
        handleBpmChange,
        loadingBPM,
        originalBpm,
        relativeBpm,
        isReady,
        regionsPluginRef,
        setCurrentTime,
        wavesurfer,
        wavesurferRef,
      }}
    >
      {children}
    </WavesurferContext.Provider>
  );
};

export const useWavesurfer = () => useContext(WavesurferContext);
