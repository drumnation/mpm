import React, { useReducer, createContext, useContext, ReactNode } from 'react';
import { Comment } from '../components/3-organisms/Player/Player.types';

interface Track {
  filename: string;
  fileType: string;
  trackName: string;
  artistName: string;
  album: string;
  trackNumber: string;
  genre: string;
  year: string;
  comment: string;
  composer: string;
  albumArtist: string;
  discNumber: string;
  bpm: string;
  duration: string;
}

interface TrackState {
  selectedTrack: Track | null;
  comments: Comment[];
  currentTime: number;
  duration: number;
  seekTime: number | null;
}

interface TrackAction {
  type: 'SET_SELECTED_TRACK' | 'CLEAR_SELECTED_TRACK' | 'SET_COMMENTS' | 'SET_CURRENT_TIME' | 'SET_DURATION' | 'SET_SEEK_TIME' | 'UPDATE_TRACK_METADATA';
  payload?: any;
}

const initialState: TrackState = {
  selectedTrack: null,
  comments: [],
  currentTime: 0,
  duration: 0,
  seekTime: null,
};

const TrackContext = createContext<{
  state: TrackState;
  dispatch: React.Dispatch<TrackAction>;
}>({
  state: initialState,
  dispatch: () => null,
});

const trackReducer = (state: TrackState, action: TrackAction): TrackState => {
  switch (action.type) {
    case 'SET_SELECTED_TRACK':
      return {
        ...state,
        selectedTrack: action.payload || null,
      };
    case 'CLEAR_SELECTED_TRACK':
      return {
        ...state,
        selectedTrack: null,
      };
    case 'SET_COMMENTS':
      return {
        ...state,
        comments: action.payload || [],
      };
    case 'SET_CURRENT_TIME':
      return {
        ...state,
        currentTime: action.payload || 0,
      };
    case 'SET_DURATION':
      return {
        ...state,
        duration: action.payload || 0,
      };
    case 'SET_SEEK_TIME':
      return {
        ...state,
        seekTime: action.payload,
      };
    case 'UPDATE_TRACK_METADATA':
      return {
        ...state,
        selectedTrack: {
          ...state.selectedTrack,
          ...action.payload,
        } as Track,
      };
    default:
      return state;
  }
};

export const TrackProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(trackReducer, initialState);

  return (
    <TrackContext.Provider value={{ state, dispatch }}>
      {children}
    </TrackContext.Provider>
  );
};

export const useTrack = () => useContext(TrackContext);
