import compress from 'astro-compress';
import { defineConfig } from 'astro/config';

import solid from '@astrojs/solid-js';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
    site: 'https://gh.roryclaasen.dev',
    base: '/word-search-generator',
    output: 'static',
    integrations: [compress(), solid(), tailwind()],
    trailingSlash: 'ignore'
});
