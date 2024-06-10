import React from 'react';
import { Avatar, Menu, Text, Group } from '@mantine/core';
import { IconSettings, IconLogout } from '@tabler/icons-react';

const UserMenu: React.FC<{ userName: string }> = ({ userName }) => {
  return (
    <Menu>
      <Menu.Target>
        <Group style={{ cursor: 'pointer' }}>
          <Avatar src='./dave.jpeg' alt={userName} />
          <Text>{userName}</Text>
        </Group>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item leftSection={<IconSettings size={14} />}>Settings</Menu.Item>
        <Menu.Item leftSection={<IconLogout size={14} />}>Logout</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default UserMenu;
