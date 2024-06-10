import { Box, Loader, Paper, Slider, Text } from '@mantine/core';
import { IconPlayerPause, IconPlayerPlay, IconPlayerSkipBack, IconPlayerSkipForward } from '@tabler/icons-react';
import WaveSurfer from 'wavesurfer.js';
import { FC, memo } from 'react';

interface AudioControlsProps {
  currentTime: number;
  duration: number;
  handleBpmChange: (newRelativeBpm: number) => void;
  isPlaying: boolean;
  loadingBPM: boolean;
  originalBpm: number | null;
  relativeBpm: number | null;
  wavesurfer: WaveSurfer | null;
}

const AudioControls: FC<AudioControlsProps> = ({
  currentTime,
  duration,
  handleBpmChange,
  isPlaying,
  loadingBPM,
  originalBpm,
  relativeBpm,
  wavesurfer,
}) => {
  return (
    <Paper shadow="xs" p="xl" withBorder>
      <Paper shadow="xs" p="xs" mb='xs' withBorder>
        <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
          <Box style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            {/* <VolumeControl wavesurfer={wavesurfer} /> */}
            <IconPlayerSkipBack style={{ marginRight: 7 }} onClick={() => wavesurfer?.skip(-10)} />
            {isPlaying ? (
              <IconPlayerPause onClick={() => wavesurfer?.playPause()} />
            ) : (
              <IconPlayerPlay onClick={() => wavesurfer?.playPause()} />
            )}
            <IconPlayerSkipForward style={{ marginLeft: 7 }} onClick={() => wavesurfer?.skip(10)} />
          </Box>
          <Paper style={{ marginLeft: 20, outline: '1px solid black', padding: '.25rem' }}>
            {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}
          / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
          </Paper>
        </Box>
      </Paper>
      {duration !== 0 && originalBpm ? (
        <Paper shadow="xs" p="xl" style={{ textAlign: 'center' }} withBorder>
          <Slider
            color="blue"
            marks={[
              { value: originalBpm - 60, label: `${originalBpm - 60} BPM` },
              { value: originalBpm, label: `${originalBpm} BPM` },
              { value: originalBpm + 60, label: `${originalBpm + 60} BPM` },
            ]}
            defaultValue={originalBpm}
            min={originalBpm - 60}
            max={originalBpm + 60}
            step={1}
            value={relativeBpm || originalBpm}
            onChange={handleBpmChange}
          />
        </Paper>
      ) : <Paper shadow="xs" p={!loadingBPM ? 'xl' : 'md'} style={{ textAlign: 'center' }} withBorder>{loadingBPM && <Loader />}</Paper>}
    </Paper>
  );
};

export default memo(AudioControls);
