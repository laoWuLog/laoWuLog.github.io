---
title: 错误收集
date: '2023-03-24'
categories:
  - 前端
tags:
  - person
---

# 										问题总结

**前端开发流程**

**1.**     **创建自己的分支，进行开发**

**2.**     **开发完成，提交到test分支**

**3.**     **测试有问题，返工，无问题，合并到预发布环境master分支**

**4.**     **预发布环境无问题就合并到release分支。正式环境以release进行部署**



## **Jenkins 前端自动化构建**

（**需要先确定部署服务器是否有pm2 npm等前端部署环境**）

步骤

**1.**     **新建item**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429164451711.png" alt="image-20220429164451711" style="zoom:25%;" />

**2.**     **填写名称，点击创建**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172518102.png" alt="image-20220429172518102" style="zoom:25%;" />

**3.**     **选择“git****”，填写git****项目地址以及git****访问权限的账号**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172532829.png" alt="image-20220429172532829" style="zoom:25%;" />

**4.**     **选择拉取分支**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172543047.png" alt="image-20220429172543047" style="zoom:25%;" />

**5.**     **“构建环境”配置部署的服务**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172555970.png" alt="image-20220429172555970" style="zoom:25%;" />

**6.**     **“**Source files**”源文件直接填写“\* \******”，表示所有文件**

  *** \****  

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172608168.png" alt="image-20220429172608168" style="zoom:25%;" />

**7.**     **配置部署的路径，注意目录需要提前创建好**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172620104.png" alt="image-20220429172620104" style="zoom:25%;" />

**8.**     **配置部署脚本**（xshell的指令部署）

  **#!/bin/bash**  **source   /etc/profile**  

**cd /home/opacWeb/tcc-opac-mobile**     

**pm2 stop** **项目名**  **pm2 delete** **项目名**    

 **npm install**  **npm run build**     

**pm2 start npm --name** **项目名 -- run serve:prod**        

 

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172634907.png" alt="image-20220429172634907" style="zoom:25%;" />

 

**9.**     **点击保存**

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220429172645986.png" alt="image-20220429172645986" style="zoom:25%;" />

**10.**   **构建项目**（构建成功会自动部署）

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220420172837800.png" alt="image-20220420172837800" style="zoom:25%;" />







## xhell6 

**（功能强大且安全的终端模拟器，支持[SSH](https://so.csdn.net/so/search?q=SSH&spm=1001.2101.3001.7020)、SFTP、TELNET、RLOGIN和SERIAL）**

 [Xshell.6.0.0117 (1).7z](C:\Users\acer\Documents\Tencent Files\2529533212\FileRecv\Xshell.6.0.0117 (1).7z) 

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220420173744717.png" alt="image-20220420173744717" style="zoom: 50%;" />

直接连上去，填写账号密码



## 问题1 ：test测试环境下，页面出现宽度的样式问题

### 问题描述

​		拉去test分支上代码到本地运行，页面显示正常。xshell再npm run build 构建的时候报错

报错如下!
![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20220420174556832.png)

使用npm安装：`npm install postcss-px-to-viewport --save-dev`可以解决报错，但无法解决页面显示的问题。

### 解决办法

重新删除xshell上的文件，可以解决  

 rm -rf /home/opacWeb/tcc-opac-web/

### 相关资源

Gitlab地址：PC端：https://gitlab.tcsoft.info:8988/qiu/opac-new-edition

前端项目部署test环境：http://10.10.6.99:8080/tc_tuchuang

1. 问题页面

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220418170211710.png" alt="image-20220418170211710" style="zoom:25%;" />





2. test分支拉去下来的页面显示

<img src="C:\Users\acer\AppData\Roaming\Typora\typora-user-images\image-20220418170241119.png" alt="image-20220418170241119" style="zoom:25%;" />

## 问题2：IP地址可以访问，域名不行（正式环境  页面提示： lnvalid Host header）

### 出现该问的原因

因为新版的 webpack-dev-server 出于安全考虑，默认检查 hostname，如果hostname不是配置内的就不能访问。

### 解决办法

设置跳过host检查

打开你的项目全局搜索 devServer ，在 devServer 里面添加 "disableHostCheck": true



## 问题3：使用v-html后内容未能解析成html

### 问题描述

vue中如果想将HTML的内容绑定到元素里面，可以使用 v-html的属性来进行设置。设置好以后发现页面上还是显示的是HTML源代码，未能解析成HTML显示

### 解决办法

导致问题的原因是接口返回的数据中未对html的内容做转义，导致页面输出了HTML的代码。

| 1    | <view class="detail-content" v-html="content"></view>        |
| ---- | ------------------------------------------------------------ |
|      | content = content.replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&').replace(/&quot;/g, '"').replace(/&apos;/g, "'"); |



## 问题4：git提交中E325: ATTENTION或E325

### 问题描述

使用 git commit --amend 后出现的问题 （可以修改commit的信息通过vim编辑器）

首先看下图，在git提交、编辑、合并等过程中，如果没有将指令进行完就将git窗口关闭有时会出现这样的界面。

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20220427150131021.png)

