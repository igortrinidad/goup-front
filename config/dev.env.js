var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
    NODE_ENV: '"development"',
    API_URL: '"http://isaudavel-api.dev/api"',
    API_ROOT_URL: '"http://isaudavel-api.dev/"',
    FACEBOOK_CLIENT_ID: '"1854829291449231"',
    GOOGLE_MAPS_KEY: '"AIzaSyAc7FRXAfTUbAG_lUOjKzzFa41JbRCCbbM"'
})
