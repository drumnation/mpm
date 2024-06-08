import styled from 'styled-components';

// import NxWelcome from './nx-welcome';
import { FC } from 'react';
import { Player } from './5-pages';

const StyledApp = styled.div`
  // Your style here
`;

export const App: FC = () => {
  return (
    <StyledApp>
      <Player />
    </StyledApp>
  );
}

export default App;
