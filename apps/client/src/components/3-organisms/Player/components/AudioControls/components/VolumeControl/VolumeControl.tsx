import React, { useState } from 'react';
import { ActionIcon, Slider, Popover, Stack } from '@mantine/core';
import { IconVolume, IconVolume3, IconVolume2, IconVolumeOff } from '@tabler/icons-react';

const VolumeControl = () => {
  const [volume, setVolume] = useState(50);
  const [opened, setOpened] = useState(false);

  const handleVolumeChange = (value: number) => {
    setVolume(value);
    // Add your logic to update the audio volume here
  };

  const getVolumeIcon = () => {
    if (volume === 0) {
      return <IconVolumeOff size={18} />;
    } else if (volume < 33) {
      return <IconVolume size={18} />;
    } else if (volume < 66) {
      return <IconVolume2 size={18} />;
    } else {
      return <IconVolume3 size={18} />;
    }
  };

  return (
    <Popover
      opened={opened}
      onClose={() => setOpened(false)}
      position="top-start"
      withArrow
      trapFocus={false}
      closeOnEscape={false}
      width={40}
      >
      <Popover.Target>
        <ActionIcon variant="transparent" onClick={() => setOpened(!opened)}>
          {getVolumeIcon()}
        </ActionIcon>
      </Popover.Target>
      <Popover.Dropdown>
      <Stack align="center">
        <Slider
          value={volume}
          min={0}
          max={100}
          onChange={handleVolumeChange}
          size="sm"
        />
      </Stack>
      </Popover.Dropdown>
    </Popover>
  );
};

export default VolumeControl;
