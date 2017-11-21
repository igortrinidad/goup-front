var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://goup-back.dev/api"',
    API_ROOT_URL: '"http://goup-back.dev/"',
    FACEBOOK_CLIENT_ID: '"171329556786695"',
    GOOGLE_MAPS_KEY: '"AIzaSyAc7FRXAfTUbAG_lUOjKzzFa41JbRCCbbM"'
})
