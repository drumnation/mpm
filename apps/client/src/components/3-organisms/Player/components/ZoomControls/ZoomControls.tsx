import { Box, Slider, Tooltip } from '@mantine/core';
import { IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import React, { memo } from 'react';

interface ZoomControlsProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomLevel, setZoomLevel }) => {
  const handleZoomChange = (value: number) => {
    if (value >= 0 && value <= 300) {
      setZoomLevel(value);
    }
  };

  const handleZoomOut = () => {
    if (zoomLevel > 0) {
      handleZoomChange(zoomLevel - 10);
    }
  };

  const handleZoomIn = () => {
    if (zoomLevel < 300) {
      handleZoomChange(zoomLevel + 10);
    }
  };

  const valueLabelFormat = `${zoomLevel}%`;

  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '250px', marginRight: 20 }}>
      <Tooltip label="Zoom Out" withArrow position="top">
        <IconZoomOut onClick={handleZoomOut} style={{ cursor: zoomLevel > 0 ? 'pointer' : 'not-allowed' }} />
      </Tooltip>
      <Slider
        value={zoomLevel}
        onChange={handleZoomChange}
        min={0}
        max={300}
        marks={[
          { value: 0, label: '0%' },
          { value: 150, label: '50%' },
          { value: 300, label: '100%' },
        ]}
        labelTransitionProps={{
          transition: 'skew-down',
          duration: 150,
          timingFunction: 'linear',
        }}
        label={valueLabelFormat}
        style={{ flex: 1 }}
      />
      <Tooltip label="Zoom In" withArrow position="top">
        <IconZoomIn onClick={handleZoomIn} style={{ cursor: zoomLevel < 300 ? 'pointer' : 'not-allowed' }} />
      </Tooltip>
    </Box>
  );
};

export default memo(ZoomControls);
