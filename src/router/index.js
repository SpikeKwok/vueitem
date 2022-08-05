import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from './routes'
// 引入store
import store from '@/store'
Vue.use(VueRouter)
// 先把vue-router原型对象prototype里的push保存一份
// VueRouter.prototype.push 中每一个单词都是构造函数
const originPush = VueRouter.prototype.push
const originReplace = VueRouter.prototype.replace

VueRouter.prototype.push = function (location, resolve, reject) {
  // console.log(this) VueRouter的一个实例
  if (resolve && reject) {
    originPush.call(this, location, resolve, reject)
  } else {
    originPush.call(this, location, () => {}, () => {})
  }
}

VueRouter.prototype.replace = function (location, resolve, reject) {
  // console.log(this) VueRouter的一个实例
  if (resolve && reject) {
    originReplace.call(this, location, resolve, reject)
  } else {
    originReplace.call(this, location, () => {}, () => {})
  }
}

const router = new VueRouter({
  // k:v，es6省略写法
  routes,
  // vue router 路由滚动行为
  scrollBehavior (to, from, savedPosition) {
    return { y: 0 }
  }
})

router.beforeEach(async (to, from, next) => {
  const token = store.state.user.token
  const name = store.state.user.userInfo.name
  // 用户登录才有token，否则一定没有
  if (token) {
    // 用户登录了就禁止他去登录
    if (to.path === '/login') {
      next('/home')
    } else {
      // 登录了但是不去login,要保证有name再放行
      if (name) {
        // header用name属性值做的判断，所以我们也用name
        next()
      } else {
        // 没有name则派发actions，将数据存vuex中，再跳转
        try {
          await store.dispatch('getUserInfo')
          next()
        } catch (error) {
          // token失效了
          // 清除所有信息，回到登录页面从新登录
          await store.dispatch('userLogOut')
          next('/login')
        }
      }
    }
  } else {
    // 未登录：不能去支付相关的，不能去个人中心
    // 未登录，则去上面页面时跳转到支付页面，不是则放行
    // 跳转到登录之后，若登录完成，则回到哪里？用户之前要去的页面
    const topath = to.path
    if (topath.indexOf('/trade') !== -1 || topath.indexOf('/pay') !== -1 || topath.indexOf('/center') !== -1) {
      // 有则跳到登录页，登录之后再跳需要一开始要去的路由地址，怎么存？
      next(`/login?redirect=${topath}`)
    } else {
      // 不是上面的组件，未登录也可放行
      next()
    }
  }
})
export default router
