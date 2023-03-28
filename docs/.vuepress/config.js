module.exports = {
  dest: './',
  title: '个人播客',
  description: 'This is my personal blog',
  theme: 'reco',
  lastUpdated: 'Last Updated', // string | boolean
  smoothScroll: true,
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  plugins: [
    [
      "sakura",
      {
        num: 10, // 默认数量
        show: true, //  是否显示
        zIndex: -1, // 层级
        img: {
          replace: true, // false 默认图 true 换图 需要填写httpUrl地址
          httpUrl: 'https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/flame-g9c125b7fa_1920-removebg-preview.png'
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
    logo: "https://raw.githubusercontent.com/laoWuLog/blogImage/main/img/home.jpg",
    authorAvatar: "https://raw.githubusercontent.com/laoWuLog/blogImage/main/img/home.jpg",
    subSidebar: 'auto',
    type: "blog",
    nav: [
      { text: '首页', link: '/' },
      {
        text: '老吴的博客',
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
        location: 3, // 在导航栏菜单中所占的位置，默认4
        text: "Tag", // 默认文案 “标签”
      },
    },
    sidebar: 'auto'
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