import { RefObject, useEffect } from 'react';
import WaveSurfer from 'wavesurfer.js';
import RegionsPlugin, { Region } from 'wavesurfer.js/dist/plugins/regions.esm.js';

export const useEventHandlers = (
  wavesurfer: WaveSurfer | null,
  regionsPluginRef: RefObject<RegionsPlugin>,
  onTimeUpdate: (time: number) => void,
  onRegionUpdate: (region: Region) => void
) => {
  useEffect(() => {
    if (wavesurfer) {
      const updateCurrentTime = () => onTimeUpdate(wavesurfer.getCurrentTime());
      wavesurfer.on('audioprocess', updateCurrentTime);
      wavesurfer.on('seeking', updateCurrentTime);
      return () => {
        wavesurfer.un('audioprocess', updateCurrentTime);
        wavesurfer.un('seeking', updateCurrentTime);
      };
    }
  }, [wavesurfer, onTimeUpdate]);

  useEffect(() => {
    if (regionsPluginRef.current) {
      regionsPluginRef.current.on('region-updated', onRegionUpdate);
      regionsPluginRef.current.on('region-in', onRegionUpdate);
      regionsPluginRef.current.on('region-out', onRegionUpdate);
    }
  }, [onRegionUpdate, regionsPluginRef]);
};
