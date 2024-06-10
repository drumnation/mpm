import styled from 'styled-components';
import { FC, memo } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { MusicReviewDashboard } from './5-pages';


const theme = createTheme({
  /** Put your mantine theme override here */
});

const StyledApp = styled.div`
  // Your style here
`;

const App: FC = () => {
  return (
    <MantineProvider theme={theme}>
      <Router>
        <StyledApp>
          <Routes>
            <Route path="/" element={<h1>Welcome 👋 <a href='/music-review-dashboard'>continue to dashboard demo</a></h1>} />
            <Route path="/music-review-dashboard" element={<MusicReviewDashboard />} />
            {/* <Route path="/dashboard1" element={<Dashboard1 />} />
            <Route path="/dashboard2" element={<Dashboard2 />} /> */}
          </Routes>
        </StyledApp>
      </Router>
    </MantineProvider>
  );
}

export default memo(App);
