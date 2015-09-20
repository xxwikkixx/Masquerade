export function embedOverlay() {
  debugger;
  const $videoContent = $('.html5-video-content');
  const $videoContainer = $('.html5-video-container');

  const height = $videoContent.innerHeight();
  const width = $videoContent.innerWidth();

  const overlay = document.createElement('video');
  overlay.className = '___ad-overlay';
  overlay.style.position = 'relative';
  overlay.style.width = width + 'px';
  overlay.style.height = height + 'px';
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.backgroundColor = 'black';
  overlay.src = chrome.extension.getURL('/assets/duck.mp4');
  overlay.autoplay = true;
  
  /*
  const iframe = document.createElement('iframe');
  iframe.width = '100%';
  iframe.height = '100%';
  iframe.src = 'https://vine.co/v/OLYpnEjagqQ/embed/simple?audio=1';
  iframe.frameborder = '0';*/

  const source = document.createElement('source');
  source.autoPlay = true;
  source.width = '100%';
  source.height = '100%';
  //source.type = 'video/mp4';
 
  overlay.appendChild(source);
  //overlay.appendChild(iframe);

  $('.___ad-overlay').remove();
  $videoContainer.append(overlay);
}

export function unembedOverlay() {
  $('.___ad-overlay').remove();
}
