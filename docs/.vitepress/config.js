import { server } from "typescript";

export default {
  // 站点级选项
  title: 'wyj-ui',
  description: 'Just playing around.',

  themeConfig: {
    // 主题级选项
    logo: './logo.png',
    nav:[{ text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' }
        ]
      }],
    sidebar:[
       {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' }
        ]
      }
    ],
    carbonAds: {
      code: 'your-carbon-code',
      placement: 'your-carbon-placement'
    },
    docFooter: {
      prev: 'Pagina prior',
      next: 'Proxima pagina'
    },
     search: {
      provider: 'local'
    },
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present Evan You'
    }
  },
  vite:{
    server:{
      port:3000
    }
  }
}