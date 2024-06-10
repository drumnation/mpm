import React, { ChangeEvent } from 'react';
import { Box, TextInput, Title } from '@mantine/core';
import { useTrack } from '../../../contexts';

const TrackMetadataForm: React.FC = () => {
  const { state, dispatch } = useTrack();
  const { selectedTrack } = state;

  if (!selectedTrack) {
    return <Box ta='center' mt='md'>No track selected</Box>;
  }

  const handleInputChange = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: 'UPDATE_TRACK_METADATA',
      payload: { [field]: event.target.value },
    });
  };

  return (
    <Box p='xs'>
      <div style={{ marginBottom: '.5rem' }} />
      <TextInput
        description="The album this track belongs to."
        label="Album"
        mt='xs'
        onChange={handleInputChange('album')}
        required
        value={selectedTrack.album}
        withAsterisk
      />
      <TextInput
        description="The primary artist for the album."
        label="Album Artist"
        mt='xs'
        onChange={handleInputChange('albumArtist')}
        required
        value={selectedTrack.albumArtist}
        withAsterisk
      />
      <TextInput
        description="The name of the artist who performed the track."
        label="Artist Name"
        mt='xs'
        onChange={handleInputChange('artistName')}
        required
        value={selectedTrack.artistName}
        withAsterisk
      />
      <TextInput
        description="Beats per minute of the track."
        label="BPM"
        mt='xs'
        onChange={handleInputChange('bpm')}
        value={selectedTrack.bpm}
      />
      <TextInput
        description="Any additional comments about the track."
        label="Comment"
        mt='xs'
        onChange={handleInputChange('comment')}
        value={selectedTrack.comment}
      />
      <TextInput
        description="The person who composed the track."
        label="Composer"
        mt='xs'
        onChange={handleInputChange('composer')}
        value={selectedTrack.composer}
      />
      <TextInput
        description="The disc number if part of a multi-disc album."
        label="Disc Number"
        mt='xs'
        onChange={handleInputChange('discNumber')}
        value={selectedTrack.discNumber}
      />
      <TextInput
        description="The duration of the track in seconds."
        label="Duration"
        mt='xs'
        onChange={handleInputChange('duration')}
        value={selectedTrack.duration}
      />
      <TextInput
        description="The file name of the track."
        label="Filename"
        mt='xs'
        onChange={handleInputChange('filename')}
        required
        value={selectedTrack.filename}
        withAsterisk
      />
      <TextInput
        description="The file type of the track (e.g., MP3, WAV)."
        label="File Type"
        mt='xs'
        onChange={handleInputChange('fileType')}
        value={selectedTrack.fileType}
      />
      <TextInput
        description="The genre of the track."
        label="Genre"
        mt='xs'
        onChange={handleInputChange('genre')}
        value={selectedTrack.genre}
      />
      <TextInput
        description="The name of the track."
        label="Track Name"
        mt='xs'
        onChange={handleInputChange('trackName')}
        required
        value={selectedTrack.trackName}
        withAsterisk
      />
      <TextInput
        description="The track number on the album."
        label="Track Number"
        mt='xs'
        onChange={handleInputChange('trackNumber')}
        value={selectedTrack.trackNumber}
      />
      <TextInput
        description="The year the track was released."
        label="Year"
        mt='xs'
        onChange={handleInputChange('year')}
        value={selectedTrack.year}
      />
    </Box>
  );
};

export default TrackMetadataForm;
