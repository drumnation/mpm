import React, { useState } from 'react';
import { TextInput, Button, Container, Alert } from '@mantine/core';
import styled from 'styled-components';

interface IframeLoaderProps {
  initialUrl?: string;
}

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 16px;
  margin-top: 16px;
  width: 1400px;
`;

const StyledTextInput = styled(TextInput)`
  flex: 1;
  min-width: 1000px;
  border-radius: 8px;
`;

const IframeLoader: React.FC<IframeLoaderProps> = ({ initialUrl = '' }) => {
  const [url, setUrl] = useState<string>(initialUrl);
  const [inputUrl, setInputUrl] = useState<string>(initialUrl);
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputUrl(event.target.value);
  };

  const handleLoadUrl = () => {
    setError(null);
    if (isValidUrl(inputUrl)) {
      setUrl(inputUrl);
    } else {
      setError('Invalid URL');
    }
  };

  const isValidUrl = (urlString: string) => {
    try {
      new URL(urlString);
      return true;
    } catch (e) {
      return false;
    }
  };

  return (
    <Container>
      <Wrapper>
        <StyledTextInput
          value={inputUrl}
          onChange={handleInputChange}
          placeholder="Enter a web address"
          label="URL"
          withAsterisk
        />
        <Button onClick={handleLoadUrl}>Load URL</Button>
      </Wrapper>
      {error && (
        <Alert title="Error" color="red" mt="md">
          {error}
        </Alert>
      )}
      {url && !error && (
        <iframe
          src={`http://localhost:3333/iframe?url=${encodeURIComponent(url)}`}
          style={{ width: '100%', height: '500px', border: 'none', marginTop: '16px' }}
          title="Iframe Loader"
          onError={() => setError('Failed to load the URL')}
        ></iframe>
      )}
    </Container>
  );
};

export default IframeLoader;
