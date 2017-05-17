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
  Windows: "https://github.com/headsetapp/headset-electron/releases/download/v1.5.2-windows/HeadsetSetup.exe",
  Linux: "https://github.com/headsetapp/headset-electron/releases/download/v1.5.3-deb/Headset_1.5.3_amd64.deb"
}

const downloadButtonText = {
  'OS X': 'Mac',
  Windows: 'Windows',
  Linux: 'Ubuntu'
}

const handleDownload = () => {
  console.log(platform.os.family, downloadLinks);
  $('.download').find('.button').attr({
    href: downloadLinks[platform.os.family] || downloadLinks['Linux']
  }).find('.os').text(downloadButtonText[platform.os.family] || downloadButtonText['Linux'])
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
