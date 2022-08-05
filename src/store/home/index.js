// home模块小仓库
// 引入api/index中统一写的接口处理函数
import { reqCategoryList, reqGetBannerList, reqFloorList } from '@/api'
const state = {
  categoryList: [], // 在查看result时知道了data是一个数组，所以定义数组
  bannerList: [],
  floorList: []
}
const mutations = {
  CATEGORYLIST (state, categoryList) {
    state.categoryList = categoryList
  },
  BANNERLIST (state, bannerList) {
    state.bannerList = bannerList
  },
  FLOORLIST (state, floorList) {
    state.floorList = floorList
  }
}
const actions = {
  // 通过api里面的接口函数调用，向服务器发请求，获取服务器数据
  // 返回对象中的data数组是我们三级联动的数据，要给到state，所以在方法中直接解构出commit使用更方便
  // 修改state的操作在mutations中
  async categoryList ({ commit }) {
    const result = await reqCategoryList()
    // console.log(result)// 返回axios执行之后的返回结果promise
    if (result.code === 200) {
      commit('CATEGORYLIST', result.data) // 使用mutations内的方法
    }
  },
  async getBannerList ({ commit }) {
    const result = await reqGetBannerList()
    if (result.code === 200) {
      commit('BANNERLIST', result.data) // 使用mutations内的方法
    }
  },
  async getFloorList ({ commit }) {
    const result = await reqFloorList()
    if (result.code === 200) {
      commit('FLOORLIST', result.data) // 使用mutations内的方法
    }
  }
}
const getters = {

}

export default {

  state,
  mutations,
  actions,
  getters
}
