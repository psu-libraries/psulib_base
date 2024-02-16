// webpack.mix.js

let mix = require('laravel-mix');

mix.sass('scss/style.scss', 'css');

mix.combine('js/base', 'js/application.js');

