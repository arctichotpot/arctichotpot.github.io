import { defineUserConfig } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'

export default defineUserConfig({
  title: 'WIKI',
  description: 'my internet guide',
  theme: recoTheme({
    primaryColor: '#1abc9c',
    style: '@vuepress-reco/style-default',
    logo: '/logo.png',
    author: 'lin',
    docsRepo: 'https://github.com/arctichotpot',
    docsBranch: 'main',
    docsDir: 'example',
    lastUpdatedText: '',
    autoSetSeries: true,
    autoAddCategoryToNavbar: false,
    autoSetBlogCategories: true,
    // series 为原 sidebar
    navbar: [
      { text: 'Home', link: '/' },
      { text: 'Categories', link: '/categories/JavaScript/1/' },
      {
        text: 'Docs',
        children: [
          { text: '浏览器工作原理与实战 - 李兵', link: '/docs/browser-principle/' },
        ],
      },
    ],

  }),
  // debug: true,
})
