---
title: Taro 开发问题收集 (Taro + NutUI + Vue3)
date: "2023-05-10"
categories:
  - 前端
tags:
  - Taro
---

# Taro 开发

## **1. Error: 插件依赖 "@tarojs/plugin-mini-ci" 加载失败，请检查插件配置**

### 相关平台

微信小程序

**小程序基础库: latest**
**使用框架: Vue 3**

### 复现步骤

E:\lw\advance\myApp
Taro v3.6.6

Taro 即将创建一个新项目!
Need help? Go and open issue: https://tls.jd.com/taro-issue-helper

? 请输入项目介绍
? 请选择框架 Vue3
? 是否需要使用 TypeScript ？ No
? 请选择 CSS 预处理器（Sass/Less/Stylus） Sass
? 请选择编译工具 Webpack5
? 请选择包管理工具 npm
? 请选择模板源 Github（最新）
√ 拉取远程模板仓库成功！
? 请选择模板 vue3-NutUI4（使用 NutUI4.0 的模板）

```javascript
👽 Taro v3.6.6

Error: Cannot find module 'node:path'
Require stack:
- E:\lw\advance\myApp\node_modules\@tarojs\plugin-html\dist\index.js
- E:\lw\advance\myApp\node_modules\@tarojs\plugin-html\index.js
- E:\lw\advance\myApp\node_modules\@tarojs\service\dist\utils\index.js
- E:\lw\advance\myApp\node_modules\@tarojs\service\dist\Kernel.js
- E:\lw\advance\myApp\node_modules\@tarojs\service\dist\index.js
- E:\lw\advance\myApp\node_modules\@tarojs\service\index.js
- E:\lw\advance\myApp\node_modules\@tarojs\cli\dist\cli.js
- E:\lw\advance\myApp\node_modules\@tarojs\cli\bin\taro
    at Function.Module._resolveFilename (internal/modules/cjs/loader.js:880:15)
    at Function.Module._load (internal/modules/cjs/loader.js:725:27)
    at Module.require (internal/modules/cjs/loader.js:952:19)
    at require (internal/modules/cjs/helpers.js:88:18)
    at Object.<anonymous> (E:\lw\advance\myApp\node_modules\@tarojs\plugin-html\dist\index.js:10:12)
    at Module._compile (internal/modules/cjs/loader.js:1063:30)
    at Module._extensions..js (internal/modules/cjs/loader.js:1092:10)
    at Object.newLoader [as .js] (E:\lw\advance\myApp\node_modules\pirates\lib\index.js:141:7)
    at Module.load (internal/modules/cjs/loader.js:928:32)
    at Function.Module._load (internal/modules/cjs/loader.js:769:14) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\plugin-html\\dist\\index.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\plugin-html\\index.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\service\\dist\\utils\\index.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\service\\dist\\Kernel.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\service\\dist\\index.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\service\\index.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\cli\\dist\\cli.js',
    'E:\\lw\\advance\\myApp\\node_modules\\@tarojs\\cli\\bin\\taro'
  ]
}
(node:17024) UnhandledPromiseRejectionWarning: Error: 插件依赖 "@tarojs/plugin-html" 加载失败，请检查插件配置
    at apply (E:\lw\advance\myApp\node_modules\@tarojs\service\src\utils\index.ts:84:19)
    at Kernel.initPlugin (E:\lw\advance\myApp\node_modules\@tarojs\service\src\Kernel.ts:187:5)
    at Kernel.resolvePlugins (E:\lw\advance\myApp\node_modules\@tarojs\service\src\Kernel.ts:156:12)
    at Kernel.initPresetsAndPlugins (E:\lw\advance\myApp\node_modules\@tarojs\service\src\Kernel.ts:129:10)
    at Kernel.<anonymous> (E:\lw\advance\myApp\node_modules\@tarojs\service\src\Kernel.ts:360:10)
    at Generator.next (<anonymous>)
    at E:\lw\advance\myApp\node_modules\@tarojs\service\dist\Kernel.js:8:71
    at new Promise (<anonymous>)
    at __awaiter (E:\lw\advance\myApp\node_modules\@tarojs\service\dist\Kernel.js:4:12)
    at Kernel.run (E:\lw\advance\myApp\node_modules\@tarojs\service\dist\Kernel.js:290:16)
(Use `node --trace-warnings ...` to show where the warning was created)
(node:17024) UnhandledPromiseRejectionWarning: Unhandled promise rejection. This error originated either by throwing inside of an async function without a catch block, or by rejecting a promise which was not handled with .catch(). To terminate the node process on unhandled promise rejection, use the CLI flag `--unhandled-rejections=strict` (see https://nodejs.org/api/cli.html#cli_unhandled_rejections_mode). (rejection id: 1)
(node:17024) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
```

### 解决方案

使用 nvm 安装/切换 node 版本,这里使用的是 node v 16.0.0, 切换版本后,重新安装下依赖,运行正常,没有报错,接下来就可以运行到相应平台了

```javascript
PS E:\lw\advance\myApp> nvm ls

    18.16.0
  * 16.0.0 (Currently using 64-bit executable)
    14.17.0
    14.15.2
```

```javascript
PS E:\lw\advance\myApp> npm i

added 37 packages in 41s
PS E:\lw\advance\myApp> npm run dev:weapp
```

## 2. dev:weapp 时,微信开发工具预览出现警告,有 taro ui 有部分组件无法渲染

### 报错信息:

```javascript
VM946:22 WXMLRT_$gwx:./base.wxml:template:477:16: Template `tmpl_0_31` not found.
[WXML Runtime warning] ./base.wxml
 Template `tmpl_0_31` not found.
  475 |
  476 | <template name="tmpl_6_container">
> 477 |   <template is="{{xs.a(6, i.nn, l)}}" data="{{i:i,cid:6,l:xs.f(l,i.nn)}}" />
      |                ^
  478 | </template>
  479 |
  480 | <template name="tmpl_7_0">
```

### 解决方案

找到 taro 的配置文件 config,找到 index.js,添加属性

```javascript
 compiler: {
    type: "webpack5",
    prebundle: {
      enable: false,
      force: true,
    },
  }
// compiler.type 指定了使用的编译器类型，这里是 Webpack 5。Webpack 是 Taro 应用的主要编译器，版本号为 5。
// prebundle.enable 指定是否启用打包预编译功能。打包预编译可以提高应用启动速度，但也会增加打包时间，所以可以根据实际情况来开启或关闭。
// prebundle.force 强制打包预编译功能，即使环境不支持也会进行尝试。一般来说不需要开启，除非有需要。
```
