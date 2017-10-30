

# iSaudavel App

> https://isaudavel.com

#### Install

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```
#### Base Packages
- Vue ^2.2.*
- Vue Router ^2.3.*
- Vuex ^2.2.*

#### Build mobile version

```
# Make shure you have Cordova installed
npm install -g cordova

# Build for production
npm run build

# Add Platforms
cordova platform add ios
cordova platform add android

# Build Cordova
cordova build ios
cordova build android

# Run on Android
cordova run android --device
```
