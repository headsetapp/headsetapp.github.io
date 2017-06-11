"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css');
const styles = require('../css/style.scss');
const $ = require('jquery');
const fullpage = require('fullpage.js');
const MobileDetect = require('mobile-detect');

const md = new MobileDetect(window.navigator.userAgent);
const demos = {
  2: document.querySelector('#search-demo'),
  3: document.querySelector('#collections-demo'),
  4: document.querySelector('#radio-demo'),
}

const swapVideos = (index, nextIndex) => {
  const previousVideo = demos[index];
  const nextVideo = demos[nextIndex];

  if (previousVideo) {
    previousVideo.pause()
  }

  if (nextVideo) {
    nextVideo.play()
  }
}

const renderHeroBackground = () => {
  const url = '../images/bg1.jpg'
  const img = new Image();
  img.onload = function(){
   $('.overlay').css({'background-image': 'url('+url+')', 'opacity': 1});
  }
  img.src = url;
}

const initFullPageJs = () => {
  $('#fullpage').fullpage({
    navigation: true,
    scrollBar: true,
    touchSensitivity: 0,
    onLeave(index, nextIndex, direction) {
      swapVideos(index, nextIndex)
    }
  });

  $('.scroll-arrow').click(() => {
    $.fn.fullpage.moveSectionDown();
  })
}

const handleMobileDetection = () => {
  if (md.mobile()) {
    // replace videos with images
    const demos = ['search-demo', 'collections-demo','radio-demo'];
    demos.forEach((demo) => {
      $(`#${demo}`).replaceWith(`<img src='images/${demo}.png' id='${demo}' class='demo-image'/>`)
    })
    $('.download').removeClass('download').html('<p>Available for Windows, Mac and Ubuntu.</p>')
    $('.demo').click(function() {
      $(this).toggleClass('active')
    })
  }

}

$(document).ready(() => {
  initFullPageJs()
  renderHeroBackground()
  handleMobileDetection()
});
