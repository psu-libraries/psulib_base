/* eslint-disable */
import { defineConfig } from "vite"
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: false,
    manifest: true,
    rollupOptions: {
      input: {
        // Main styles
        'css/style': path.resolve(__dirname, 'scss/style.scss'),
        'css/print': path.resolve(__dirname, 'scss/print.scss'),
        'css/ck5style': path.resolve(__dirname, 'scss/ck5style.scss'),

        // Main JS files
        'js/application': path.resolve(__dirname, 'js/base/application.js'),
        'js/psul-bootstrap': path.resolve(__dirname, 'js/psul-bootstrap.js'),

        // Peripheral styles
        'peripheral/peripheral': path.resolve(__dirname, 'scss/peripheral.scss'),
        'peripheral/peripheral-bootstrap3': path.resolve(__dirname, 'scss/peripheral-bootstrap3.scss'),

        // Component SCSS files
        ...Object.fromEntries(
          glob.sync('scss/components/**/*.scss').map(file => [
            file.replace(/^scss\//, 'css/').replace(/\.scss$/, ''),
            path.resolve(__dirname, file)
          ])
        ),

        // SDC component SCSS files (compile in place)
        ...Object.fromEntries(
          glob.sync('components/**/*.scss').map(file => [
            'scss-' + file.replace(/\.scss$/, ''), // Add prefix to avoid key conflicts
            path.resolve(__dirname, file)
          ])
        ),

        // Component JS files from src directories
        ...Object.fromEntries(
          glob.sync('components/**/src/*.js').map(file => [
            'js-' + file.replace(/\/src\//, '/').replace(/^components\//, 'components/').replace(/\.js$/, ''), // Add prefix to avoid key conflicts
            path.resolve(__dirname, file)
          ])
        ),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          let name = chunkInfo.name;

          // Strip prefixes added to avoid key conflicts
          if (name.startsWith('js-')) {
            name = name.replace(/^js-/, '');
          }
          if (name.startsWith('scss-')) {
            name = name.replace(/^scss-/, '');
          }

          // Handle JS files
          if (name.startsWith('js/') || name.startsWith('components/')) {
            return name + '.js';
          }
          if (name.startsWith('peripheral/')) {
            return name.includes('psul-bootstrap') ? 'peripheral/psul-bootstrap.js' : name + '.js';
          }
          return 'assets/' + name + '-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let name = assetInfo.name;
          // Strip prefixes added to avoid key conflicts
          if (name.startsWith('scss-')) {
            name = name.replace(/^scss-/, '');
          }

          // Handle CSS files - name already includes the full path from input config
          if (name.endsWith('.css')) {
            return name;
          }
          // Other assets
          return 'assets/' + name.replace(/\.css$/, '') + '-[hash]' + path.extname(name);
        }
      }
    },

    // Source maps for development
    sourcemap: true,
  },

  css: {
    preprocessorOptions: {
      scss: {
        // Disable URL processing to match laravel-mix behavior
        api: 'modern',
        // Silencing bootstrap deprecation warnings.
        // @see https://github.com/twbs/bootstrap/issues/41915
        // @see https://github.com/twbs/bootstrap/blob/e170268b3c021cdb2eec09df6f4ae6db3664a21a/site/src/content/docs/getting-started/vite.mdx#L95
        silenceDeprecations: [
          'import',
          'color-functions',
          'global-builtin',
          'if-function',
        ],
      }
    },
    devSourcemap: true
  },

  plugins: [
    // Custom plugin to compile component SCSS and JS in place
    {
      name: 'psulib-component-files',
      buildStart: async () => {
        // Clean up existing compiled component CSS and JS files before build
        // to avoid naming conflicts (Vite will add numbers if files exist)
        const existingCompiledFiles = glob.sync('components/**/*.{css,js,js.map}', {
          cwd: __dirname,
          ignore: ['components/**/src/**']
        });
        existingCompiledFiles.forEach(file => {
          const filePath = path.resolve(__dirname, file);
          if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
          }
        });
      },
      closeBundle: async () => {
        // Move component CSS and JS files from dist/components to components (in place)
        const componentFilesInDist = glob.sync('dist/components/**/*.{css,js,js.map}', { cwd: __dirname });
        componentFilesInDist.forEach(file => {
          const source = path.resolve(__dirname, file);
          // Remove number suffixes like alert2.js -> alert.js, alert2.js.map -> alert.js.map
          let dest = file.replace(/^dist\//, '').replace(/(\d+)\.(js(?:\.map)?)$/, '.$2');
          dest = path.resolve(__dirname, dest);

          if (fs.existsSync(source)) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(source, dest);
            // Remove from dist
            fs.unlinkSync(source);
          }
        });

        // Clean up empty dist/components directory
        const distComponentsDir = path.resolve(__dirname, 'dist/components');
        if (fs.existsSync(distComponentsDir)) {
          try {
            fs.rmSync(distComponentsDir, { recursive: true, force: true });
          } catch (e) {
            // Directory might not be empty or not exist
          }
        }
      }
    },
    // Custom plugin to handle additional build tasks
    {
      name: 'psulib-build-tasks',
      closeBundle: async () => {
        // Copy bootstrap-icons
        const iconsSourceDir = path.resolve(__dirname, 'node_modules/bootstrap-icons/font');
        const iconsDestDir = path.resolve(__dirname, 'dist/bootstrap-icons/font');

        if (fs.existsSync(iconsSourceDir)) {
          fs.mkdirSync(iconsDestDir, { recursive: true });
          fs.cpSync(iconsSourceDir, iconsDestDir, { recursive: true });
        }

        // Copy specific bootstrap icon SVGs
        const iconFiles = [
          'camera-video-fill.svg',
          'file-pdf-fill.svg',
          'file-spreadsheet-fill.svg',
          'file-text-fill.svg',
          'file-word-fill.svg',
          'file.svg',
          'filetype-exe.svg',
          'filetype-html.svg',
          'filetype-mp3.svg',
          'image-fill.svg'
        ];

        const svgSourceDir = path.resolve(__dirname, 'node_modules/bootstrap-icons/icons');
        const svgDestDir = path.resolve(__dirname, 'dist/bootstrap-icons/icons');

        fs.mkdirSync(svgDestDir, { recursive: true });
        iconFiles.forEach(file => {
          const source = path.join(svgSourceDir, file);
          const dest = path.join(svgDestDir, file);
          if (fs.existsSync(source)) {
            fs.copyFileSync(source, dest);
          }
        });

        // Copy print.css to peripheral
        const printCssSource = path.resolve(__dirname, 'dist/css/print.css');
        const printCssDest = path.resolve(__dirname, 'dist/peripheral/print.css');
        if (fs.existsSync(printCssSource)) {
          fs.copyFileSync(printCssSource, printCssDest);
        }

        // Copy logo and favicon to peripheral
        const logoSource = path.resolve(__dirname, 'logo.png');
        const logoDest = path.resolve(__dirname, 'dist/peripheral/logo.png');
        if (fs.existsSync(logoSource)) {
          fs.copyFileSync(logoSource, logoDest);
        }

        const faviconSource = path.resolve(__dirname, 'favicon.ico');
        const faviconDest = path.resolve(__dirname, 'dist/peripheral/favicon.ico');
        if (fs.existsSync(faviconSource)) {
          fs.copyFileSync(faviconSource, faviconDest);
        }

        // Copy component css and js to peripheral
        const componentFiles = glob.sync('components/*/*.+(css|js)', { cwd: __dirname });
        componentFiles.forEach(file => {
          const source = path.resolve(__dirname, file);
          const dest = path.resolve(__dirname, file.replace(/components\//, 'dist/peripheral/components/'));
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          if (fs.existsSync(source)) {
            fs.copyFileSync(source, dest);
          }
        });

        // Compile component SCSS to CSS in their directories
        const componentScss = glob.sync('components/**/*.scss', { cwd: __dirname });
        // Note: These will be handled by the build process automatically
        console.log(`✓ Processed ${componentScss.length} component SCSS files`);
      }
    }
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './js'),
      '@scss': path.resolve(__dirname, './scss'),
      '@components': path.resolve(__dirname, './components')
    }
  }
})
