import styled from 'styled-components';

import NxWelcome from './nx-welcome';
import { FC } from 'react';

const StyledApp = styled.div`
  // Your style here
`;

export const App: FC = () => {
  return (
    <StyledApp>
      <NxWelcome title="mpm" />
    </StyledApp>
  );
}

export default App;
