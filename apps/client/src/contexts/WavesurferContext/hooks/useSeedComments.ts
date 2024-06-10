
import { mockComments } from "@/library/DummyMusicData.js";
import { regenerateLetters } from "@/library/helpers.js";
import { useRef, useCallback, useEffect } from "react";
import { Comment } from "@components/3-organisms/Player/Player.types.js";
import RegionsPlugin from "wavesurfer.js/dist/plugins/regions.js";
import { TrackAction, TrackState } from "@/contexts/TrackContext/TrackContext.js";

export const useSeedComments = (dispatch: React.Dispatch<TrackAction>, regionsPluginRef: React.MutableRefObject<RegionsPlugin | null>, state: TrackState, isReady: boolean) => {
  const commentsSeededRef = useRef(false);

  const handleSeedComments = useCallback((commentsToSeed: Comment[]) => {
    const updatedComments = regenerateLetters(commentsToSeed);
    dispatch({ type: 'SET_COMMENTS', payload: updatedComments });

    if (regionsPluginRef.current) {
      updatedComments.forEach(comment => {
        regionsPluginRef.current!.addRegion({
          id: comment.id,
          start: comment.timeStart,
          end: comment.timeEnd,
          color: 'rgba(139, 0, 0, 0.5)',
          drag: true,
          resize: true,
          content: `${comment.label}`,
        });
      });
    }
  }, [dispatch, regionsPluginRef]);

  useEffect(() => {
    const trackFilename = state.selectedTrack?.filename;

    const seedCommentsForTrack = () => {
      if (trackFilename && !commentsSeededRef.current && isReady) {
        const comments = mockComments[trackFilename] || [];
        handleSeedComments(comments);
        commentsSeededRef.current = true;
      }
    };

    seedCommentsForTrack();
  }, [state.selectedTrack?.filename, handleSeedComments, isReady]);

  useEffect(() => {
    if (state.selectedTrack?.filename) {
      commentsSeededRef.current = false;
      dispatch({ type: 'SET_COMMENTS', payload: [] });
    }
  }, [state.selectedTrack?.filename, dispatch]);
};
