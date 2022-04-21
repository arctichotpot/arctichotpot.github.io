

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'HOTPOT的网上冲浪指南🌊',
  tagline: '人有权力选择自己的环境,也有能力改变自己的环境!',
  url: 'http://github.com/arctichotpot/',
  baseUrl: '/blog/',
  deploymentBranch: "gh-pages",
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/logo.svg',
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
          blogSidebarCount: 'ALL',
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
      defaultMode: 'dark',
      disableSwitch: false,
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
          src: 'img/logo.svg',
        },
        items: [
          {
            type: "search",
            position: "right",
          },
          { to: '/blog/blog', label: '💻Blog', position: 'left' },
          {
            type: 'doc',
            docId: 'introduction',
            position: 'left',
            label: '📒笔记',
          },
          {
            to: '/blog/blog/about',
            label: '📝About',
            position: 'right',
          },
          {
            href: 'http://github.com/arctichotpot/',
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
