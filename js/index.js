"use strict"

const styles = require('../css/style.scss');
const $ = require('jquery');
const MobileDetect = require('mobile-detect');

const md = new MobileDetect(window.navigator.userAgent);
const axios = require('axios')
const LATEST_RELEASE = 'https://api.github.com/repos/headsetapp/headset-electron/releases/latest'

const handleDownloadLinks = (version) => {
  const os = window.navigator.userAgent
  const baseUrl = "https://github.com/headsetapp/headset-electron/releases/download"
  const releaseUrl = `https://github.com/headsetapp/headset-electron/releases/tag/v${version}`
  const downloadsWrapper = $('.download')
  let download;
  let links = '';

  if (os.indexOf('Windows') !== -1) {
    download = {
      name: 'Windows 7/8/10',
      links: [
        { filename: 'HeadsetSetup.exe', label: 'Headset.exe', version  }
      ]
    }
  } else if (os.indexOf('Mac') !== -1) {
    download = {
      name: 'macOS',
      links: [
        { filename: `Headset-${version}.dmg`, label: '.dmg', version },
        { filename: `Headset-${version}.zip`, label: '.zip', version }
      ]
    }
  } else {
    download = {
      name: 'Linux',
      links: [
        { filename: `headset_${version}_amd64.deb`, label: '.deb', version },
        { filename: `headset-${version}.x86_64.rpm`, label: '.rpm', version }
      ]
    }
  }

  $('.os').text(download.name)

  download.links.forEach((link) => {
    links += `<a class="primary-button" href="${baseUrl}/v${link.version}/${link.filename}">${link.label}</a>`
  })

  $('.download-buttons').html(links).find('a').click((c) => {
    ga('send', 'event', 'Download', version);
  })

  // e.g https://github.com/headsetapp/headset-electron/releases/tag/v1.2.3
  $('#release-link').attr('href', releaseUrl)
}

const getLatestTag = () => {
  return axios.get(LATEST_RELEASE).then((response) => {
    return response.data.tag_name;
  })
}

$(document).ready(() => {
  getLatestTag().then((tag) => {
    handleDownloadLinks(tag.replace('v', ''));
  })
});
