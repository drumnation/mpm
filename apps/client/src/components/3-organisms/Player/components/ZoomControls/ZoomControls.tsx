import { Box, Slider } from '@mantine/core';
import { IconZoomIn, IconZoomOut } from '@tabler/icons-react';
import React, { memo } from 'react';

interface ZoomControlsProps {
  zoomLevel: number;
  setZoomLevel: (level: number) => void;
}

const ZoomControls: React.FC<ZoomControlsProps> = ({ zoomLevel, setZoomLevel }) => {
  const handleZoomChange = (value: number) => {
    setZoomLevel(value);
  };
  const valueLabelFormat = `${zoomLevel}%`;

  return (
    <Box style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '250px', marginRight: 20 }}>
      <IconZoomOut onClick={() => handleZoomChange(zoomLevel - 10)} style={{ cursor: 'pointer' }} />
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
      <IconZoomIn onClick={() => handleZoomChange(zoomLevel + 10)} style={{ cursor: 'pointer' }} />
    </Box>
  );
};

export default memo(ZoomControls);
