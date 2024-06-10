import { Paper } from '@mantine/core';
import { FC, memo } from 'react';

interface WaveformProps {
  wavesurferRef: React.RefObject<HTMLDivElement>;
  waveformContainerRef: React.RefObject<HTMLDivElement>;
}

const Waveform: FC<WaveformProps> = ({ wavesurferRef, waveformContainerRef }) => {
  return <Paper ref={waveformContainerRef} shadow='xs' p='xs' style={{ marginRight: 20, marginLeft: 20 }} withBorder>
    <div ref={wavesurferRef} />
  </Paper>
};

export default memo(Waveform);
