import { Box, Loader, Paper, Text } from '@mantine/core';
import WaveSurfer from 'wavesurfer.js';
import { FC, memo } from 'react';
import PlaybackControls from './components/PlaybackControls/PlaybackControls.js';
import TimeDisplay from './components/TimeDisplay/TimeDisplay.js';
import BpmSlider from './components/BpmSlider/BpmSlider.js';
import ShortcutsPopover from '@/components/3-organisms/Player/components/AudioControls/components/ShortcutsPopover/ShortcutsPopover.js';

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
          <ShortcutsPopover />
          <PlaybackControls isPlaying={isPlaying} wavesurfer={wavesurfer} />
          <TimeDisplay currentTime={currentTime} duration={duration} />
        </Box>
      </Paper>
      {loadingBPM ? (
        <Paper shadow="xs" p="md" style={{ textAlign: 'center' }} withBorder>
          <Box>
            <Text mb='xs' fw='bold'>Analyzing Track BPM</Text>
            <Loader />
          </Box>
        </Paper>
      ) : (
        duration !== 0 && originalBpm !== null && (
          <BpmSlider handleBpmChange={handleBpmChange} originalBpm={originalBpm} relativeBpm={relativeBpm} />
        )
      )}
    </Paper>
  );
};

export default memo(AudioControls);
