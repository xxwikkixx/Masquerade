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

    const video = document.createElement('video');
    video.style.width = width + 'px';
    video.style.height = height + 'px';
    video.style.backgroundColor = 'black';
    video.src = chrome.extension.getURL('/assets/' + videoName);
    video.autoplay = true;

    const plug = document.createElement('div');
    plug.className = '__plug';
    plug.innerHTML = '<div class="logo">Masquer<span>ad</span>e</div><div class="sep"></div><div class="msg">Ad Mask In Progress</div>';
    plug.style.position = 'absolute';
    plug.style.top = '0';
    plug.style.left = '0';

    overlay.appendChild(video);
    overlay.appendChild(plug);

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