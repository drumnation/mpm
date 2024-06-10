import React, { memo } from 'react';
import { TrackProvider, WavesurferProvider } from '../../../contexts';
import Player from '../../3-organisms/Player/Player';
import { AsideComponent, HeaderComponent, NavbarComponent } from '../../4-templates/MusicReviewDashboard/MusicReviewDashboard';
import { FullLayout } from '../../6-system';

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
