import { useCallback, useEffect, useRef, useState } from 'react';
import { Region } from 'wavesurfer.js/dist/plugins/regions.js';
import { useBPMAnalysis, useEventHandlers, useWavesurferSetup } from './hooks';
import { Comment } from './Player.types';
import { useTrack } from '../../../contexts';
import { mockComments } from '../../5-pages/MusicReviewDashboard/DummyMusicData';

const usePlayer = () => {
  const wavesurferRef = useRef(null);
  const { state, dispatch } = useTrack();

  const { currentTime, duration, wavesurfer, setCurrentTime, regionsPluginRef, isPlaying, isReady, handleSeek } = useWavesurferSetup(wavesurferRef);
  const { handleBpmChange, loading: loadingBPM, originalBpm, relativeBpm } = useBPMAnalysis(wavesurfer);

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

  const generateUniqueId = () => {
    return '_' + Math.random().toString(36).substr(2, 9);
  };

  const regenerateLetters = useCallback((comments: Comment[]): Comment[] => {
    const sortedComments = [...comments].sort((a, b) => a.timeStart - b.timeStart);
    return sortedComments.map((comment, index) => ({
      ...comment,
      label: alphabet[index % 26],
    }));
  }, []);

  const updateRegionContent = useCallback((updatedComments: Comment[]) => {
    updatedComments.forEach(comment => {
      if (regionsPluginRef.current) {
        const regions = regionsPluginRef.current.getRegions();
        const region = regions.find((r: Region) => r.id === comment.id);
        if (region) {
          region.setOptions({
            start: comment.timeStart,
            end: comment.timeEnd,
            content: `${comment.label}: ${comment.text.length > 10 ? comment.text.substring(0, 10) + '...' : comment.text}`,
          });
        }
      }
    });
  }, [regionsPluginRef]);

  const handleAddComment = useCallback((timeStart: number, timeEnd: number, text: string, id?: string) => {
    const newComment = { id: id || generateUniqueId(), timeStart, timeEnd, text, label: '' };
    const updatedComments = regenerateLetters([...state.comments, newComment]);
    dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

    if (regionsPluginRef.current) {
      const newCommentWithLabel = updatedComments.find(comment => comment.id === newComment.id);
      if (newCommentWithLabel) {
        console.log(`Adding new region for comment: ${newCommentWithLabel.id}, time: ${newCommentWithLabel.timeStart}, text: ${newCommentWithLabel.text}`);
        regionsPluginRef.current.addRegion({
          id: newCommentWithLabel.id,
          start: newCommentWithLabel.timeStart,
          end: newCommentWithLabel.timeEnd,
          color: 'rgba(255, 0, 0, 0.3)',
          drag: true,
          resize: true,
          content: `${newCommentWithLabel.label}`,
          // content: `${newCommentWithLabel.label}: ${newCommentWithLabel.text.length > 10 ? newCommentWithLabel.text.substring(0, 10) + '...' : newCommentWithLabel.text}`,
        });
      }
    }
  }, [state.comments, dispatch, regenerateLetters, regionsPluginRef]);

  const commentsSeededRef = useRef(false);

  const handleSeedComments = useCallback((commentsToSeed: Comment[]) => {
    const updatedComments = regenerateLetters(commentsToSeed);
    dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

    if (regionsPluginRef.current) {
      updatedComments.forEach(comment => {
        console.log(`Adding new region for comment: ${comment.id}, time: ${comment.timeStart}, text: ${comment.text}`);
        if (regionsPluginRef.current) {
          regionsPluginRef.current.addRegion({
            id: comment.id,
            start: comment.timeStart,
            end: comment.timeEnd,
            color: 'rgba(139, 0, 0, 0.5)',
            drag: true,
            resize: true,
            content: `${comment.label}`,
          });
        }
      });
    }
  }, [dispatch, regenerateLetters, regionsPluginRef]);

  useEffect(() => {
    const trackFilename = state.selectedTrack?.filename;
    const handleReady = () => {
      if (trackFilename && !commentsSeededRef.current) {
        const comments = mockComments[trackFilename] || [];
        console.debug('comments', comments);
        handleSeedComments(comments);
        commentsSeededRef.current = true;
      }
    };

    if (isReady) {
      handleReady();
    }
  }, [state.selectedTrack?.filename, handleSeedComments, isReady, commentsSeededRef]);

  useEffect(() => {
    commentsSeededRef.current = false;
    dispatch({ type: 'SET_COMMENTS', payload: [] });
  }, [state.selectedTrack?.filename, dispatch]);

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

    // Update region content with new labels
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
  }, [state.comments, dispatch, regenerateLetters, regionsPluginRef]);

  function isString(value: any): value is string {
    return typeof value === 'string';
  }

  const handleTimeUpdate = useCallback((time: number) => {
    setCurrentTime(time);
  }, [setCurrentTime]);

  useEventHandlers(wavesurfer, regionsPluginRef, handleTimeUpdate, handleRegionUpdate);

  return {
    comments: state.comments,
    currentTime,
    duration,
    filename: state.selectedTrack?.filename,
    genre: state.selectedTrack?.genre,
    handleAddComment,
    handleBpmChange,
    handleSeek,
    loadingBPM,
    isPlaying,
    originalBpm,
    regionsPluginRef,
    relativeBpm,
    trackName: state.selectedTrack?.trackName,
    wavesurfer,
    wavesurferRef,
  };
};

export default usePlayer;
