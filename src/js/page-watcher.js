const CURRENT_VIDEO_REGEX = /\??v=([a-zA-Z0-9]+)/;

let currentVideoId = null;
let onVideoChanged = () => {};

function getVideoId() {
  let search = window.location.search || '';
  let match = CURRENT_VIDEO_REGEX.exec(search);
  if (match) {
    let videoId = match[1];
    return videoId;
  } else {
    return null;
  }
}

export function subscribe(listener) {
  onVideoChanged = listener;
}

setInterval(() => {
  let videoId = getVideoId();
  if (currentVideoId !== videoId) {
    currentVideoId = videoId;
    console.log('onVideoChanged');
    onVideoChanged();
  }
}, 17);
