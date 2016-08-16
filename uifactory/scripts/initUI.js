// eslint-disable-next-line no-unused-vars
import PhotoSwipe from 'photoswipe';

// eslint-disable-next-line no-unused-vars
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import Gallery from './Gallery.js';
import YTPlayerEmbed from './YTPlayerEmbed.js';

document.onreadystatechange = () => {
  if (document.readyState === 'interactive') {
    if (document.getElementById('ytplayer')) {
      window.onYouTubeIframeAPIReady = YTPlayerEmbed;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/player_api';
      document.head.appendChild(tag);
    }
  }
  if (document.readyState === 'complete') {
    Gallery.createGallery(PhotoSwipe, PhotoSwipeUIDefault);
  }
};
