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
} from './util';
import { subscribe as subscribeToVideoChange } from './page-watcher';

function handleVideoChanged() {
  if (isOnVideoPage()) {
    waitForAdToShow()
      .then(() => {
        // The ad is visible, so mute that shit
        muteAd();
        putOverlayDiv();
        hideControl();
        // Wait for the ad to be gone
        waitForAdToDisappear()
          .then(() => {
            // The ad is no longer visible, so unmute that shit
            unmuteVideo();
            removeOverlay();
            showControl();
          });
      })
      .catch(() => null);
  }
}

subscribeToVideoChange(handleVideoChanged);