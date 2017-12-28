"use strict"

const styles = require('../css/style.scss');
const $ = require('jquery');
const MobileDetect = require('mobile-detect');
const current_tag = require('./tag.txt')

const md = new MobileDetect(window.navigator.userAgent);

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
        { filename: 'HeadsetSetup.exe', label: 'Headset.exe', tag: current_tag }
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

  $('.os').text(download.name)

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
  handleDownloadLinks();
});
