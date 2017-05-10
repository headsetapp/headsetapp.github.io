"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css')
const styles = require('../css/style.scss')
const $ = require('jquery')
const fullpage = require('fullpage.js')
const SmartPhone = require('detect-mobile-browser')(false);
const platform = require('platform')

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

const renderHeroBackground = () => {
  const url = '../images/bg1.jpg'
  const img = new Image();
  img.onload = function(){
   $('.overlay').css({'background-image': 'url('+url+')', 'opacity': 1});
  }
  img.src = url;
}

const downloadLinks = {
  'OS X': "https://github.com/headsetapp/headset-electron/releases/download/v1.5.2/Headset-1.5.2.dmg",
  windows: "https://github.com/headsetapp/headset-electron/releases/download/v1.5.2-windows/HeadsetSetup.exe",
  linux: "https://github.com/headsetapp/headset-electron/releases/download/v1.5.2-linux/Headset_1.5.2_amd64.deb"
}

const handleDownload = () => {
  console.log(platform.os.family);
  $('.download').find('.button').attr({
    href: platform.os.family
  }).find('.os').text(' Mac')
}

const initFullPageJs = () => {
  $('#fullpage').fullpage({
    navigation: true,
    onLeave(index, nextIndex, direction) {
      swapVideos(index, nextIndex)
    }
  });

  $('.scroll-arrow').click(() => {
    $.fn.fullpage.moveSectionDown();
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
  handleMobileDetection()
  handleDownload()
});
