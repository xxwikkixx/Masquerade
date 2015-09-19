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
  console.log('$(AD_SELECTOR).length', $(AD_SELECTOR).length);
  return $(AD_SELECTOR).length > 0;
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
    console.log('sup');
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

export function putOverlayDiv() {
  console.log('shit dont work');
  // 1. Get the width and height of the video tag
  var height = $(".html5-video-content").innerHeight();
  console.log(height);
  var width = $(".html5-video-content").innerWidth();
  console.log(width);

  var overlay = document.createElement("div");
  overlay.id = "addshole";
  overlay.style.position = "relative";
  overlay.style.width = width+"px";
  overlay.style.height = height+"px";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.backgroundColor = "black";

  var iframe = document.createElement("iframe");
  iframe.width = "100%";
  iframe.height = "100%";
  iframe.src = "https://vine.co/v/OLYpnEjagqQ/embed/simple?audio=1";
  iframe.frameborder = "0";
  overlay.appendChild(iframe);

/*
  var videoElement = document.createElement("video");
  videoElement.preload = "auto";
  videoElement.src = "blob:https%3A//vine.co/846bc7f1-8507-4782-844a-2de5ac0977b9";
  videoElement.width = width +"px";
  videoElement.height = height +"px";
  videoElement.poster = "https://v.cdn.vine.co/r/videos/0A5BE7764A1195142597631676416_3c9b1cc6dbb.2.1.14353256269741552483.mp4.jpg?versionId=WH6UMn12Hvvqh0E2YTKIPkWjzhgN_bPN";
  overlay.appendChild(videoElement);
*/
  $(".html5-video-container").append(overlay);

  // 2. Create a new div of the same width and height of the video tg
  /*
  // 3. Make the video container div position  relative
  // 4. Make the new ovelay div position absolute
  // 5. Add the new overlay div to the video container div
  // 6. profit

//ytp-title ytp-title-extra-info
//"ytp-chrome-bottom
  */
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