var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://goup-back.test/api"',
    API_ROOT_URL: '"http://goup-back.test/"',
    FACEBOOK_CLIENT_ID: '"171329556786695"',
    GOOGLE_MAPS_KEY: '"AIzaSyDfAjj4h72pB3ppjb2E03dWnb9wIzK-fx8"',
    SECRET_PASSWORD: '"gouprocks"'
})
