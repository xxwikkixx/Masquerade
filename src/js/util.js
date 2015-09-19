import $ from 'jquery-browserify';

const VIDEO_PAGE_REGEX        = /^\/?watch$/;
const AD_SELECTOR             = '.html5-video-player.ad-showing';
const VOLUME_PANEL_SELECTOR   = '.html5-video-player .ytp-volume-panel';
const MUTE_BUTTON_SELECTOR    = '.html5-video-player .ytp-mute-button';
const AD_CHECK_ATTEMPTS_MAX   = 40;

export function isOnVideoPage() {
  let path = window.location.pathname || '';
  return !!path.match(VIDEO_PAGE_REGEX);
}

export function isAdVisible() {
  return $(AD_SELECTOR).length > 0;
}

export function waitForAdToShow() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const intervalRef = setInterval(() => {
      if (attempts++ >= AD_CHECK_ATTEMPTS_MAX) {
        clearInterval(intervalRef);
        reject('attempts_exceeded');
      } else {
        if (isAdVisible()) {
          clearInterval(intervalRef);
          resolve();
        }
      }
    }, 50);
  });
}

export function muteAd() {
  if ($(VOLUME_PANEL_SELECTOR).attr('aria-valuetext').indexOf('muted') === -1) {
    $(MUTE_BUTTON_SELECTOR).click();
  }
}

export function waitForAdToDisappear() {
  return new Promise((resolve, reject) => {
    const intervalRef = setInterval(() => {
      if (!isAdVisible()) {
        clearInterval(intervalRef);
        resolve();
      }
    }, 50);
  });
}

export function unmuteVideo() {
  if ($(VOLUME_PANEL_SELECTOR).attr('aria-valuetext').indexOf('muted') !== -1) {
    $(MUTE_BUTTON_SELECTOR).click();
  }
}
