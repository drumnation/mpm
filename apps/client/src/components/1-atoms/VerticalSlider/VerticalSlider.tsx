import { Group, rem } from '@mantine/core';
import { useMove } from '@mantine/hooks';
import { FC } from 'react';

interface VerticalSliderProps {
  value?: number;
  setValue: (value: number) => void;
}
const VerticalSlider: FC<VerticalSliderProps> = ({ value = 0.2, setValue }) => {
  const { ref } = useMove(({ y }: { y: number }) => setValue(1 - y));

  return (
    <Group justify="center">
      <div
        ref={ref}
        style={{
          width: rem(16),
          height: rem(120),
          backgroundColor: 'var(--mantine-color-blue-light)',
          position: 'relative',
        }}
      >
        {/* Filled bar */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            height: `${value * 100}%`,
            width: rem(16),
            backgroundColor: 'var(--mantine-color-blue-filled)',
          }}
        />

        {/* Thumb */}
        <div
          style={{
            position: 'absolute',
            bottom: `calc(${value * 100}% - ${rem(8)})`,
            left: 0,
            width: rem(16),
            height: rem(16),
            backgroundColor: 'var(--mantine-color-blue-7)',
          }}
        />
      </div>
    </Group>
  );
}

export default VerticalSlider;
