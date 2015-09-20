import $ from 'jquery-browserify';
import { muteAd, unmuteVideo, showControl, hideControl } from './util';

const OVERLAY_CLASS = '___ad-overlay';
const OVERLAY_SELECTOR = '.' + OVERLAY_CLASS;

export function embedOverlay(videoName) {
  return new Promise((resolve, reject) => {
    muteAd();
    hideControl();

    const $videoContent = $('.html5-video-content');
    const $videoContainer = $('.html5-video-container');

    const height = $videoContent.innerHeight();
    const width = $videoContent.innerWidth();

    const overlay = document.createElement('div');
    overlay.className = OVERLAY_CLASS;
    overlay.style.position = 'relative';
    overlay.style.width = width + 'px';
    overlay.style.height = height + 'px';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.backgroundColor = 'black';

    const iframe = document.createElement('iframe');
    iframe.width = '100%';
    iframe.height = '100%';
    iframe.src = 'https://vine.co/v/OLYpnEjagqQ/embed/simple?audio=1';
    iframe.frameborder = '0';

    overlay.appendChild(iframe);

    $(OVERLAY_SELECTOR).remove();
    $videoContainer.append(overlay);

    return resolve();
  });
}

export function unembedOverlay() {
  return new Promise((resolve, reject) => {
    showControl();
    unmuteVideo();
    clearAllOverlays();

    return resolve();
  });
}

export function clearAllOverlays() {
  $(OVERLAY_SELECTOR).remove();
}