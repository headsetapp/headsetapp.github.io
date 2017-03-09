"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css')
const styles = require('../css/style.scss')
const $ = require('jquery')
const fullpage = require('fullpage.js')
const SmartPhone = require('detect-mobile-browser')(false);

const demos = {
  2: document.querySelector('#search-demo'),
  3: document.querySelector('#radio-demo'),
  4: document.querySelector('#collections-demo'),
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

const toggleDownload = (index) => {
  const isOff = index === 1 || index === 5
  $('.main-header').find('.download').toggleClass('hide', isOff)
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
}

const handleJoinBetaForm = () => {
  $('.submit-field').click(() => {
    $('#mc-embedded-subscribe-form').submit()
  })

  $('.download').find('.button').click(() => {
    $.fn.fullpage.moveTo('beta-list');
  })
}

const handleMobileDetection = () => {
  if (SmartPhone.isAny()) {
    // replace videos with images
    const demos = ['search-demo','radio-demo','collections-demo'];
    demos.forEach((demo) => {
      $(`#${demo}`).replaceWith(`<img src='images/${demo}.png' id='${demo}' class='demo-image'/>`)
    })

    $('.demo').click(function() {
      $(this).toggleClass('active')
    })
  }

}

$(document).ready(() => {
  initFullPageJs()
  renderHeroBackground()
  handleJoinBetaForm()
  handleMobileDetection()
});
