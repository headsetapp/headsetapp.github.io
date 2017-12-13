"use strict"

const styles = require('../css/style.scss');
const $ = require('jquery');
const MobileDetect = require('mobile-detect');
const current_tag = require('./tag.txt')

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

const handleMobileDetection = () => {
  if (md.mobile()) {
    // replace videos with images
    const demos = ['search-demo', 'collections-demo','radio-demo'];
    demos.forEach((demo) => {
      $(`#${demo}`).replaceWith(`<img src='images/${demo}.png' id='${demo}' class='demo-image'/>`)
    })
    $('.download').removeClass('download').html('<p class="phone-msg">Available for Windows, Mac and Linux.</p>')
    $('.download-github').remove()
  } else {
    Object.keys(demos).forEach((i) => {
      demos[i].play()
    })
  }
}

const handleDownloadLinks = () => {
  const os = window.navigator.userAgent
  const baseUrl = "https://github.com/headsetapp/headset-electron/releases/download"
  const releaseUrl = `https://github.com/headsetapp/headset-electron/releases/tag/v${current_tag}`
  const downloadsWrapper = $('.download')
  let download;
  let links = '';

  if (os.indexOf('Windows') !== -1) {
    download = {
      name: 'Windows 7/8/10',
      links: [
        { filename: 'HeadsetSetup.exe', label: 'Headset.exe (52.2 MB)', tag: current_tag }
      ]
    }
  } else if (os.indexOf('Mac') !== -1) {
    download = {
      name: 'macOS',
      links: [
        { filename: `Headset-${current_tag}.dmg`, label: '.dmg', tag: current_tag},
        { filename: `Headset.${current_tag}_mac.zip`, label: '.zip', tag: current_tag}
      ]
    }
  } else {
    download = {
      name: 'Linux',
      links: [
        { filename: `headset_${current_tag}_amd64.deb`, label: '.deb', tag: current_tag},
        { filename: `headset-${current_tag}.x86_64.rpm`, label: '.rpm', tag: current_tag}
      ]
    }
  }
  $('.os').text(`${download.name} (v${current_tag})` )

  download.links.forEach((link) => {
    links += `<a class="download-button" href="${baseUrl}/v${link.tag}/${link.filename}">${link.label}</a>`
  })

  $('.download-buttons').html(links).find('a').click((c) => {
    ga('send', 'event', 'Download', current_tag);
  })

  // e.g https://github.com/headsetapp/headset-electron/releases/tag/v1.2.3
  $('#release-link').attr('href', releaseUrl)
}

$(document).ready(() => {
  handleDownloadLinks()
  handleMobileDetection()

  const scrollTop = () => {
    return (window.pageYOffset || document.documentElement.scrollTop)
  }

  const header = $('.main-header')[0]

  document.addEventListener('scroll', (e) => {
    const scrollPosition = scrollTop()
    header.style.opacity = 0.3;

    setTimeout(() => {
      const newScrollPosition = scrollTop()

      if(scrollPosition === newScrollPosition) {
        header.style.opacity = 1;
        console.log('paw!');
      }
    }, 350)
  })
});
