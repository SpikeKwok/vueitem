import Vue from 'vue'
import Vuex from 'vuex'
import home from './home'
import search from './search'
import detail from './detail'
import shopcart from './shopcart'
import user from './log$reg/user'
import trade from './trade/trade'
// 需要给vue安装插件
Vue.use(Vuex)
// 向外暴露一个Store实例
export default new Vuex.Store({

  modules: {
    home,
    search,
    detail,
    shopcart,
    user,
    trade
  }
})
