import { Badge, Box, Paper, Text } from '@mantine/core';
import React, { memo } from 'react';
import { AudioCommentInput, CurrentCommentDisplay } from '../../2-molecules';
import usePlayer from './Player.hook';
import { AudioControls, Waveform, ZoomControls } from './components';

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
    relativeBpm,
    trackName,
    wavesurfer,
    wavesurferRef,
    waveformContainerRef,
    zoomLevel,
    setZoomLevel
  } = usePlayer();

  return (
    <Box style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <Box style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 10 }}>
        {trackName && (
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <Text style={{ fontSize: 24, marginLeft: 20 }}>{trackName}</Text>
            <Badge ml="xs">{genre}</Badge>
          </Box>
        )}
        <ZoomControls zoomLevel={zoomLevel} setZoomLevel={setZoomLevel} />
      </Box>
      <Box>
        {filename !== undefined ? (
          <Waveform wavesurferRef={wavesurferRef} waveformContainerRef={waveformContainerRef} />
        ) : (
          <Paper
            shadow="xs"
            withBorder
            style={{
              display: 'flex',
              marginRight: 20,
              marginLeft: 20,
              alignItems: 'center',
              justifyContent: 'center',
              height: 300
            }}
          >
            <Text ta="center" style={{ fontSize: '24px', fontWeight: 'bold' }}>No track selected</Text>
          </Paper>
        )}
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

export default memo(Player);
