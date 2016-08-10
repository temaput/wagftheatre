// eslint-disable-next-line
import Masonry from 'masonry-layout';

// eslint-disable-next-line no-unused-vars
import PhotoSwipe from 'photoswipe';

// eslint-disable-next-line no-unused-vars
import PhotoSwipeUIDefault from 'photoswipe/dist/photoswipe-ui-default.js';
import Gallery from './Gallery.js';

document.onreadystatechange = () => {
  if (document.readyState === 'complete') {
    Gallery.createGallery(PhotoSwipe, PhotoSwipeUIDefault);
  }
};
