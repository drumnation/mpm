

import UserMenu from '@components/3-organisms/UserMenu/UserMenu.js';

import { tracks } from '@/library/DummyMusicData.js';
import { Box, Tabs } from '@mantine/core';
import React, { memo } from 'react';
import TrackList from '@/components/2-molecules/TrackList/TrackList.js';
import AudioCommentDisplay from '@/components/2-molecules/AudioCommentDisplay/AudioCommentDisplay.js';
import TrackMetadataForm from '@/components/2-molecules/TrackMetadataForm/TrackMetadataForm.js';
import Logo from '@components/1-atoms/Logo/Logo.js';

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
