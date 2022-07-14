import setSideBar from "./setSideBar"


export default {
    lang: 'en-US',
    title: '个人网上冲浪指南🏄‍♂️',
    description: 'my blog',
    lastUpdated: true,
    themeConfig: {

        nav: nav(),

        sidebar: {
            '/articles/': setSideBar('articles'),
            '/guide/': setSideBar('guide')
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/arctichotpot' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present ArcticHotpot'
        },
        // algolia: {
        //     appId: '8J64VVRP8K',
        //     apiKey: 'a18e2f4cc5665f6602c5631fd868adfd',
        //     indexName: 'vitepress'
        // },
    }
}

function nav() {
    return [
        { text: 'Articles', link: '/articles/' },
        { text: 'About', link: '/guide/' },
        {
            text: 'Link',
            items: [
                {
                    text: 'Also',
                    link: 'https://github.com/arctichotpot/also'
                },
            ],
        },
    ]
}