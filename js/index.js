"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css')
const styles = require('../css/style.scss')
const $ = require('jquery')
const fullpage = require('fullpage.js')

const videos = {
  2: document.querySelector('#search-video'),
  3: document.querySelector('#radio-video'),
  4: document.querySelector('#collections-video'),
}

const swapVideos = (index, nextIndex) => {
  const previousVideo = videos[index];
  const nextVideo = videos[nextIndex];

  if (previousVideo) {
    previousVideo.pause()
  }

  if (nextVideo) {
    nextVideo.play()
  }
}
const toggleDownload = (index) => {
  $('.main-header').find('.download').toggleClass('hide', index === 1)
}

$(document).ready(function() {
  $('#fullpage').fullpage({
    navigation: true,
    afterLoad(anchorLink, index) {
      toggleDownload(index)
    },
    onLeave(index, nextIndex, direction) {
      toggleDownload(index)
      swapVideos(index, nextIndex)
    }
  });

  $('.scroll-arrow').click(() => {
    $.fn.fullpage.moveSectionDown();
  })
});
