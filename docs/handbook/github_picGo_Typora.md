---
title: github + picGo + typora 三个好基友
date: '2023-03-27'
categories:
  - 前端
tags:
  - 部署
  - 图床
---

## 踩坑记录

> 记录每次踩坑的内容，避免瞎折腾。

|      踩坑内容      | 作者 |     日期      |
| :----------------: | :--: | :-----------: |
| 上传文件名不可重复 | 老吴 | 2023年3月27日 |
| 仓库默认分支为main | 老吴 | 2023年3月27日 |


## 1. **注册一个Github账号**

### 注册过程省略...

## 2. 配置Github

### 2.1 创建一个新仓库，用于存放图片

填写仓库名称和描述，且仓库必须是public的，否则存储的图片不能正常访问。

### 2.2 生成一个token，用于picGo访问github

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/1679903242897-f9b0c4bc-59a7-41d1-ae77-ee5010be62cf.png)
注意，生成的token只会在这里显示一次，所以记得单独保存下来

## 3. 下载picGo，并进行配置

### 3.1 下载

### 3.2 配置

仓库名：[github用户名]/[第一步新建的仓库名称]
分支：默认master，从2020.10.01开始，github的默认分支名变更为main
设定token：第一步创建的token
指定存储路径：可填可不填，如果填写了，图片就会存储在img文件夹下
设定自定义域名：https://cdn.jsdelivr.net/gh/[github用户名]/[仓库名]@main，注意，此处的分支一定要填写@main，否则默认使用master分支。而现在github创建的默认分支名为main，如果不指定，则会出现图片不能上传的情况
![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/1679904692445-812c3032-f276-48f6-ad01-53f7bb0cb263.png)

### 3.3 验证

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/1679905327518-df13dea4-66df-4980-a02b-49c05ccf246e.png)

## 4. 下载Typora，并进行配置

### 3.1 下载

使用旧版本,新版本要money

### 3.2 配置

![](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/1679905172878-29a0d20f-d264-421e-b7e3-f32e1f05fd86.png)


---

## 5. 备注

如果您使用 GitHub 和 PicGo 来管理和上传图片，但是在使用 Typora 时遇到了上传失败的问题，您可以尝试以下步骤：

1. 确认您的 Typora 配置中使用了正确的图床设置。在 Typora 的偏好设置中，进入“图像”选项卡，选择“自定义”，然后选择“PicGo”作为图床上传服务。确保您在这里填写的设置和 PicGo 中的设置一致。

2. 确认您在 Typora 中使用的图片链接格式与 PicGo 上传后生成的链接格式一致。通常，PicGo 默认会生成 Markdown 格式的链接，类似于 ![](https://raw.githubusercontent.com/username/repo/master/path/to/image.png#id=Wx1pI&originalType=binary&ratio=1&rotation=0&showTitle=false&status=done&style=none&title=)。确保您在 Typora 中插入的图片链接也是这个格式。

3. 检查您的 GitHub 仓库设置。确保您使用的是公共仓库，而不是私有仓库，因为私有仓库需要进行身份验证才能上传图片。此外，确保您的仓库设置允许了对图片的上传和访问权限。

如果您已经尝试了以上步骤，但仍然无法上传图片，请检查您的网络连接和 GitHub 账户权限等方面，或者尝试重新安装和配置 PicGo 和 Typora。