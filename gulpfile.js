var elixir = require('laravel-elixir');


/*
 |--------------------------------------------------------------------------
 | Elixir Asset Management
 |--------------------------------------------------------------------------
 |
 | Elixir provides a clean, fluent API for defining some basic Gulp tasks
 | for your Laravel application. By default, we are compiling the Sass
 | file for our application, as well as publishing vendor resources.
 |
 */

elixir(function(mix) {


	mix.styles([
        '../../../node_modules/ionicons/css/ionicons.css',
        './assets/flatly/css/bootstrap.css',
        './assets/css/fonts.css',
        './node_modules/vue-form-wizard/dist/vue-form-wizard.min.css',
        './assets/bootstrap-checkbox/bootstrap-checkbox.css',
        './node_modules/izitoast/dist/css/iziToast.css',
        './node_modules/vue-multiselect/dist/vue-multiselect.min.css',

	], './static/build/css/vendor.css');

	mix.scripts([
		'./node_modules/jquery/dist/jquery.js',
		'./assets/flatly/js/bootstrap.js',
        './node_modules/izitoast/dist/js/iziToast.js',
        './node_modules/jquery.easing/jquery.easing.js',
        './node_modules/jquery-mask-plugin/dist/jquery.mask.js',
		'./src/utils/notifications.js',
        './assets/js/hammer-time.js',

	], './static/build/js/vendor.js');

    mix.copy([
        '/node_modules/ionicons/fonts',
        '/node_modules/lightgallery/dist/fonts',
        '/assets/fonts'
    ], './static/build/fonts');

});
