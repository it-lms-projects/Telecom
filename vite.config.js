import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

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
});