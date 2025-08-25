import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import { dirname, resolve } from 'path';

const __dirname = dirname(__filename);

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/index.jsx'],
            refresh: true,
            // Additional directories to watch
            watch: {
                include: [
                    "resources/views/**/*",
                    "resources/css/**/*",
                    "resources/js/**/*",
                ],
            },
        }),
        react(),
    ],
    resolve: {
        alias: {
            '@'          : resolve(__dirname, 'resources/js'),                      // Assuming your 'resources/js' is the root for '@'
            '@components': resolve(__dirname, 'resources/js/components'),           // Explicit alias for '@components'
            '@ui'        : resolve(__dirname, 'resources/js/components/ui'),        // Explicit alias for '@ui'
            '@layouts'   : resolve(__dirname, 'resources/js/components/layouts'),   // Explicit alias for '@layouts'
            '@assets'    : resolve(__dirname, 'resources/assets'),                  // Explicit alias for '@assets'
            '@hooks'     : resolve(__dirname, 'resources/js/components/hooks'),     // Explicit alias for '@hooks'
            '@helpers'   : resolve(__dirname, 'resources/js/helpers'),              // Explicit alias for '@utils'
            '@router'    : resolve(__dirname, 'resources/js/router'),               // Explicit alias for '@router'
        },
    },
});