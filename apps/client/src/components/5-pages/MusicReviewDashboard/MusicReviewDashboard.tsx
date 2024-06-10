import { TrackProvider } from '@/contexts/TrackContext/TrackContext.js';
import { WavesurferProvider } from '@/contexts/WavesurferContext/WavesurferContext.js';
import Player from '@components/3-organisms/Player/Player.js';
import { AsideComponent, HeaderComponent, NavbarComponent } from '@components/4-templates/MusicReviewDashboard/MusicReviewDashboard.js';
import FullLayout from '@components/6-system/FullLayout/FullLayout.js';

import React, { memo } from 'react';

const MusicReviewDashboard: React.FC = () => {
  return (
    <TrackProvider>
      <WavesurferProvider>
        <FullLayout
          header={<HeaderComponent />}
          navbar={<NavbarComponent />}
          main={<Player />}
          aside={<AsideComponent />}
          footer={null}
        />
      </WavesurferProvider>
    </TrackProvider>);
};

export default memo(MusicReviewDashboard);
