module.exports = {
  dest: '../',
  title: '个人播客',
  description: 'This is my personal blog',
  theme: 'reco',
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  themeConfig: {
    subSidebar: 'auto',
    nav: [
      { text: '首页', link: '/' },
      {
        text: '老吴的 JavaScript 博客',
        items: [
          { text: 'Github', link: 'https://github.com/laoWuLog/laoWuLog.github.io' }
        ]
      }
    ],
    sidebar: [
      {
        title: '自我介绍',
        path: '/',
        collapsable: false, // 不折叠
        children: [
          { title: "学前必读", path: "../post/mySelf.md" }
        ]
      },
      {
        title: "问题收录",
        path: '/',
        collapsable: false, // 不折叠
        children: [
          { title: "条件类型", path: "../post/myFIrstBlogPost.md" },
          { title: "泛型", path: "../post/myFIrstBlogPost.md" }
        ],
      }
    ]
  }
}