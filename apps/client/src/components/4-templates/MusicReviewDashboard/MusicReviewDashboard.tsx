import { Box, Tabs } from '@mantine/core';
import React, { memo } from 'react';
import { tracks } from '../../../library/DummyMusicData';
import Logo from '../../1-atoms/Logo/Logo';
import { AudioCommentDisplay, TrackList, TrackMetadataForm } from '../../2-molecules';
import UserMenu from '../../3-organisms/UserMenu/UserMenu';

export const HeaderComponent: React.FC = () => {
  const userName = 'David Mieloch';

  return (
    <Box
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
        height: 60,
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #dee2e6',
        width: '100%'
      }}
    >
      <Logo />
      <UserMenu userName={userName} />
    </Box>
  );
};

export default HeaderComponent;


export const NavbarComponent: React.FC = memo(() => (
  <Box mt='xs'>
    <TrackList tracks={tracks} />
  </Box>
));

export const AsideComponent: React.FC = memo(() => (
  <Tabs defaultValue="Comments">
    <Tabs.List>
      <Tabs.Tab value="Comments">Comments</Tabs.Tab>
      <Tabs.Tab value="Metadata">Metadata</Tabs.Tab>
    </Tabs.List>

    <Tabs.Panel value="Comments">
      <AudioCommentDisplay />
    </Tabs.Panel>

    <Tabs.Panel value="Metadata">
      <TrackMetadataForm />
    </Tabs.Panel>
  </Tabs>
));
