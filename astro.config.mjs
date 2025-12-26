// @ts-check
import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    compressHTML: false, // Leaving it at `true` at the moment for development purposes...
    server: {
        port: 8080,
    },
});
