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
  plugins: [
    [
      "sakura",
      {
        num: 20, // 默认数量
        show: true, //  是否显示
        zIndex: -1, // 层级
        img: {
          replace: false, // false 默认图 true 换图 需要填写httpUrl地址
        },
      },
    ],
    [
      "cursor-effects",
      {
        size: 4, // size of the particle, default: 2
        shape: "star", // ['star' | 'circle'], // shape of the particle, default: 'star'
        zIndex: 999999999, // z-index property of the canvas, default: 999999999
      },
    ]
  ],
  themeConfig: {
    author: "老吴",
    // logo: "./public/home.jpg",
    authorAvatar: "./public/home.jpg",
    subSidebar: 'auto',
    type: "blog",
    nav: [
      { text: '首页', link: '/' },
      {
        text: '老吴的 JavaScript 博客',
        items: [
          { text: 'Github', link: 'https://github.com/laoWuLog/laoWuLog.github.io' }
        ]
      }
    ],
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "博客", // 默认文案 “分类”
      },
      tag: {
        location: 4, // 在导航栏菜单中所占的位置，默认4
        text: "Tag", // 默认文案 “标签”
      },
    },
    // sidebar: [
    //   {
    //     title: '自我介绍',
    //     path: '/',
    //     collapsable: false, // 不折叠
    //     children: [
    //       { title: "学前必读", path: "../handbook/mySelf.md" }
    //     ]
    //   },
    //   {
    //     title: "问题收录",
    //     path: '/',
    //     collapsable: false,
    //     children: [
    //       { title: "条件类型", path: "/docs/handbook/myFIrstBlogPost.md" }
    //     ],
    //   }
    // ]
  }
}