import { AppShell, Burger, Group } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconCircleCaretLeft, IconCircleCaretRight } from '@tabler/icons-react';
import { FC, ReactNode, useState, memo, SetStateAction } from 'react';
import { ResizableBox } from 'react-resizable';
import 'react-resizable/css/styles.css';

interface FullLayoutProps {
  header: ReactNode;
  navbar: ReactNode;
  main: ReactNode;
  aside: ReactNode;
  footer: ReactNode;
}

const FullLayout: FC<FullLayoutProps> = ({ header, navbar, main, aside, footer }) => {
  const [opened, { toggle }] = useDisclosure();
  const [navbarWidth, setNavbarWidth] = useState<number>(570);
  const [asideWidth, setAsideWidth] = useState<number>(570);
  const [isNavbarMinimized, setNavbarMinimized] = useState<boolean>(false);
  const [isAsideMinimized, setAsideMinimized] = useState<boolean>(false);

  const MIN_COLUMN_WIDTH = 100;
  const MAX_COLUMN_WIDTH = 600;

  return (
    <AppShell
      header={{ height: 60 }}
      footer={{ height: 60 }}
      padding="md"
      styles={{
        main: { height: 'calc(100vh - 120px)', display: 'flex', flexDirection: 'column' },
      }}
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          {header}
        </Group>
      </AppShell.Header>
      <div style={{ display: 'flex', height: '100vh', overflow: 'hidden' }}>
        <ResizableBox
          width={isNavbarMinimized ? 40 : navbarWidth}
          height={Infinity}
          axis="x"
          minConstraints={[MIN_COLUMN_WIDTH, Infinity]}
          maxConstraints={[MAX_COLUMN_WIDTH, Infinity]}
          onResize={(e: any, data: { size: { width: SetStateAction<number> } }) => setNavbarWidth(data.size.width)}
          handle={
            <span
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#ccc',
                cursor: 'ew-resize',
                zIndex: 1,
                right: 0,
              }}
            />
          }
          style={{
            position: 'relative',
            height: '100%',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 5, marginTop: 62 }}>
              {isNavbarMinimized ? (
                <IconCircleCaretRight onClick={() => setNavbarMinimized(!isNavbarMinimized)} />
              ) : (
                <IconCircleCaretLeft onClick={() => setNavbarMinimized(!isNavbarMinimized)} />
              )}
            </div>
            <div style={{ overflowY: 'auto', flexGrow: 1 }}>{!isNavbarMinimized && navbar}</div>
          </div>
        </ResizableBox>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
          <AppShell.Main style={{ flex: 1, overflowY: 'auto' }}>{main}</AppShell.Main>
          {footer && <AppShell.Footer p="md">{footer}</AppShell.Footer>}
        </div>
        <ResizableBox
          width={isAsideMinimized ? 40 : asideWidth}
          height={Infinity}
          axis="x"
          minConstraints={[MIN_COLUMN_WIDTH, Infinity]}
          maxConstraints={[MAX_COLUMN_WIDTH, Infinity]}
          onResize={(_e: any, data: { size: { width: SetStateAction<number> } }) => setAsideWidth(data.size.width)}
          handle={
            <span
              style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                width: '2px',
                backgroundColor: '#ccc',
                cursor: 'ew-resize',
                zIndex: 1,
                left: 0,
              }}
            />
          }
          resizeHandles={['w']}
          style={{
            position: 'relative',
            height: '100%',
            border: '1px solid #ccc',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <div style={{ marginTop: 62, display: 'flex', justifyContent: 'flex-start', marginLeft: 5 }}>
              {isAsideMinimized ? (
                <IconCircleCaretLeft onClick={() => setAsideMinimized(!isAsideMinimized)} />
              ) : (
                <IconCircleCaretRight onClick={() => setAsideMinimized(!isAsideMinimized)} />
              )}
            </div>
            <div style={{ overflowY: 'auto', flexGrow: 1 }}>{!isAsideMinimized && aside}</div>
          </div>
        </ResizableBox>
      </div>
    </AppShell>
  );
};

export default memo(FullLayout);
