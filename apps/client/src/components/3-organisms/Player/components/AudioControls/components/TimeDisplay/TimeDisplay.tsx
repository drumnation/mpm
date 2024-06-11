import { Paper } from '@mantine/core';
import { FC, memo } from 'react';

interface TimeDisplayProps {
  currentTime: number;
  duration: number;
}

const TimeDisplay: FC<TimeDisplayProps> = ({ currentTime, duration }) => (
  <Paper style={{ marginLeft: 20, outline: '1px solid black', padding: '.25rem' }}>
    {`${Math.floor(currentTime / 60)}:${Math.floor(currentTime % 60).toString().padStart(2, '0')}
    / ${Math.floor(duration / 60)}:${Math.floor(duration % 60).toString().padStart(2, '0')}`}
  </Paper>
);

export default memo(TimeDisplay);
