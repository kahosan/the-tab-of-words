import { defineConfig } from 'wxt';
import type { WxtViteConfig } from 'wxt';

import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  manifestVersion: 3,
  modules: ['@wxt-dev/module-react'],
  manifest: {
    name: 'Tab of Words',
    description: 'A minimal Chrome / Firefox extension to help you learn Japanese words in each new tab.',
    version: '2.0.0',
    chrome_url_overrides: {
      newtab: 'newtab.html'
    },
    icons: {
      16: 'icons/16.png',
      48: 'icons/48.png',
      128: 'icons/128.png'
    }
  },
  vite: () => ({
    plugins: [tailwindcss()]
  }) as WxtViteConfig
});
