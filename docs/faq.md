---
title: FAQ
---
# Headset - FAQ

### Q: What is Headset?
Headset is a music player for desktop that is able to connect to YouTube. Users can search through YouTube's massive collection of music, play what they find and save tracks/playlists. Headset can also read popular music [subreddits](https://www.youtube.com/watch?v=EvEcBq5yWGw) and play the tracks in sequence.

### Q: What are the minimum system requirements to run Headset?

- Windows 7 and later
- macOS 10.9
- Ubuntu 14.04 and later
- Fedora 21
- Debian 8

### Q: How can I run Headset?

To run Headset, you can download the file from the website and follow the installation instructions. Alternatively, you can follow the instructions [here](https://github.com/headsetapp/headset-electron#build-from-source) if you prefer to build it from source.

### Q: Why are there two windows?
Headset is using an embedded youtube player which can't be hidden or tampered with. The separation of the two windows keeps the user interface simple and music-player-like. Please read the [docs](https://headsetapp.co/docs/player-window) to learn more about the player window

### Q: Is there a mobile (Android/iOS) app for Headset?

Unfortunately, not at the moment. There is no way currently to play YouTube videos while the phone screen is off, nor it's possible to extract the audio and play it via the phone's media player. Those restrictions alone discourage the team from building a mobile version.

### Q: Is Headset open source?

Yes and no. There are two main codebases - the core web-application and the client app. The client app is based on [Electron.js](https://electronjs.org/) and can be found [here](https://github.com/headsetapp/headset-electron). The web application is currently closed source.

### Q: Does Headset support other music sources like Soundcloud?

Not at the moment but there are plans to integrate SoundCloud in the future.

### Q: Is there a web version of Headset?

Not at the moment but there are plans to create a web version in the future.

### Q: Who created Headset?
Headset is created by [Daniel Ravina](https://twitter.com/danielravina) with the help of amazing [open source contributers](https://github.com/headsetapp/headset-electron/graphs/contributors)

### Q: I found a bug. Who should I contact?

Please send us an email to [hello@headsetapp.co](mailto:hello@headsetapp.co) or [submit an issue](https://github.com/headsetapp/headset-electron/issues/new) if you have a github account.

### Q: I have a feature idea. Who should I contact?

Please send us an email to [hello@headsetapp.co](mailto:hello@headsetapp.co) or [submit an issue](https://github.com/headsetapp/headset-electron/issues/new) if you have a github account.

### Q: I use an operating system that is not Windows/Mac/Debian/RHL. Can I still use Headset?

It is possible, as long as your OS can run [Node js](https://nodejs.org). follow the instructions on [how to build from source](https://github.com/headsetapp/headset-electron#build-from-source)

### Q: Is my private data being exposed/sold to 3rd party services?

Absolutely not. Your data is not shared nor exposed to anything but your desktop client. Your data is kept safe and backed-up regularly on AWS. Passwords are hashed using SHA256 algorithm with 10 bcrypt rounds. Please read our [Privacy Policy](https://headsetapp.co/legal/privacy/) to learn more.

### Q: Can I connect to my YouTube saved playlists?

Not at the moment but there are plans to implement a Google single sign-on and sync your YouTube playlists.

### Q: Can I use the media keys?
Yes! Headset support media keys on Window, Linux (With MPRIS) and macOS!
