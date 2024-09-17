import {resolve} from "node:path";
import {defineConfig} from "vite";
import * as glob from 'glob';
import FullReload from 'vite-plugin-full-reload'
import injectHTML from "vite-plugin-html-inject";
import {ViteImageOptimizer} from "vite-plugin-image-optimizer";
import VitePluginSVGSpritemap from '@spiriit/vite-plugin-svg-spritemap'

const DEFAULT_OPTIONS = {
    test:          /\.(jpe?g|png|gif|tiff|webp|avif)$/i,
    exclude:       undefined,
    include:       undefined,
    includePublic: true,
    logStats:      true,
    ansiColors:    true,
    png:           {
        quality: 80,
    },
    jpeg:          {
        quality: 80,
    },
    jpg:           {
        quality: 80,
    },
    tiff:          {
        quality: 80,
    },
    gif:           {},
    webp:          {
        lossless: true,
    },
    avif:          {
        lossless: true,
    },
    cache:         false,
    cacheLocation: undefined,
};

export default defineConfig(({command}) => {
    return {
        define:  {
            [command === 'serve'
             ? 'global'
             : '_global']: {},
        },
        build:   {
            sourcemap:     true,
            rollupOptions: {
                input:  glob.sync('./src/*.html'),
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules')) {
                            return 'vendor';
                        }
                    },
                    entryFileNames: 'commonHelpers.js',
                },
            },
            outDir:        '../dist',
        },
        root:    'src',
        plugins: [
            VitePluginSVGSpritemap('./src/icons/*.svg', {
                prefix:         'icon-',
                output:         {
                    filename: '[name].[hash][extname]',
                    name:     'spritemap.svg',
                    view:     false,
                    use:      true,
                },
                svgo:           {
                    plugins: [
                        {
                            name: 'removeStyleElement',
                        },
                    ],
                },
                injectSVGOnDev: true,
                idefy:          (name, svg) => `icon-${name}-cheese`,
                styles:         {
                    lang:     'scss',
                    filename: 'scss/_spritemap.scss'
                }
            }),
            injectHTML(),
            FullReload(['./src/**/**.html']),
            ViteImageOptimizer(DEFAULT_OPTIONS)
        ],
        resolve: {
            alias: {
                '@': resolve(__dirname, './src'),
            },
        },
    };
});