import {
  isOnVideoPage,
  waitForAdToShow,
  waitForAdToDisappear,
  muteAd,
  unmuteVideo,
  putOverlayDiv,
  removeOverlay,
  hideControl,
  showControl
  //buttonClick
} from './util';
import { subscribe as subscribeToVideoChange } from './page-watcher';
import { embedOverlay, unembedOverlay } from './embedder';

subscribeToVideoChange(() => {
  if (isOnVideoPage()) {
    // Get rid of existing overlays
    unembedOverlay();
    // Start the regular logic
    waitForAdToShow()
      .then(() => {
        // The ad is visible, so mute that shit
        muteAd();
        embedOverlay();
        hideControl();
        // Wait for the ad to be gone
        waitForAdToDisappear()
          .then(() => {
            // The ad is no longer visible, so unmute that shit
            unmuteVideo();
            unembedOverlay();
            showControl();
          });
      })
      .catch(() => null);
  }
});