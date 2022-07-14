import setSideBar from "./setSideBar"


export default {
    base: '/blog/',
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