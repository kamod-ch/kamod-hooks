import { defineConfig } from '@kamod-ch/preactpress/config'
import { hookSidebar } from '../generated/sidebar'

export default defineConfig({
  theme: './theme/Layout.tsx',
  site: {
    title: 'kamod-hooks',
    description: 'Production-ready hooks for Preact.',
    base: '/kamod-hooks/',
    url: 'https://kamod-ch.github.io/kamod-hooks/'
  },
  markdown: {
    html: false,
    linkify: true,
    typographer: true
  },
  themeConfig: {
    outline: true,
    search: true,
    lastUpdated: true,
    footer: 'kamod-hooks · MIT',
    editLink: {
      text: 'Edit this page',
      pattern: 'https://github.com/kamod-ch/kamod-hooks/edit/main/packages/docs/:path'
    },
    nav: [
      { text: 'Guide', link: '/guide/introduction' },
      { text: 'Hooks', link: '/hooks' },
      { text: 'GitHub', link: 'https://github.com/kamod-ch/kamod-hooks' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/guide/introduction' },
          { text: 'Installation', link: '/guide/installation' },
          { text: 'Getting started', link: '/guide/getting-started' },
          { text: 'Usage', link: '/guide/usage' },
          { text: 'TypeScript', link: '/guide/typescript' },
          { text: 'SSR and browser APIs', link: '/guide/ssr' },
          { text: 'Migration from ahooks', link: '/guide/migration-from-ahooks' }
        ]
      },
      {
        text: 'Hooks',
        items: [
          { text: 'All hooks', link: '/hooks' }
        ]
      },
      ...hookSidebar,
      {
        text: 'Utilities',
        items: [
          { text: 'clearCache', link: '/utilities/clear-cache' },
          { text: 'configResponsive', link: '/utilities/config-responsive' },
          { text: 'createUpdateEffect', link: '/utilities/create-update-effect' }
        ]
      }
    ]
  }
})
