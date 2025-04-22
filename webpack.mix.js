// webpack.mix.js

const mix = require('laravel-mix');
const glob = require('glob');

// Use relative URL so fonts will work.
const defaultSassOptions = {
    processCssUrls: false
};

// Compile global SCSS files.
mix.sass('scss/style.scss', 'dist/css').options(defaultSassOptions);
mix.sass('scss/print.scss', 'dist/css').options(defaultSassOptions);

for (const sourcePath of glob.sync("scss/components/**/*.scss")) {
  mix.sass(sourcePath, 'dist/css').options(defaultSassOptions);;
}

// Compile styles for ckeditor5.
mix.sass('scss/ck5style.scss', 'dist/css').options(defaultSassOptions);

// Compile SDC scss files.
for (const sourcePath of glob.sync("components/**/*.scss")) {
  const destinationPath = sourcePath.replace(/\.scss$/, ".css");
  mix.sass(sourcePath, destinationPath).options(defaultSassOptions);;
}

// Combine custom javascript into the application.js file.
mix.combine('js/base', 'dist/js/application.js');

// Build submit of bootstrap styles.
mix.js('js/psul-bootstrap.js', 'dist/js/psul-bootstrap.js');

// Add buiding process for component javascript.
for (const sourcePath of glob.sync("components/**/src/*.js")) {
  const destinationPath = sourcePath.replace(/\/src\//, "\/");
  mix.js(sourcePath, destinationPath);
}

// Copy bootstrap-icons to dist directory for use with assets.
mix.copyDirectory('node_modules/bootstrap-icons/font', 'dist/bootstrap-icons/font');
mix.copy([
    'node_modules/bootstrap-icons/icons/camera-video-fill.svg',
    'node_modules/bootstrap-icons/icons/file-pdf-fill.svg',
    'node_modules/bootstrap-icons/icons/file-spreadsheet-fill.svg',
    'node_modules/bootstrap-icons/icons/file-text-fill.svg',
    'node_modules/bootstrap-icons/icons/file-word-fill.svg',
    'node_modules/bootstrap-icons/icons/file.svg',
    'node_modules/bootstrap-icons/icons/filetype-exe.svg',
    'node_modules/bootstrap-icons/icons/filetype-html.svg',
    'node_modules/bootstrap-icons/icons/filetype-mp3.svg',
    'node_modules/bootstrap-icons/icons/image-fill.svg',
  ],
  'dist/bootstrap-icons/icons/'
);

// Run build process for peripheral assets.
mix.sass('scss/peripheral.scss', 'dist/peripheral').options(defaultSassOptions);
mix.sass('scss/peripheral-bootstrap3.scss', 'dist/peripheral').options(defaultSassOptions);
mix.js('js/psul-bootstrap.js', 'dist/peripheral/psul-bootstrap.js');
mix.minify([
  'dist/peripheral/peripheral.css',
  'dist/peripheral/peripheral-bootstrap3.css',
  'dist/peripheral/psul-bootstrap.js'
]);

// Copy component css to peripherals.
for (const sourcePath of glob.sync("components/*/*.+(css|js)")) {
  const destinationPath = sourcePath.replace(/components\//, "dist/peripheral/components/");
  mix.copy(sourcePath, destinationPath);
}
