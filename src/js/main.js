import { isOnVideoPage, waitForAdToShow, waitForAdToDisappear } from './util';
import { subscribe as subscribeToVideoChange } from './page-watcher';
import { embedOverlay, unembedOverlay, clearAllOverlays } from './embedder';
import { getDurationInSeconds } from './ad-durations';

subscribeToVideoChange(() => {
  if (isOnVideoPage()) {
    // Get rid of existing overlays
    clearAllOverlays();
    // Start the regular logic
    waitForAdToShow()
      .then(getDurationInSeconds)
      .then(duration => {
        // TODO get a video for this duration
        return embedOverlay('somerandomvidelurl');
      })
      .then(waitForAdToDisappear)
      .then(unembedOverlay)
      .catch(err => console.error('Could not get the ad duration'));
  }
});