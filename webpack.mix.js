// webpack.mix.js

const mix = require('laravel-mix');
const glob = require('glob');

// Use relative URL so fonts will work.
const defaultSassOptions = {
    processCssUrls: false
};

// Compile global SCSS files.
mix.sass('scss/style.scss', 'dist/css').options(defaultSassOptions);
for (const sourcePath of glob.sync("scss/components/**/*.scss")) {
    mix.sass(sourcePath, 'dist/css').options(defaultSassOptions);;
}

// Compile SDC scss files.
for (const sourcePath of glob.sync("components/**/*.scss")) {
    const destinationPath = sourcePath.replace(/\.scss$/, ".css");
    mix.sass(sourcePath, destinationPath).options(defaultSassOptions);;
}

// Combine custom javascript into the application.js file.
mix.combine('js/base', 'dist/js/application.js');

// Copy bootstrap javascript into dist/js directory.
mix.copyDirectory('node_modules/bootstrap/dist/js/', 'dist/js');
mix.copy('node_modules/@popperjs/core/dist/umd/popper.min.js', 'dist/js');
mix.copy('node_modules/@popperjs/core/dist/umd/popper.min.js.map', 'dist/js');

// Copy bootstrap-icons to assets/bootstrap-icons.web/themes/custom/psulib_base/esm
// @todo we can pull the bootstrap-icons from the node_module.