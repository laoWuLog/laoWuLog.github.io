---
title: 小程序网络请求封装
date: '2023-05-08'
categories:
  - 前端
tags:
  - 小程序
---

# 小程序网络请求封装

`tip: 可拉到最后直接享用完整代码`

小程序中进行网络请求时，我们通常会使用 wx.request() API，但如果每次都直接使用该 API 进行网络请求，会造成代码重复度高、难以维护的问题。因此，我们可以对 wx.request() 进行封装，以提高代码的复用性和可维护性。

以下是一个简单的小程序网络请求封装示例：

## 1. 封装一个 request() 方法：

```javascript
const request = (options) => {
  return new Promise((resolve, reject) => {
    wx.request({
      url: options.url,
      method: options.method || 'GET',
      data: options.data || {},
      header: options.header || {},
      success: (res) => {
        // 请求成功时返回数据
        resolve(res.data)
      },
      fail: (err) => {
        // 请求失败时返回错误信息
        reject(err)
      }
    })
  })
}

```



## 2. 在需要进行网络请求的地方调用 request() 方法：

### 2.1 .then().catch()形式

```javascript
request({
  url: 'https://example.com/api/getData',
  method: 'POST',
  data: {
    key1: 'value1',
    key2: 'value2'
  }
}).then((res) => {
  // 请求成功时的处理逻辑
}).catch((err) => {
  // 请求失败时的处理逻辑
})

```

### 	2.2 async/await语法糖形式

```JavaScript
async function getData() {
  try {
    const res = await request({
      url: 'https://example.com/api/getData',
      method: 'POST',
      data: {
        key1: 'value1',
        key2: 'value2'
      }
    })
    // 请求成功时的处理逻辑
  } catch (err) {
    // 请求失败时的处理逻辑
  }
}

getData()
```



以上代码中，我们封装了一个 request() 方法，该方法接收一个对象作为参数，该对象包含了请求的相关信息，例如请求的 URL、请求方法、请求参数等等。在 request() 方法内部，我们使用 Promise 对象来处理请求成功和失败时的回调函数，并通过 resolve() 和 reject() 方法来返回数据或错误信息。

在实际使用中，我们只需要调用 request() 方法，并传入请求相关信息即可。当请求成功时，会执行 then() 方法中的回调函数，我们可以在该回调函数中处理返回的数据；当请求失败时，会执行 catch() 方法中的回调函数，我们可以在该回调函数中处理错误信息。



## 3. 拓展封装

### 3.1 对参数进行非法字符过滤

```javascript
// 参数过滤和拦截的处理函数
const filterData = (data) => {
  // 进行参数过滤和拦截的处理，确保参数的有效性和安全性
  const filteredData = { ...data }
  // 对参数进行非法字符过滤，例如过滤掉单引号、双引号等特殊字符
  Object.keys(filteredData).forEach(key => {
    if (typeof filteredData[key] === 'string') {
      filteredData[key] = filteredData[key].replace(/['"]/g, '')
    }
  })
  return filteredData
}
```

### 3.2 将基础 URL 和请求的路径拼接起来，形成完整的请求 URL

```javascript
const BASE_URL = 'https://example.com/api/'

const request = async ({ url, data = {}, method = 'GET' }) => {
  const fullUrl = BASE_URL + url // 拼接完整的请求 URL
  const options = {
    method,
    data: filterData(data),
    header: {
      'content-type': 'application/json' // 根据实际情况设置请求头
    }
  }
  ```

在以上代码中，我们将基础 URL 定义为常量 BASE_URL，然后在 request() 方法中，将基础 URL 和请求的路径 url 进行拼接，形成完整的请求 URL。这样做的好处是，在以后需要更换基础 URL 时，只需要修改常量 BASE_URL 即可，而不需要修改每个请求的 URL。

## 4. 完整代码

请求request()方法封装

```javascript
// utils/request.js
const BASE_URL = 'https://example.com/api/'

  try {
    const response = await uni.request({
      url: fullUrl,
      ...options
    })
    return response.data
  } catch (err) {
    console.error(`Request failed. URL: ${fullUrl}. Method: ${method}. Error: `, err)
    throw err
  }
}

const request = (options) => {
  // 过滤和拦截参数的处理
  const filteredData = filterData(options.data)
  // 构造请求参数
  const requestData = {
    url: BASE_URL + options.url, // 拼接完整的请求 URL
    method: options.method || 'GET',
    data: filteredData,
    header: options.header || {},
  }
  return new Promise((resolve, reject) => {
    wx.request({
      ...requestData,
      success: (res) => {
        // 请求成功时返回数据
        resolve(res.data)
      },
      fail: (err) => {
        // 请求失败时返回错误信息
        reject(err)
      }
    })
  })
}


// 参数过滤和拦截的处理函数
const filterData = (data) => {
  // 进行参数过滤和拦截的处理，确保参数的有效性和安全性
  const filteredData = { ...data }
  // 对参数进行非法字符过滤，例如过滤掉单引号、双引号等特殊字符
  Object.keys(filteredData).forEach(key => {
    if (typeof filteredData[key] === 'string') {
      filteredData[key] = filteredData[key].replace(/['"]/g, '')
    }
  })
  return filteredData
}


export default request

```

在相关页面引入使用

```javascript
// pages/index/index.js
import request from '../../utils/request'

Page({
  data: {},
  // 在需要调用网络请求的地方调用 request() 方法即可
  async function getData() {
  try {
    const response = await request({
      url: 'http://example.com/api/data',
      method: 'POST',
      data: { id: 1 }
    })
            console.log('Data received:', response)
  } catch (err) {
    console.error('Request failed:', err)
  }
},
  getData()
})
```


在以上代码中，我们将封装的 request() 方法通过 export default 导出，在需要调用网络请求的地方通过 import 引入即可。在调用 request() 方法时，可以传递相应的参数进行网络请求，并根据返回结果进行相应的处理。