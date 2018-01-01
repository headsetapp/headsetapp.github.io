"use strict"

const fullpageStyles = require('fullpage.js/dist/jquery.fullpage.min.css');
const styles = require('../css/style.scss');
const $ = require('jquery');
const fullpage = require('fullpage.js');
const MobileDetect = require('mobile-detect');
const CURRENT_TAG = require('../package.json').version

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
  const baseUrl = "https://github.com/headsetapp/headset-electron/releases/download"
  const releaseUrl = `https://github.com/headsetapp/headset-electron/releases/tag/v${CURRENT_TAG}`
  const downloadsWrapper = $('.download')
  let download;
  let links = '';

  if (os.indexOf('Windows') !== -1) {
    download = {
      name: 'Windows 7/8/10',
      links: [
        { filename: 'HeadsetSetup.exe', label: 'Headset.exe', tag: CURRENT_TAG }
      ]
    }
  } else if (os.indexOf('Mac') !== -1) {
    download = {
      name: 'macOS',
      links: [
        { filename: `Headset-${CURRENT_TAG}.dmg`, label: '.dmg', tag: CURRENT_TAG},
        { filename: `Headset-${CURRENT_TAG}.zip`, label: '.zip', tag: CURRENT_TAG}
      ]
    }
  } else {
    download = {
      name: 'Linux',
      links: [
        { filename: `headset_${CURRENT_TAG}_amd64.deb`, label: '.deb', tag: CURRENT_TAG},
        { filename: `headset-${CURRENT_TAG}.x86_64.rpm`, label: '.rpm', tag: CURRENT_TAG}
      ]
    }
  }
  $('.os').text(`${download.name} (v${CURRENT_TAG})` )

  download.links.forEach((link) => {
    links += `<a class="download-button" href="${baseUrl}/v${link.tag}/${link.filename}">${link.label}</a>`
  })

  $('.download-buttons').html(links).find('a').click((c) => {
    ga('send', 'event', 'Download', CURRENT_TAG);
  })

  // e.g https://github.com/headsetapp/headset-electron/releases/tag/v1.2.3
  $('#release-link').attr('href', releaseUrl)
}

$(document).ready(() => {
  handleDownloadLinks()
  initFullPageJs()
  handleMobileDetection()
});
