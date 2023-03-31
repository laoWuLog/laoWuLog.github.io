---
title: 如何使用mockjs模拟登录接口登录系统并使用Vue Router的守卫来管理路由权限？
date: '2023-03-31'
categories:
  - 前端
tags:
  - Vue
---

## 如何使用mockjs模拟登录接口登录系统并使用Vue Router的守卫来管理路由权限？

### mock安装

为了使用mockjs模拟登录接口登录系统，我们可以在Vue项目中安装mockjs：

```javascript
npm install mockjs --save-dev
```

### mock配置

然后在`src/mock`目录下创建一个`index.js`文件，该文件将用于模拟接口并导出配置对象。以下是一个示例配置：

```javascript
// src/mock/index.js
import Mock from 'mockjs'

const login = {
  'GET /api/login': (req, res) => {
    const { username, password } = req.query
    if (username === 'admin' && password === 'admin') {
      return res.send({
        code: 0,
        message: '登录成功',
        data: {
          username: 'admin',
          role: 'admin',
          token: 'admin_token'
        }
      })
    } else if (username === 'superadmin' && password === 'superadmin') {
      return res.send({
        code: 0,
        message: '登录成功',
        data: {
          username: 'superadmin',
          role: 'superadmin',
          token: 'superadmin_token'
        }
      })
    } else {
      return res.send({
        code: -1,
        message: '账号或密码错误'
      })
    }
  }
}

Mock.setup({
  timeout: '200-600'
})

Mock.mock(login)
```

在此配置中，我们定义了一个名为`login`的对象，该对象包含一个名为`GET /api/login`的路由和对应的处理函数。当客户端发出GET请求时，路由将使用查询参数中的用户名和密码来验证用户的身份，并返回相应的响应对象。如果登录成功，则响应对象将包含用户的账号信息和登录令牌。如果登录失败，则响应对象将包含错误代码和错误消息。

### vuex配置

现在，我们需要将该配置对象导入到我们的Vue项目中，并使用axios来发送登录请求。以下是一个示例登录函数：

```javascript
// src/api/index.js
import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
  timeout: 5000
})

export function login(username, password) {
  return request.get('/login', { params: { username, password } })
    .then(response => response.data)
}
```

在此示例中，我们定义了一个名为`request`的axios实例，并将其配置为基本URL为`/api`，超时时间为5000ms。我们还定义了一个名为`login`的函数，该函数接受用户名和密码作为参数，并使用`request`实例来发送GET请求。该函数将响应对象中的数据属性返回给调用方。

```javascript
// store/modules/user.js
const state = {
  username: '',
  role: '',
  token: ''
}

const mutations = {
  login(state, payload) {
    state.username = payload.username
    state.role = payload.role
    state.token = payload.token
  },
  logout(state) {
    state.username = ''
    state.role = ''
    state.token = ''
  }
}

const actions = {
  login({ commit }, payload) {
    // 发送登录请求，并在成功时提交mutation
    return new Promise((resolve, reject) => {
      axios.post('/api/login', payload).then(res => {
        if (res.data.code === 200) {
          commit('login', res.data.data)
          resolve()
        } else {
          reject(new Error(res.data.message))
        }
      }).catch(err => {
        reject(err)
      })
    })
  },
  logout({ commit }) {
    commit('logout')
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
```

在此示例中，我们定义了一个名为`state`的状态对象，该对象包含三个属性：`username`，`role`和`token`。我们还定义了一个名为`login`的mutation，该mutation将接受来自登录请求的用户账号信息，并将其存储在`state`对象中。最后，我们还定义了一个名为`login`的action，该action将使用我们在前面定义的`login`函数来发送登录请求，并在登录成功时调用`login`mutation。 现在，我们需要使用Vue Router的守卫来管理路由权限。以下是一个示例守卫：

### 路由配置

