"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css');
const styles = require('../css/style.scss');
const $ = require('jquery');
const fullpage = require('fullpage.js');
const MobileDetect = require('mobile-detect');

const md = new MobileDetect(window.navigator.userAgent);
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

const initFullPageJs = () => {
  $('#fullpage').fullpage({
    navigation: true,
    scrollBar: true,
    touchSensitivity: 0,
    onLeave(index, nextIndex, direction) {
      swapVideos(index, nextIndex)
    },
    afterRender() {
      document.body.style.opacity = 1
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
    $('.download').removeClass('download').html('<p class="phone-msg">Available for Windows, Mac and Linux.</p>')
    $('.download-github').remove()
    $('.demo').click(function() {
      $(this).toggleClass('active')
    })
  }
}

const handleDownloadLinks = () => {
  const os = window.navigator.userAgent
  const baseUrl = "https://github.com/headsetapp/headset-electron/releases/download/v1.6.0/"
  const downloadsWrapper = $('.download')
  let download;
  let links = '';

  if (os.indexOf('Windows') !== -1) {
    download = {
      name: 'Windows',
      links: [
        { filename: 'HeadsetSetup.exe', label: '.exe (52.2 MB)'}
      ]
    }
  } else if (os.indexOf('Mac') !== -1) {
    download = {
      name: 'macOS',
      links: [
        { filename: 'Headset-1.6.0.dmg', label: '.dmg'},
        { filename: 'Headset.1.6.0_mac.zip', label: '.zip'}
      ]
    }
  } else {
    download = {
      name: 'Linux',
      links: [
        { filename: 'headset_1.6.0_amd64.deb', label: '.deb'},
        { filename: 'headset-1.6.0.x86_64.rpm', label: '.rpm'}
      ]
    }
  }
  $('.os').text(download.name)
  download.links.forEach((link) => {
    links += `<a class="download-button" href="${baseUrl}${link.filename}">${link.label}</a>`
  })
  $('.download-buttons').html(links)
}

$(document).ready(() => {
  handleDownloadLinks()
  initFullPageJs()
  handleMobileDetection()
});
