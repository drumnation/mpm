// Waveform.hook.ts
import { ForwardedRef, RefObject, useImperativeHandle, useRef } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.esm.js';
import { useZoom } from '../../hooks';

interface UseWaveformSetupProps {
  wavesurfer: WaveSurfer | null;
  regionsPluginRef: RefObject<RegionsPlugin>;
  ref: ForwardedRef<unknown>;
}

export const useWaveformSetup = ({ wavesurfer, regionsPluginRef, ref }: UseWaveformSetupProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useZoom(wavesurfer, containerRef);

  useImperativeHandle(ref, () => ({
    addRegion: (id: string, time: number, content: string) => {
      if (regionsPluginRef.current) {
        regionsPluginRef.current.addRegion({
          id,
          start: time,
          end: time + 1,
          color: 'rgba(0, 0, 0, 0.5)',
          drag: true,
          resize: true,
          content: `${id}: ${content.length > 10 ? content.substring(0, 10) + '...' : content}`,
        });
      }
    },
    updateRegionContent: (id: string, time: number, content: string) => {
      if (regionsPluginRef.current) {
        const regions = regionsPluginRef.current.getRegions();
        const region = regions.find((r: Region) => r.id === id);
        if (region) {
          region.setOptions({
            start: time,
            end: time + 1,
            content: `${id}: ${content.length > 10 ? content.substring(0, 10) + '...' : content}`,
          });
        }
      }
    },
  }));
  return { containerRef };
};
