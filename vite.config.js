import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: [
                'resources/sass/style.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),
        react(),
    ],
    build: {
        rollupOptions: {
            output: {
                entryFileNames: '[name].js', // No hash in JS filenames
                chunkFileNames: '[name].js', // No hash in chunk filenames
                assetFileNames: '[name][extname]', // No hash in CSS or other asset filenames
            },
        },
    },
});
