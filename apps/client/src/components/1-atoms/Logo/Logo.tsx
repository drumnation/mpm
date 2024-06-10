import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Image, Text } from '@mantine/core';

const Logo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate('/')} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
      <Image src='./favicon-32x32.png' alt='Logo' style={{ marginRight: 10 }} />
      <Text>Music Project Management</Text>
    </div>
  );
};

export default Logo;
