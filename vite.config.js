/* eslint-disable */
import { defineConfig } from "vite"
import react from '@vitejs/plugin-react';
import { glob } from 'glob';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  root: __dirname,
  base: './',
  server: {
    watch: {
      usePolling: true,
    },
  },
  build: {
    outDir: 'dist',
    emptyOutDir: false,
    manifest: true,
    copyPublicDir: false,
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
            file.replace(/\/src\//, '/').replace(/^components\//, 'components/').replace(/\.js$/, ''), // Add prefix to avoid key conflicts
            path.resolve(__dirname, file)
          ])
        ),

        // Component JSX files from src directories
        ...Object.fromEntries(
          glob.sync('components/**/src/*.jsx').map(file => [
            file.replace(/\/src\//, '/').replace(/^components\//, 'components/').replace(/\.jsx$/, ''),
            path.resolve(__dirname, file)
          ])
        ),

        // SDC component SCSS files (compile in place).
        // Prefix keys to avoid conflicts with js files.
        ...Object.fromEntries(
          glob.sync('components/**/*.scss').map(file => [
            'scss-' + file.replace(/\.scss$/, ''), // Add prefix to avoid key conflicts
            path.resolve(__dirname, file)
          ])
        ),
      },
      output: {
        onlyExplicitManualChunks: true,
        entryFileNames: (chunkInfo) => {
          let name = chunkInfo.name;

          if (name.startsWith('components/')) {
            return name + '.js';
          }

          // Handle JS files
          if (name.startsWith('js/')) {
            return path.join('dist', name + '.js');
          }
          if (name.startsWith('peripheral/')) {
            return name.includes('psul-bootstrap') ? 'peripheral/psul-bootstrap.js' : name + '.js';
          }
          return 'dist/assets/' + name + '-[hash].js';
        },
        chunkFileNames: 'dist/assets/[name]-[hash].js',
        assetFileNames: (assetInfo) => {
          let name = assetInfo.name;
          // Strip prefixes added to avoid key conflicts
          if (name.startsWith('scss-')) {
            name = name.replace(/^scss-/, '');
          }

          // Handle CSS files - name already includes the full path from input config
          if (name.endsWith('.css')) {
            if (name.startsWith('components/')) {
              return name
            }
            return path.join('dist', name);
          }

          // Other assets
          return 'dist/assets/' + name.replace(/\.css$/, '') + '-[hash]' + path.extname(name);
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

        const copyToPeripherals = {
          'dist/css/print.css': 'dist/peripheral/print.css',
          'dist/css/peripherals.css': 'dist/peripheral/peripherals.css',
          'dist/css/peripherals-bootstrap3.css': 'dist/peripheral/peripherals-bootstrap3.css',
          'dist/css/ck5style.css': 'dist/peripheral/css/ck5style.css',
          'dist/js/psul-bootstrap.js': 'dist/peripheral/psul-bootstrap.js',
          'logo.png': 'dist/peripheral/logo.png',
          'favicon.ico': 'dist/peripheral/favicon.ico',
        };
        Object.entries(copyToPeripherals).forEach(([sourceRel, destRel]) => {
          // copyToPeripherals.forEach(([sourceRel, destRel]) => {
          const source = path.resolve(__dirname, sourceRel);
          const dest = path.resolve(__dirname, destRel);
          if (fs.existsSync(source)) {
            fs.mkdirSync(path.dirname(dest), { recursive: true });
            fs.copyFileSync(source, dest);
          }
        });

        // Copy component css and js to peripheral
        const componentFiles = glob.sync('dist/components/*/*.+(css|js)', { cwd: __dirname });
        componentFiles.forEach(file => {
          const source = path.resolve(__dirname, file);
          const dest = path.resolve(__dirname, file.replace(/dist\/components\//, 'dist/peripheral/components/'));
          const compdest = path.resolve(__dirname, file.replace(/dist\/components\//, 'components/'));
          fs.mkdirSync(path.dirname(dest), { recursive: true });
          if (fs.existsSync(source)) {
            fs.copyFileSync(source, dest);
            fs.copyFileSync(source, compdest);
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
