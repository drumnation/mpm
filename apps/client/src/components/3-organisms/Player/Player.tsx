import { Badge, Box, Paper, Text } from '@mantine/core';
import React from 'react';
import { AudioCommentInput, CurrentCommentDisplay } from '../../2-molecules';
import usePlayer from './Player.hook';
import { AudioControls, Waveform } from './components';

const Player: React.FC = () => {
  const {
    comments,
    currentTime,
    duration,
    filename,
    genre,
    handleAddComment,
    handleBpmChange,
    isPlaying,
    loadingBPM,
    originalBpm,
    regionsPluginRef,
    relativeBpm,
    trackName,
    wavesurfer,
    wavesurferRef
  } = usePlayer();

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {trackName && <Text style={{ fontSize: 24, display: 'flex', alignItems: 'center' }}>{trackName} <Badge ml='xs'>{genre}</Badge></Text>}
      <Box>
        {filename !== undefined ? <Waveform
          wavesurfer={wavesurfer}
          regionsPluginRef={regionsPluginRef}
          wavesurferRef={wavesurferRef}
        /> : <Paper shadow='xs' withBorder style={{ display: 'flex', marginRight: 20, marginLeft: 20, alignItems: 'center', justifyContent: 'center',  height: 300 }}><Text ta='center' style={{ fontSize: '24px', fontWeight: 'bold' }}>No track selected</Text></Paper>}
      </Box>
      <Box style={{ display: 'flex', gap: '40px', margin: '0 20px' }}>
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <AudioControls
            currentTime={currentTime}
            duration={duration}
            handleBpmChange={handleBpmChange}
            isPlaying={isPlaying}
            loadingBPM={loadingBPM}
            originalBpm={originalBpm}
            relativeBpm={relativeBpm}
            wavesurfer={wavesurfer}
          />
        </Box>
        <Box style={{ flex: 1, display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
          <AudioCommentInput currentTime={currentTime} onAddComment={handleAddComment} />
        </Box>
      </Box>
      <Box style={{ margin: '0 20px' }}>
        <CurrentCommentDisplay currentTime={currentTime} comments={comments} />
      </Box>
    </Box>
  );
};

export default Player;