```javascript
在此示例中，我们定义了一个名为`state`的状态对象，该对象包含三个属性：`username`，`role`和`token`。我们还定义了一个名为`login`的mutation，该mutation将接受来自登录请求的用户账号信息，并将其存储在`state`对象中。最后，我们还定义了一个名为`login`的action，该action将使用我们在前面定义的`login`函数来发送登录请求，并在登录成功时调用`login`mutation。

现在，我们需要使用Vue Router的守卫来管理路由权限。以下是一个示例守卫：

​```
// src/router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/About.vue')
  },
  {
    path: '/admin',
    name: 'Admin',
    component: () => import('@/views/Admin.vue'),
    meta: {
      requiresAuth: true,
      roles: ['admin', 'superadmin']
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const { requiresAuth, roles } = to.meta
  const { username, role } = store.state.user

  if (requiresAuth && !username) {
    next({ path: '/login', query: { redirect: to.fullPath }})
  } else if (requiresAuth && roles && !roles.includes(role)) {
    next({ path: '/401' })
  } else {
    next()
  }
})

export default router
```

在此示例中，我们定义了三个路由：`Home`，`About`和`Admin`。`Admin`路由需要身份验证和角色为`admin`或`superadmin`才能访问。我们还定义了一个名为`router`的Vue Router实例，并在此实例中添加了一个名为`beforeEach`的全局前置守卫。该守卫将检查路由的`meta`字段，如果`requiresAuth`为`true`，并且当前用户没有登录，则将用户重定向到登录页面。如果用户已登录，但角色不在`roles`数组中，则将用户重定向到401页面。否则，守卫将允许用户访问路由。

### 401错误权限页面

最后，我们需要将401页面添加到我们的应用程序中。以下是一个示例401页面：

以下是一个简单的示例401页面的代码，包括一个`<h1>`标签、一条错误消息和一个回到首页的按钮。

```html
<template>
  <div class="unauthorized">
    <h1>401</h1>
    <p>您没有访问该页面的权限</p>
    <button @click="redirectToHome">返回首页</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToHome() {
      setTimeout(() => {
        this.$router.push('/')
      }, 3000)
    }
  }
}
</script>

<style scoped>
.unauthorized {
  text-align: center;
  margin-top: 50px;
}

h1 {
  font-size: 5em;
  color: #f44336;
}

p {
  font-size: 1.5em;
  color: #333;
  margin-bottom: 20px;
}

button {
  font-size: 1.2em;
  padding: 10px 20px;
  background-color: #f44336;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
```

在此示例中，我们定义了一个简单的样式，用于使页面看起来更美观。我们还在`<script>`块中定义了一个名为`redirectToHome`的方法，该方法将使用`setTimeout`函数模拟异步请求并在3秒后将用户重定向到首页。最后，我们将这个方法绑定到一个`<button>`标记上，当用户点击它时，它将执行重定向操作。

### mock配置项

在此示例中，我们定义了一个简单的`<h1>`标记和一个提示消息，告诉用户他们没有权限访问所请求的页面。我们还在`<script>`块中添加了一个名为`mounted`的生命周期钩子函数，该函数将使用`setTimeout`函数模拟异步请求并在3秒后将用户重定向到首页。

最后，我们需要将我们的mock配置项添加到我们的应用程序中。以下是一个示例mock配置项：

```javascript
// src/mock/index.js
import Mock from 'mockjs'

const userDB = [
  { username: 'admin', password: 'admin', role: 'admin', token: 'admin-token' },
  { username: 'superadmin', password: 'superadmin', role: 'superadmin', token: 'superadmin-token' }
]

Mock.mock('/api/login', 'post', ({ body }) => {
  const { username, password } = JSON.parse(body)
  const user = userDB.find(u => u.username === username && u.password === password)

  if (user) {
    return {
      code: 0,
      message: '登录成功',
      data: {
        username: user.username,
        role: user.role,
        token: user.token
      }
    }
  } else {
    return {
      code: 1,
      message: '账号或密码错误'
    }
  }
})
```

在此示例中，我们使用Mock.js来模拟登录接口。我们定义了一个名为`userDB`的用户数据库数组，该数组包含两个用户账号信息：`admin`和`superadmin`。我们还使用`Mock.mock`函数来定义一个名为`/api/login`的POST请求，并使用函数参数来解析请求体。如果用户账号信息正确，我们将返回一个响应对象，其中包含用户账号信息、角色和一个用于身份验证的token。否则，我们将返回一个错误响应对象，其中包含一个错误消息。

以上是一个简单的示例，演示了如何使用Mock.js模拟登录接口并使用Vue Router守卫管理路由权限。这个示例可能不完美，但它可以为您提供一个思路来开始构建您自己的应用程序。