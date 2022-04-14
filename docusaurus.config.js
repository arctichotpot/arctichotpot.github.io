

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HOTPOT的网上冲浪指南',
  tagline: 'I feel better when I surf the web',
  url: 'http://github.com/arctichotpot/',
  baseUrl: '/blog/',
  deploymentBranch: "gh-pages",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.png',
  organizationName: 'facebook', // Usually your GitHub org/user name.
  projectName: 'blog', // Usually your repo name.


  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          path: 'notes',
          sidebarPath: require.resolve('./sidebars.js'),
        },
        blog: {
          // blog作为主页
          // routeBasePath: "/",
          // path: "./blog",
          showReadingTime: true,
          blogSidebarCount: 5,
          blogSidebarTitle: "Recent posts",
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      hideableSidebar: false,
      metadata: [
        {
          name: "keywords",
          content:
            "frontend, react, javascript, css, react, vue, typescript, docusaurus, blog, personal blog, personal website",
        },
      ],
      navbar: {
        hideOnScroll: true,

        title: 'HOTPOT的网上冲浪指南',
        logo: {
          // alt: 'HOTPOT的网上冲浪指南',
          src: 'img/logo.png',
        },
        items: [
          {
            type: "search",
            position: "right",
          },
          { to: '/blog/blog', label: '💻Blog', position: 'right' },
          {
            type: 'doc',
            docId: 'introduction',
            position: 'right',
            label: '📒笔记',
          },
          {
            href: 'https://github.com/facebook/docusaurus',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
        defaultLanguage: 'javascript',
      },
    }),
};

module.exports = config;
