// webpack.mix.js

let mix = require('laravel-mix');

// Use relative URL so fonts will work.
mix.sass('scss/style.scss', 'dist/css')
    .sass('scss/components/alert.scss', 'dist/css')
    .sass('scss/components/accordion.scss', 'dist/css')
    .sass('scss/components/file.scss', 'dist/css')
    .sass('scss/components/pagination.scss', 'dist/css')
    .sass('scss/components/progress.scss', 'dist/css')
    .sass('scss/components/search-results.scss', 'dist/css')
    .options({
        processCssUrls: false
    });

// Combine custom javascript into the application.js file.
mix.combine('js/base', 'dist/js/application.js');

// Copy bootstrap javascript into dist/js directory.
mix.copyDirectory('node_modules/bootstrap/dist/js/', 'dist/js');

// Copy bootstrap-icons to assets/bootstrap-icons.
// @todo we can pull the bootstrap-icons from the node_module.
