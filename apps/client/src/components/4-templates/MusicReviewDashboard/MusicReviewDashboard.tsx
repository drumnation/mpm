import { Box, Image, Tabs, Text } from '@mantine/core';
import React, { memo } from 'react';
import { AudioCommentDisplay, TrackList, TrackMetadataForm } from '../../2-molecules';
import { tracks } from '../../../library/DummyMusicData';

export const HeaderComponent: React.FC = memo(() => (
  <>
    <Image src='./favicon-32x32.png' />
    <Text>Music Project Management</Text>
  </>
));

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
