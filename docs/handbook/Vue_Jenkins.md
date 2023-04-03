---
title: 前端开发流程以及前端Jenkins部署操作
date: "2023-04-03"
categories:
  - 前端
tags:
  - 部署
---

# 前端开发流程以及前端 Jenkins 部署操作

## 开发流程

**1.** 创建自己的分支，进行开发

**2.** 开发完成，提交到 test 分支

**3.** 测试有问题，返工，无问题，合并到预发布环境 master 分支

**4.** 预发布环境无问题就合并到 release 分支。正式环境以 release 进行部署

## Jenkins 配置

**\*\*需要先确定部署服务器是否有 pm2 npm 等前端部署环境\*\***

### **1.** **_新建项目_**

**![image-20230403172104699](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172104699.png)**

### **2.** **_填写名称，点击创建_**

**![image-20230403172404210](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172404210.png)**

### **3.** **_选择“git”，填写 git 项目地址以及 git 访问权限的账号_**

**![image-20230403172500287](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172500287.png)**

### **4.** **_选择拉取分支_**

**![image-20230403172543676](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172543676.png)**

### **5.** **_构建环境”配置部署的服务_**

**![image-20230403172650926](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172650926.png)**

### **6.** "***Source files***=”源文件直接填写'***\** \****'，表示所有文件

**![image-20230403172801090](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172801090.png)**

### **7.** **_配置部署的路径，注意目录需要提前创建好_**

**![image-20230403172917959](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403172917959.png)**

### **8.** **_配置部署脚本_**

```javascript
#!/bin/bash
source  /etc/profile
cd /home/opacWeb/项目名

pm2 stop 项目名
pm2 delete 项目名

npm install
npm run build

pm2 start npm --name 项目名 -- run serve:prod
```

### **9.** **_点击保存_**

**![image-20230403173031447](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403173031447.png)**

### **10.** **_构建项目_**

**![image-20230403173055195](https://fastly.jsdelivr.net/gh/laoWuLog/blogImage@main/img/image-20230403173055195.png)**
