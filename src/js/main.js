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

if (isOnVideoPage()) {
  waitForAdToShow()
    .then(() => {
      // The ad is visible, so mute that shit
      muteAd();
      putOverlayDiv();
      hideControl();
      // Add vine to the video here
      // TODO (John): add vine shit here
      // Wait for the ad to be gone
      waitForAdToDisappear()
        .then(() => {
          // The ad is no longer visible, so unmute that shit
          unmuteVideo();
          removeOverlay();
          showControl();
          // Remove the vine video here
          // TODO (John): remove the vine video here
        });
    })
    .catch((err) => {
      console.log('Something failed:', err);
    });
}
