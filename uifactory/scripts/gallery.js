var Masonry = require('masonry-layout');
var PhotoSwipe = require('photoswipe');
var PhotoSwipeUIDefault = require('photoswipe/dist/photoswipe-ui-default.js');

var MP = {gutter: 20, itemSelector: '.gallery-thumb', columnWidth: '.gallery-col-sizer'};

$(function() {
  var elem = $('.gallery').get(0);
  var masonry = new Masonry(elem, MP);
  // TODO: get gallery api url and place a handler on thumbnail click (initializing PhotoSwipe)

});

