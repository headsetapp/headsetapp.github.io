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
        { filename: `headset-${version}-setup.exe`, label: 'Download for Windows', version }
      ]
    }
  } else if (os.indexOf('Mac') !== -1) {
    download = {
      name: 'macOS',
      links: [
        { filename: `Headset-${version}.dmg`, label: 'Download for macOS (.dmg)', version },
        { filename: `Headset-${version}.zip`, label: 'Download for macOS (.zip)', version }
      ]
    }
  } else {
    download = {
      name: 'Linux',
      links: [
        { filename: `headset_${version}_amd64.deb`, label: 'Download for Linux (.deb)', version },
        { filename: `headset-${version}.x86_64.rpm`, label: 'Download for Linux (.rpm)', version }
      ]
    }
  }

  download.links.forEach((link) => {
    links += `<a class="" href="${baseUrl}/v${link.version}/${link.filename}">${link.label}</a>`
  })

  links += `<a class="" href="${releaseUrl}">Other Environments</a>`

  const downloadSelector = document.createElement('div')
  downloadSelector.innerHTML = links
  downloadSelector.id = 'dl-selector'
  downloadSelector.style = { display: 'none' }
  document.body.appendChild(downloadSelector)

  tippy('.download-button', {
    html: '#dl-selector',
    placement: 'bottom',
    interactive: true,
    arrow: true,
    theme: 'honeybee',
    animation: 'shift-toward',
    trigger: 'click'
  })
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
