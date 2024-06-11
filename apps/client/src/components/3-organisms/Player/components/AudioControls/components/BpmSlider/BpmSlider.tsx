import { Paper, Slider } from '@mantine/core';
import { FC, memo } from 'react';

interface BpmSliderProps {
  handleBpmChange: (newRelativeBpm: number) => void;
  originalBpm: number | null;
  relativeBpm: number | null;
}

const BpmSlider: FC<BpmSliderProps> = ({ handleBpmChange, originalBpm, relativeBpm }) => {
  if (originalBpm === null) return null;

  return (
    <Paper shadow="xs" p="xl" style={{ textAlign: 'center' }} withBorder>
      <Slider
        color="blue"
        marks={[
          { value: originalBpm - 60, label: `${originalBpm - 60} BPM` },
          { value: originalBpm, label: `${originalBpm} BPM` },
          { value: originalBpm + 60, label: `${originalBpm + 60} BPM` },
        ]}
        min={originalBpm - 60}
        max={originalBpm + 60}
        step={1}
        value={relativeBpm ?? originalBpm}
        onChange={handleBpmChange}
      />
    </Paper>
  );
};

export default memo(BpmSlider);
