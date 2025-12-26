// @ts-check
import { defineConfig } from 'astro/config';

import svelte from '@astrojs/svelte';

// https://astro.build/config
export default defineConfig({
  // Leaving it at `false` at the moment for development purposes...
  compressHTML: false,

  server: {
      port: 8080,
      allowedHosts: [
        "dev.edgaralexanderfr.com",
      ],
  },

  integrations: [svelte()],
});