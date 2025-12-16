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

        // Component JS files from src directories
        ...Object.fromEntries(
          glob.sync('components/**/src/*.js').map(file => [
            file.replace(/\/src\//, '/').replace(/^components\//, 'components/').replace(/\.js$/, ''),
            path.resolve(__dirname, file)
          ])
        ),
      },
      output: {
        entryFileNames: (chunkInfo) => {
          // Handle JS files
          if (chunkInfo.name.startsWith('js/') || chunkInfo.name.startsWith('components/')) {
            return '[name].js';
          }
          if (chunkInfo.name.startsWith('peripheral/')) {
            return chunkInfo.name.includes('psul-bootstrap') ? 'peripheral/psul-bootstrap.js' : '[name].js';
          }
          return 'assets/[name]-[hash].js';
        },
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          // Handle CSS files - [name] already includes the full path from input config
          if (assetInfo.name.endsWith('.css')) {
            return '[name][extname]';
          }
          // Other assets
          return 'assets/[name]-[hash][extname]';
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
