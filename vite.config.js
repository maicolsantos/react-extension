import react from '@vitejs/plugin-react';
import copy from "rollup-plugin-copy";
import { defineConfig } from 'vite';
import { extensionReloaderBuildStep } from "vite-plugin-extension-reloader";
export default defineConfig({
    plugins: [
        react(),
        extensionReloaderBuildStep("manifest.json"),
        // extensionReloaderWatchExternal("src/**/*"),  // This is optional, but will watch for changes in your manifest
        // extensionReloaderWebSocket(),
        copy({
            targets: [
                // Use glob patterns to match static files to copy
                {
                    src: "src/*",
                    dest: "dist",
                    ignore: ["**/*.js", "**/*.ts", "**/manifest.json"],
                },
            ],
            copyOnce: false,
            flatten: true,
        }),
    ],
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
                name: 'SapoStudioExtension',
            }
        },
        cssCodeSplit: false
    },
    define: {
        global: 'globalThis',
    }
});
function extensionReloaderWatchExternal(arg0) {
    throw new Error('Function not implemented.');
}
