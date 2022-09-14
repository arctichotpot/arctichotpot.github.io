import { defineConfig } from "vitepress"
import setSideBar from "./setSideBar"



export default defineConfig({
    base: '/blog/',
    lang: 'en-US',
    title: 'WIKI🏄‍♂️',
    description: 'my blog',
    lastUpdated: true,

    themeConfig: {

        nav: nav(),

        sidebar: {
            '/articles/': setSideBar('articles'),
            '/wiki/': setSideBar('wiki'),
            '/leetcode/': setSideBar('leetcode'),
        },

        socialLinks: [
            { icon: 'github', link: 'https://github.com/arctichotpot' }
        ],

        footer: {
            message: 'Released under the MIT License.',
            copyright: 'Copyright © 2022-present ArcticHotpot'
        },
    }
})

function nav() {
    return [
        { text: 'Articles📔', link: '/articles/' },
        {
            text: 'Wiki📚',
            items: [
                {
                    text: 'Wiki',
                    link: '/wiki/'
                },
                {
                    text: 'LeetCode',
                    link: '/leetcode/'
                },

            ],
        },
        { text: 'About📃', link: '/about/' },
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
