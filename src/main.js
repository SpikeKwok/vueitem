import Vue from 'vue'
import App from './App.vue'
import router from './router'

// 三级联动全局组件
import TypeNav from '@/components/TypeNav/TypeNav'

// 轮播图全局组件
import Carousel from '@/components/Carousel/sv-carousel'

// 分页器全局组件
import Pagenation from '@/components/Pagenation/sv-pagenation'

// 引入仓库
import store from './store/index'

// 按需引入element-ui
import { Button, MessageBox } from 'element-ui'

// 引入mock
import '@/mock/mockServer'
import 'swiper/css/swiper.css'

// 统一引入接口文件中的所有接口
import * as API from '@/api'
// 引入写在外边的表单验证插件
import '@/plugins/validate'
// 引入图片懒加载插件
import VueLazyload from 'vue-lazyload'
import atm from '@/assets/1.gif'
Vue.use(VueLazyload, {
  // 懒加载默认图片
  loading: atm

})
// 引入swiper样式，因为多处使用，所以在全局引入
// 三级联动组件已经起过名了，第一个参数：全局组件名，第二个参数：哪一个组件
Vue.component(TypeNav.name, TypeNav)
Vue.component(Carousel.name, Carousel)
Vue.component(Pagenation.name, Pagenation)

// elementui使用原型的方式挂载
Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$button = Button

Vue.config.productionTip = false
new Vue({
  // 注册路由，kv一致省略写法
  // 当这里书写router时，所有组件身上都拥有了$router,$route属性
  router,
  // 注册仓库，组件实例身上会多一个$store属性
  store,
  // 指定事件总线对象
  beforeCreate () {
    Vue.prototype.$buss = this
    Vue.prototype.$API = API
  },

  render: h => h(App)
}).$mount('#app')
