---
title: Nginx 部署 vue 项目
date: "2023-04-03"
categories:
  - 前端
tags:
  - Vue
  - 部署
---

# Nginx 部署 vue 项目

## **一、部署步骤**

### **_1._** 服务器上安装[NGINX](https://so.csdn.net/so/search?q=NGINX&spm=1001.2101.3001.7020)

参考：https://blog.csdn.net/yangfengjueqi/article/details/87973698

### **_2._** 前端项目打包

npm run build 打包构建

### **_3._** 前端项目安装

将 dist.zip 文件进行解压，解压后的全部文件拷贝到{nginx_home}/html 目录下

解压后的文件内容如下图所示：

![img](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/wps8.jpg)

![img](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/wps9.jpg)

### **_4._** 修改 nginx 配置

![image-20230403151735955](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403151735955.png)

打开上图的 nginx.conf 文件进行编辑，内容如下：

<img src="https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403151750398.png" alt="image-20230403151750398" style="zoom: 67%;" />

<img src="https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403151823845.png" alt="image-20230403151823845"  />

### **_5._** 启动 nginx

双击下图所示程序启动 nginx，没有提示框，可以在任务管理器中查看 nginx 程序是否启动

![image-20230403152155017](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403152155017.png)

### **_6._**测试

http://localhost:端口/#/home

![image-20230403152336460](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403152336460.png)
