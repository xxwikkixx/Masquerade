import $ from 'jquery-browserify';

const VIDEO_PAGE_REGEX        = /^\/?watch$/;
const AD_SELECTOR             = '.html5-video-player.ad-showing';
const VOLUME_PANEL_SELECTOR   = '.html5-video-player .ytp-volume-panel';
const MUTE_BUTTON_SELECTOR    = '.html5-video-player .ytp-mute-button';
const AD_PROGRESS_BAR         = '.ytp-mini-progress-bar-container';
const AD_CHECK_ATTEMPTS_MAX   = 100;

export function isOnVideoPage() {
  let path = window.location.pathname || '';
  return !!path.match(VIDEO_PAGE_REGEX);
}

export function isAdVisible() {
  let result = ($('.ytp-mini-progress-bar-container').css('display') !== 'none' && $(AD_SELECTOR).length > 0);
  return result;
}

export function waitForAdToShow() {
  return new Promise((resolve, reject) => {
    let attempts = 0;
    const intervalRef = setInterval(() => {
      if (attempts++ >= AD_CHECK_ATTEMPTS_MAX) {
        clearInterval(intervalRef);
        reject('attempts_exceeded_show');
      } else {
        if (isAdVisible()) {
          console.log("AD is visible");
          clearInterval(intervalRef);
          resolve();
        } else {
            var i = 1 + 1;
            console.log("AD is not visible");
        }
      }
    }, 10);
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
    }, 100);
  });
}

export function unmuteVideo() {
  if ($(VOLUME_PANEL_SELECTOR).attr('aria-valuetext').indexOf('muted') !== -1) {
    $(MUTE_BUTTON_SELECTOR).click();
  }
}

export function hideControl(){
  $(".ytp-title ytp-title-extra-info").css("display", "none");
  $(".ytp-chrome-bottom").hide();
  $(".text-container ").hide();
}

export function showControl(){
  $(".ytp-title ytp-title-extra-info").css("visibility", "block");
  $(".ytp-chrome-bottom").show();
}

export function removeOverlay(){
  $("#addshole").remove();
}
