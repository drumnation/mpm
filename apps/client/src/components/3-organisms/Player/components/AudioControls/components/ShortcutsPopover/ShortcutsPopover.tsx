import React, { useState } from 'react';
import { Popover, Button, Text, Box, Group, Tooltip } from '@mantine/core';
import { IconInfoCircle, IconArrowRight, IconArrowLeft, IconMouse, IconZoomIn, IconPlayerPlay, IconPlayerPause, IconSpace } from '@tabler/icons-react';

const ShortcutsPopover: React.FC = () => {
  const [opened, setOpened] = useState(false);

  return (
    <Popover opened={opened} onChange={setOpened} width={260} position="top" withArrow shadow="md">
      <Popover.Target>
        <Tooltip label="Show keyboard shortcuts" position='bottom' withArrow>
          <IconInfoCircle onClick={() => setOpened((o) => !o)} size={20} color='blue' style={{ marginRight: 10 }} />
        </Tooltip>
      </Popover.Target>
      <Popover.Dropdown>
        <Box p="xs">
          <Text fw={500} mb="xs">Keyboard Shortcuts</Text>
          <Group gap="xs" align="center">
            <IconArrowRight size={16} />
            <Text>Forward 5 sec</Text>
            <Text c="dimmed">(Arrow Right, D)</Text>
          </Group>
          <Group gap="xs" align="center" mt="xs">
            <IconArrowLeft size={16} />
            <Text>Backward 5 sec</Text>
            <Text c="dimmed">(Arrow Left, A)</Text>
          </Group>
          <Group gap="xs" align="center" mt="xs">
            <IconMouse size={16} />
            <Text>Vertically scroll timeline</Text>
            <Text c="dimmed">(Shift + Mouse Wheel)</Text>
          </Group>
          <Group gap="xs" align="center" mt="xs">
            <IconZoomIn size={16} />
            <Text>Zoom</Text>
            <Text c="dimmed">(Ctrl + Mouse Wheel)</Text>
          </Group>
          <Group gap="xs" align="center" mt="xs">
            <IconPlayerPlay size={16} />
            <IconPlayerPause size={16} />
            <Text>Play/Pause</Text>
            <Text c="dimmed">(Spacebar)</Text>
          </Group>
        </Box>
      </Popover.Dropdown>
    </Popover>
  );
};

export default ShortcutsPopover;
