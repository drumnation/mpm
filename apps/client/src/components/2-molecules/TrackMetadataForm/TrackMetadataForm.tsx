import React, { ChangeEvent, useCallback, useReducer, useEffect, memo } from 'react';
import { Box, TextInput } from '@mantine/core';
import { useTrack } from '../../../contexts';
import { handleKeyDownPreventSpecificKeys } from '../../../library/helpers';
import debounce from 'lodash/debounce';

type Track = {
  album: string;
  albumArtist: string;
  artistName: string;
  bpm: string;
  comment: string;
  composer: string;
  discNumber: string;
  duration: string;
  filename: string;
  fileType: string;
  genre: string;
  trackName: string;
  trackNumber: string;
  year: string;
};

type TrackField = keyof Track;

const TrackMetadataInput = React.memo(({
  label,
  description,
  field,
  value,
  required,
  withAsterisk,
  handleInputChange,
  handleKeyDown,
}: {
  label: string;
  description: string;
  field: keyof Track;
  value: string;
  required?: boolean;
  withAsterisk?: boolean;
  handleInputChange: (field: keyof Track) => (event: ChangeEvent<HTMLInputElement>) => void;
  handleKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
}) => (
  <TextInput
    description={description}
    label={label}
    mt='xs'
    onKeyDown={handleKeyDown}
    onChange={handleInputChange(field)}
    required={required}
    value={value}
    withAsterisk={withAsterisk}
  />
));

const trackReducer = (state: Track, action: { type: 'UPDATE_FIELD'; field: TrackField; value: string }): Track => {
  switch (action.type) {
    case 'UPDATE_FIELD':
      return { ...state, [action.field]: action.value };
    default:
      return state;
  }
};

const defaultTrack: Track = {
  album: '',
  albumArtist: '',
  artistName: '',
  bpm: '',
  comment: '',
  composer: '',
  discNumber: '',
  duration: '',
  filename: '',
  fileType: '',
  genre: '',
  trackName: '',
  trackNumber: '',
  year: '',
};

const TrackMetadataForm: React.FC = () => {
  const { state: trackState, dispatch: trackDispatch } = useTrack();
  const { selectedTrack } = trackState as { selectedTrack: Track | null };

  const [formState, formDispatch] = useReducer(trackReducer, selectedTrack || defaultTrack);

  const handleInputChange = useCallback((field: keyof Track) => (event: ChangeEvent<HTMLInputElement>) => {
    formDispatch({
      type: 'UPDATE_FIELD',
      field,
      value: event.target.value,
    });
  }, []);

  useEffect(() => {
    const debouncedDispatch = debounce((updatedState: Track) => {
      trackDispatch({
        type: 'UPDATE_TRACK_METADATA',
        payload: updatedState,
      });
    }, 500);

    debouncedDispatch(formState);

    return () => {
      debouncedDispatch.cancel();
    };
  }, [formState, trackDispatch]);

  useEffect(() => {
    if (selectedTrack) {
      formDispatch({ type: 'UPDATE_FIELD', field: 'album', value: selectedTrack.album });
      formDispatch({ type: 'UPDATE_FIELD', field: 'albumArtist', value: selectedTrack.albumArtist });
      formDispatch({ type: 'UPDATE_FIELD', field: 'artistName', value: selectedTrack.artistName });
      formDispatch({ type: 'UPDATE_FIELD', field: 'bpm', value: selectedTrack.bpm });
      formDispatch({ type: 'UPDATE_FIELD', field: 'comment', value: selectedTrack.comment });
      formDispatch({ type: 'UPDATE_FIELD', field: 'composer', value: selectedTrack.composer });
      formDispatch({ type: 'UPDATE_FIELD', field: 'discNumber', value: selectedTrack.discNumber });
      formDispatch({ type: 'UPDATE_FIELD', field: 'duration', value: selectedTrack.duration });
      formDispatch({ type: 'UPDATE_FIELD', field: 'filename', value: selectedTrack.filename });
      formDispatch({ type: 'UPDATE_FIELD', field: 'fileType', value: selectedTrack.fileType });
      formDispatch({ type: 'UPDATE_FIELD', field: 'genre', value: selectedTrack.genre });
      formDispatch({ type: 'UPDATE_FIELD', field: 'trackName', value: selectedTrack.trackName });
      formDispatch({ type: 'UPDATE_FIELD', field: 'trackNumber', value: selectedTrack.trackNumber });
      formDispatch({ type: 'UPDATE_FIELD', field: 'year', value: selectedTrack.year });
    }
  }, [selectedTrack]);

  if (!selectedTrack) {
    return <Box ta='center' mt='md'>No track selected</Box>;
  }

  return (
    <Box p='xs'>
      <TrackMetadataInput
        label="Album"
        description="The album this track belongs to."
        field="album"
        value={formState.album}
        required={true}
        withAsterisk={true}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Album Artist"
        description="The primary artist for the album."
        field="albumArtist"
        value={formState.albumArtist}
        required={true}
        withAsterisk={true}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Artist Name"
        description="The name of the artist who performed the track."
        field="artistName"
        value={formState.artistName}
        required={true}
        withAsterisk={true}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="BPM"
        description="Beats per minute of the track."
        field="bpm"
        value={formState.bpm}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Comment"
        description="Any additional comments about the track."
        field="comment"
        value={formState.comment}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Composer"
        description="The person who composed the track."
        field="composer"
        value={formState.composer}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Disc Number"
        description="The disc number if part of a multi-disc album."
        field="discNumber"
        value={formState.discNumber}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Duration"
        description="The duration of the track in seconds."
        field="duration"
        value={formState.duration}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Filename"
        description="The file name of the track."
        field="filename"
        value={formState.filename}
        required={true}
        withAsterisk={true}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="File Type"
        description="The file type of the track (e.g., MP3, WAV)."
        field="fileType"
        value={formState.fileType}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Genre"
        description="The genre of the track."
        field="genre"
        value={formState.genre}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Track Name"
        description="The name of the track."
        field="trackName"
        value={formState.trackName}
        required={true}
        withAsterisk={true}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Track Number"
        description="The track number on the album."
        field="trackNumber"
        value={formState.trackNumber}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
      <TrackMetadataInput
        label="Year"
        description="The year the track was released."
        field="year"
        value={formState.year}
        handleInputChange={handleInputChange}
        handleKeyDown={handleKeyDownPreventSpecificKeys}
      />
    </Box>
  );
};

export default memo(TrackMetadataForm);
