import { mdPlugin } from "./config/plugins";

export default {
  // 站点级选项
  title: 'wyj-ui',
  description: 'Just playing around.',

  themeConfig: {
    // 主题级选项
    logo: './logo.png',
    nav:[
      { text: '指南', link: '/guide' },
      { text: '组件', link: '/components' }
    ],
    sidebar:{
      '/guide/':[
        {
          text: '指南',
          items: [
            { text: 'Introduction', link: '/guide/' },
            { text: 'Getting Started', link: '/guide/quickStart'}
          ]
        }
      ],

      '/components/':[
        {
          text: '组件',
          items: [
            { 
              text: 'Basic基础组件', 
              items:[
                {
                  text: 'Icon组件',
                  link: '/components/Icon'
                },
                {
                  text: 'Button组件',
                  link: '/components/WButton/Button'
                },
                {
                  text: 'Tree组件',
                  link: '/components/Tree'
                },
                {
                  text:'Checkbox组件',
                  link:'/components/Checkbox'
                }
              ]
            }
          ]
        }
      ]
    },
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
      copyright: 'Copyright © 2019-2025 Evan You'
    }
  },
  vite:{
    server:{
      port:3000
    }
  },
  // 配置markdown格式
  markdown:{
    config: (md)=>mdPlugin(md)
  }
}