import styled from 'styled-components';

// import NxWelcome from './nx-welcome';
import { FC } from 'react';
import { Player } from './5-pages';

const StyledApp = styled.div`
  // Your style here
`;

export const App: FC = () => {
  return (
    <>
      <h1>
        <span> Hello there, </span>
        Welcome 👋
      </h1>
      <StyledApp>
        <Player />
      </StyledApp>
    </>
  );
}

export default App;
