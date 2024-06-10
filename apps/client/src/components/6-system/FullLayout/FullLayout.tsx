import { AppShell, Burger, Group, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import React, { FC, ReactNode, useState } from 'react';
import { ResizableBox } from 'react-resizable';
import styled from 'styled-components';
import 'react-resizable/css/styles.css';
import { useMiddleArea } from '../../../contexts';
import { IconCaretLeft, IconCaretRight, IconCircleCaretLeft, IconCircleCaretRight, IconMinimize } from '@tabler/icons-react';

interface FullLayoutProps {
  header: ReactNode;
  navbar: ReactNode;
  main: ReactNode;
  aside: ReactNode;
  footer: ReactNode;
}

const ResizableContainer = styled.div`
  display: flex;
  height: 100vh; /* Ensuring full height to the footer */
  overflow: hidden;
`;

const ResizableBoxStyled = styled(ResizableBox)`
  position: relative;
  height: 100%;
  border: 1px solid #ccc; /* Adding border for visibility */
  display: flex;
  flex-direction: column;
`;

const CustomHandle = styled.span`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 2px;
  background-color: #ccc; /* Adding color to the handle for visibility */
  cursor: ew-resize;
  z-index: 1;
`;

const CustomHandleNavbar = styled(CustomHandle)`
  right: 0;
`;

const CustomHandleAside = styled(CustomHandle)`
  left: 0;
`;

const FullLayout: FC<FullLayoutProps> = ({ header, navbar, main, aside, footer }) => {
  const [opened, { toggle }] = useDisclosure();
  const [navbarWidth, setNavbarWidth] = useState<number>(300);
  const [asideWidth, setAsideWidth] = useState<number>(300);
  const [isNavbarMinimized, setNavbarMinimized] = useState<boolean>(false);
  const [isAsideMinimized, setAsideMinimized] = useState<boolean>(false);
  const { middleAreaRef } = useMiddleArea();

  const MIN_COLUMN_WIDTH = 100;
  const MAX_COLUMN_WIDTH = 600;

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
      styles={{
        main: { height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' }, // Ensuring the main content takes full height
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {header}
        </Group>
      </AppShell.Header>
      <ResizableContainer>
        <ResizableBoxStyled
          width={isNavbarMinimized ? 40 : navbarWidth}
          height={Infinity}
          axis="x"
          minConstraints={[MIN_COLUMN_WIDTH, Infinity]}
          maxConstraints={[MAX_COLUMN_WIDTH, Infinity]}
          onResize={(e, data) => setNavbarWidth(data.size.width)}
          handle={<CustomHandleNavbar />}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 5, marginTop: 60 }}>
              {isNavbarMinimized ?
                <IconCircleCaretRight onClick={() => setNavbarMinimized(!isNavbarMinimized)} />
                : <IconCircleCaretLeft onClick={() => setNavbarMinimized(!isNavbarMinimized)} />}
            </div>
            <div style={{ overflowY: 'auto', flexGrow: 1 }}> {/* Allowing the inner content to scroll */}
              {!isNavbarMinimized && navbar}
            </div>
          </div>
        </ResizableBoxStyled>
        <div ref={middleAreaRef} style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AppShell.Main style={{ flex: 1, overflowY: 'auto' }}>
            {main}
          </AppShell.Main>
          {footer && <AppShell.Footer p="md">
            {footer}
          </AppShell.Footer>}
        </div>
        <ResizableBoxStyled
          width={isAsideMinimized ? 40 : asideWidth}
          height={Infinity}
          axis="x"
          minConstraints={[MIN_COLUMN_WIDTH, Infinity]}
          maxConstraints={[MAX_COLUMN_WIDTH, Infinity]}
          onResize={(e, data) => setAsideWidth(data.size.width)}
          handle={<CustomHandleAside />}
          resizeHandles={['w']}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: 60, display: 'flex', justifyContent: 'flex-end', marginRight: 5 }}>
              {isAsideMinimized ?
                <IconCircleCaretLeft onClick={() => setAsideMinimized(!isAsideMinimized)} />
                : <IconCircleCaretRight onClick={() => setAsideMinimized(!isAsideMinimized)} />}
            </div>
            <div style={{ overflowY: 'auto', flexGrow: 1 }}>
              {!isAsideMinimized && aside}
            </div>
          </div>
        </ResizableBoxStyled>
      </ResizableContainer>
    </AppShell>
  );
};

export default FullLayout;
