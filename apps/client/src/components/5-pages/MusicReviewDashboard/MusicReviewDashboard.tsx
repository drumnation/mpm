import React, { useEffect } from 'react';
import { FullLayout } from '../../6-system';
import { Box, Image, Tabs, Text } from '@mantine/core';
import Player from '../../3-organisms/Player/Player';
import { generateCommentsForAllTracks, tracks } from './DummyMusicData';
import { TrackProvider, MiddleAreaProvider, useTrack } from '../../../contexts';
import { AudioCommentDisplay, TrackList, TrackMetadataForm } from '../../2-molecules';

const HeaderComponent: React.FC = () => (
  <>
    <Image src='./favicon-32x32.png' />
    <Text>Music Project Management</Text>
  </>
);

const NavbarComponent: React.FC = () => (
  <Box mt='xs'>
    <TrackList tracks={tracks} />
  </Box>
);

const AsideComponent: React.FC = () => (
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
);

// const FooterComponent: React.FC = () => (
//   <Text>Footer</Text>
// );

const MusicReviewDashboard: React.FC = () => {
  // const { dispatch } = useTrack();
  // useEffect(() => {
  //   // @ts-expect-error - TS doesn't know about the electron dialog
  //   const generateComments = async () => {
  //     const comments = await generateCommentsForAllTracks(tracks)
  //     console.debug('comments', comments);
  //     dispatch({ type: 'SET_COMMENTS', payload: comments })
  //   };
  //   generateComments();
  // }, [dispatch]);

  return (
  <TrackProvider>
    <MiddleAreaProvider>
      <FullLayout
        header={<HeaderComponent />}
        navbar={<NavbarComponent />}
        main={<Player />}
        aside={<AsideComponent />}
        footer={null}
      />
    </MiddleAreaProvider>
  </TrackProvider>);
};

export default MusicReviewDashboard;
