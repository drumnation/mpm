import { FC, forwardRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin from 'wavesurfer.js/dist/plugins/regions.js';
import { useWaveformSetup } from './Waveform.hook';
import { Container } from './Waveform.styles';

interface WaveformProps {
  wavesurfer: WaveSurfer | null;
  wavesurferRef: React.RefObject<HTMLDivElement>;
  regionsPluginRef: React.RefObject<RegionsPlugin>;
}

const Waveform: FC<WaveformProps> = forwardRef(({ wavesurfer, wavesurferRef, regionsPluginRef }, ref) => {
  const { containerRef } = useWaveformSetup({ wavesurfer, regionsPluginRef, ref });

  return <Container ref={containerRef}><div ref={wavesurferRef} /></Container>;
});

export default Waveform;
