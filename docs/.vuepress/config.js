module.exports = {
    title: '学习日记',
    description: '记录学习的每一个知识点',
    head: [
        ['link', { rel: 'shortcut icon', type: "image/x-icon", href: `/favicon.ico` }]
    ],
    themeConfig: {
        editLinks: false,
        docsDir: 'docs',
        nav: [],
        sidebar: [
            {
                title: '函数式编程',
                collapsable: false,
                children: [
                    ['chapter1/', '柯里化'],
                    'chapter1/Partial_Function',
                    'chapter1/Pure_Function'
                ]
            },
            {
                title: 'ES6+',
                collapsable: false,
                children: [
                    'chapter2/async'
                ]
            }
        ]
    }
}
