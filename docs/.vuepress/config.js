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
    ],
    [
      "dynamic-title", // 趣味标题插件
      {
        showIcon: "/favicon.ico",
        showText: "(/≧▽≦/)咦！又好了！",
        hideIcon: "/failure.ico",
        hideText: "(●—●)喔哟，崩溃啦！",
        recoverTime: 2000
      }
    ],
    [
      'ribbon', // 添加美丽的丝带！
      {
        size: 70, // width of the ribbon, default: 90
        opacity: 0.1, // opacity of the ribbon, default: 0.3
        zIndex: -1, // z-index property of the background, default: -1
      },
    ],
    [
      'medium-zoom', // 图片放大
      {
        margin: 16
      },
    ],
    ['vuepress-plugin-code-copy'] //支持将代码块复制到剪贴板
  ],
  themeConfig: {
    author: "老吴",
    logo: "https://raw.githubusercontent.com/laoWuLog/blogImage/main/img/home.jpg",
    authorAvatar: "https://raw.githubusercontent.com/laoWuLog/blogImage/main/img/home.jpg",
    subSidebar: 'auto',
    type: "blog",
    lastUpdated: '上次更新', // string | boolean
    // 密钥
    keyPage: {
      keys: ['202cb962ac59075b964b07152d234b70'], // 1.3.0 版本后需要设置为密文
      color: '#42b983', // 登录页动画球的颜色
      lineColor: '#42b983' // 登录页动画线的颜色
    },
    huawei: true,
    // 添加友链
    friendLink: [
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        logo: "https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png",
        link: 'https://vuepress-theme-reco.recoluan.com'
      }
    ],
    nav: [
      { text: '首页', link: '/' },
      { text: '时间轴', link: '/timeline/', icon: 'reco-date' },
      {
        text: '老吴的博客',
        items: [
          { text: 'Github', link: 'https://github.com/laoWuLog/laoWuLog.github.io' }
        ]
      },
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