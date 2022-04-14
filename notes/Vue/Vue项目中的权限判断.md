写在前面

> 这个项目是基于 [花裤衩](https://juejin.im/user/5648a5ca60b259caebaf7562) 大佬的 [vue-element-admin](https://panjiachen.github.io/vue-element-admin-site/zh/) 框架来进行开发的,其中涉及的代码及是基于大佬的代码

<br />今儿有个需求,就是给现有的项目增加一个登录权限判断,之后便在网上开始翻阅有关 vue 登录权限判断的方法,大部分都是用动态路由,在 meta 头里定义一个 roles,然后在 permission 里面进行路由验证

```javascript
  {
        path: 'home',
        name: 'home',
        meta: {
            roles: ['admin']//或者是roles:['editor']
        }
```

然后在用动态路由来进行判断权限

```javascript
const role = 'editor'
router.beforeEach((to, from, next) => {
  if (to.meta.roles.includes(role)) {
    next()
  } else {
    next({ path: '/404' })
  }
})
```

又去翻了翻项目的权限,这个略复杂一点,需要根据不同的权限展示不同的页面,也要根据不同的权限来配置不同的功能,由于本项目是基于 花裤衩 大佬的 vue-element-admin 框架改的,看了下原先的登陆状态判断,便在这个基础上稍微改动了一下.<br />本项目的不同的权限:

```javascript
//这样的权限还有很多
export const power1 = {
  key: 'power1',
  label: '权限1',
  children: [
    { label: '权限1-1', key: 'power1_1' },
    { label: '权限1-2', key: 'power1_2' },
    { label: '权限1-3', key: 'power1_3' },
  ],
}
export const power2 = {
  key: 'power2',
  label: '权限2',
  children: [
    { label: '权限2-1', key: 'power2_1' },
    { label: '权限2-2', key: 'power2_2' },
    { label: '权限2-3', key: 'power2_3' },
  ],
}
```

首先再配置完路由和不同账号的权限之后,在获取个人信息之后拿到 permission 字段里的关于本账号的权限,然后其返回的格式是我传给后端的,后端又原封不动传了回来,那就直接拿来用吧(选择权限时用的 Element UI 的树形控件,只能这样存了 😏)

```javascript
permission = [
  {
    key: 'power1',
    label: '权限1',
    children: [
      { label: '权限1-1', key: 'power1_1' },
      { label: '权限1-2', key: 'power1_2' },
      { label: '权限1-3', key: 'power1_3' },
    ],
  },
  {
    key: 'power2',
    label: '权限2',
    children: [
      { label: '权限2-1', key: 'power2_1' },
      { label: '权限2-2', key: 'power2_2' },
      { label: '权限2-3', key: 'power2_3' },
    ],
  },
]
```

之后在 VUEX 里面把存取的路由给进行一下判断,为了保证权限的唯一性,在每个权限对象里都加了一个 key 来标识,

```javascript
import { asyncRoutes, constantRoutes } from '@/router'//拿到路由信息
//在permission里调用下这个方法,把账号权限给传过来
generateRoutes({ commit }, { roles }) {
    const permissions = JSON.parse(roles)
    return new Promise(resolve => {
      let accessedRoutes = asyncRoutes || []
      //判断完是否有权限之后在重新赋值,hasPermission用来判断是否有权限,然后用Array.splice方法删除掉没权限的页面
      accessedRoutes = hasPermission(accessedRoutes, permissions)
      //然后把访问到的路由存到vuex里面,
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
```

然后在 permission.js 里面定义一下获取个人信息

```javascript
//获取token
const hasToken = getToken()
if (hasToken) {
  if (to.path === '/login') {
    next({ path: '/' })
    NProgress.done()
  } else {
    //登录之后保存个人信息到vuex,然后获取账号权限,这时个人信息应该也要保存
    //因为之前登陆时已经获取了账号的权限保存到路由里了,这时是有权限的
    const hasRoles = store.getters.user.role
    if (hasRoles) {
      next()
    } else {
      try {
        let user = {}
        //调用个人信息的接口,这样每一次刷新之后用户信息都会重新获取,以防丢失
        await auth
          .getUserInfo()
          .then((data) => {
            user = data
          })
          .catch((error) => {
            throw error.data.message
          })
        //定义一个roles来保存权限
        const roles = user.permissions
        //保存到vuex里面
        await store.dispatch('auth/setUserInfo', user)
        //调用上面代码中的权限判断
        const accessRoutes = await store.dispatch('permission/generateRoutes', {
          roles,
        })
        //添加到路由里
        router.addRoutes(accessRoutes)
        next({ ...to, replace: true })
      } catch (error) {
        await store.dispatch('auth/clearAuth')
        Message({
          message: error || 'Has Error',
          type: 'error',
          duration: 5 * 1000,
        })
        next(`/login?redirect=${to.path}`)
        NProgress.done()
      }
    }
  }
} else {
  if (whiteList.indexOf(to.path) !== -1) {
    next()
  } else {
    next(`/login?redirect=${to.path}`)
    NProgress.done()
  }
}
```

这样不同权限的页面就显示好了,剩下的就是显示不同的功能了<br />这时就用上了花裤衩大佬的自定义指令了

```javascript
import store from '@/store'
//这是已经存好的权限的数组,把之前拿到的permission中的power1和power2中的children中的key保存里面,定义唯一性
import { newRoles } from '@/set/index'
export default {
  inserted(el, binding, vnode) {
    const { value } = binding
    const permissionRoles = value
    if (value && value.length > 0) {
      const hasPermission = newRoles.some((p) => {
        return permissionRoles === p
      })
      if (!hasPermission) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    } else {
      throw new Error(`need roles! Like v-permission="['power1_1']"`)
    }
  },
}
```

使用

```javascript
<el-button type="primary" v-permission="['power1_1']">
  修改
</el-button>
```
