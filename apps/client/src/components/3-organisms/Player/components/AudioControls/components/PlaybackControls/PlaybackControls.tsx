import { Box, Tooltip } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons-react';
import WaveSurfer from 'wavesurfer.js';
import { FC, memo } from 'react';

interface PlaybackControlsProps {
  isPlaying: boolean;
  wavesurfer: WaveSurfer | null;
}

const PlaybackControls: FC<PlaybackControlsProps> = ({ isPlaying, wavesurfer }) => (
  <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
    <Tooltip label="Rewind 10 seconds" withArrow position="top">
      <IconPlayerSkipBack style={{ marginRight: 7, cursor: 'pointer' }} onClick={() => wavesurfer?.skip(-10)} />
    </Tooltip>
    {isPlaying ? (
      <Tooltip label="Pause" withArrow position="top">
        <IconPlayerPause style={{ cursor: 'pointer' }} onClick={() => wavesurfer?.playPause()} />
      </Tooltip>
    ) : (
      <Tooltip label="Play" withArrow position="top">
        <IconPlayerPlay style={{ cursor: 'pointer' }} onClick={() => wavesurfer?.playPause()} />
      </Tooltip>
    )}
    <Tooltip label="Forward 10 seconds" withArrow position="top">
      <IconPlayerSkipForward style={{ marginLeft: 7, cursor: 'pointer' }} onClick={() => wavesurfer?.skip(10)} />
    </Tooltip>
  </Box>
);

export default memo(PlaybackControls);
