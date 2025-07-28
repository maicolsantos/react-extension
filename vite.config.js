import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
export default defineConfig({
    plugins: [react()],
    base: './',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        rollupOptions: {
            input: 'src/content-script.tsx',
            output: {
                entryFileNames: 'assets/index.js',
                assetFileNames: 'assets/index.[ext]',
                format: 'iife',
                name: 'ReactSidebar'
            }
        },
        cssCodeSplit: false
    },
    define: {
        global: 'globalThis',
    }
});
