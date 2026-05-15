export default {
  site: {
    title: 'Kamod Hooks',
    description: 'Preact hooks — zero runtime npm dependencies (peer: preact only).',
    // Use a subpath when hosting on GitHub Pages (e.g. '/kamod-hooks/'). Root deploys: '/'
    base: '/',
    // Set `url` to a canonical origin (e.g. 'https://example.com') so PreactPress can emit sitemap.xml and robots.txt.
    // url: 'https://example.com'
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
    footer: 'Kamod Hooks — MIT',
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting started', link: '/getting-started' },
      { text: 'All hooks', link: '/hooks/all-hooks' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/' },
          { text: 'Getting started', link: '/getting-started' }
        ]
      },
      {
        text: 'Hooks',
        items: [
          { text: 'All hooks (reference)', link: '/hooks/all-hooks' },
          { text: 'State & logic', link: '/hooks/state' },
          { text: 'DOM & effects', link: '/hooks/dom-effects' },
          { text: 'Async & data', link: '/hooks/async' },
          { text: 'Storage & URL', link: '/hooks/storage-and-url' }
        ]
      }
    ]
  }
}