### 原因分析

git在指令意外中断时，一般会有一个缓存的机制，它会记住上次中断的问题。在下次进入vim指令时，如果很重要的中断一般会提示你前面有某个操作不当或者没有结束，就出现了上面的窗口。如果不解决就会一直缠着你，以至于出现该窗口后再输入git指令的话一般就不显示在界面上了。看着像不能输入指令的样子

### 解决办法

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20220427150322954.png)

这个文件就是罪魁，只要将它删除即可解决。
或者直接运行git指令

```
rm .git/.COMMIT_EDITMSG.swp
```





## 问题5：使用原生input让输入框聚焦

### 问题描述

Autofocus [processing](https://so.csdn.net/so/search?q=processing&spm=1001.2101.3001.7020) was blocked because a document already has a focused element. 	

自动对焦处理已被阻止，因为文档已具有对焦元素。

### 解决办法

<a-input v-model="inputConten" class="input-content" placeholder="" id="wrapperInput"/>

```
this.$nextTick(() => {

​    let userName = document.getElementById('wrapperInput')

​    userName.focus()

   })
```





## 问题6：解决qrcode生成的二维码安卓手机长按不识别问题

### 问题描述

qrcode生成的二维码，在苹果等手机上长按可识别，在华为手机上长按没有反应，截图保存下来长按又可以识别。

### 问题原因

`浏览器兼容问题`
qrcode在页面生成二维码时，会生成一个[canvas](https://so.csdn.net/so/search?q=canvas&spm=1001.2101.3001.7020)标签和一个img标签。在电脑浏览器上调试的时候，发现生成二维码之后canvas标签是会自动隐藏的，然后展示img标签，我们看到和识别的其实是图片。但是在华为手机上生成的canvas是不会隐藏的，我们看到的是canvas，所以无法识别，截图却可以。

### 解决办法

手动将canvas隐藏，获取生成的链接拼到图片里面。

```
<!--用于存放canvas，隐藏-->
<div id="QRCodeNone" style="width:54%;height:200px;margin:8% 0 8% 23%;display:none;">
</div>
<!--用于存放二维码图片-->
<div id="QRCode" style="width:54%;height:200px;margin:8% 0 8% 23%;">
</div>

function makeQRCode() {
    var qrcode = new QRCode(document.getElementById("QRCodeNone"), {
        text: params,//二维码数据
        width: 200,
        height: 200
    });
    //在小米或者华为手机上生成的二维码是通过canvas展示的，img标签被隐藏,所以需要特殊处理一下，将canvas标签隐藏，拿到生成的url放到img里面再展示出来
    var myCanvas = document.getElementsByTagName('canvas')[0];
    var img = convertCanvasToImage(myCanvas);
    $("#QRCode").append(img);
};
//将canvas返回的图片添加到image里
function convertCanvasToImage(canvas){
	var image = new Image();
	image.src = canvas.toDataURL("image/png");
	return image;
}
```



## 问题7：build打包后访问index.html页面报错（404）

### 解决办法

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20220622152451492.png)







![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20220622152556947.png)

## 问题8：git clone --mirror 和 git clone 的区别



### 解决办法

git clone --mirror 和 git clone 的区别在于：



git clone --mirror 会将远程仓库的所有分支、标签和提交都克隆到本地，并创建一个完全相同的镜像仓库，包括 Git 数据库中的所有对象。这种方式克隆的仓库不是一个普通的 Git 仓库，而是一个完全镜像了远程仓库的裸仓库。

git clone 会将远程仓库的默认分支（通常是 master 分支）和所有历史提交克隆到本地，但不会包括远程仓库中的所有分支和标签。

因此，git clone --mirror 适用于需要完全复制远程仓库的场景，例如备份、迁移、分布式协作等场景。



使用 ***git config --unset remote.origin.mirror*** 的作用是取消远程仓库的镜像设置。如果你在使用 git clone --mirror 克隆了一个仓库，并将其作为镜像仓库使用，那么在推送修改时，你必须先将其配置为非镜像仓库，否则推送将失败。因此，使用 git config --unset remote.origin.mirror 可以取消镜像设置，以便你可以正常地推送修改。



如果你想避免使用 git config 命令，你可以在 git clone 命令中指定 --no-hardlinks 选项，这样将克隆一个普通的 Git 仓库，而不是镜像仓库，例如：



```
git clone --no-hardlinks <远程仓库地址> <本地目录>
```

这样克隆出来的仓库和普通仓库一样，可以直接推送修改。