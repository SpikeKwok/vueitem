// search模块小仓库
// 引入api/index中统一写的接口处理函数
import { reqGetSearchInfo } from '@/api'
const state = {
  searchList: {}
}
const mutations = {
  // mutations中方法的第一个参数永远是state状态，第二个参数为传入方法的参数
  SEARCHLIST (state, searchList) {
    state.searchList = searchList
  }

}
const actions = {
  // actions中的处理函数的第一个参数就是此store实例，此处解构出store中的commit方法使用更方z便
  // 第二个参数是dispatch时派发的数据,要传给reqGetSearchInfo使用所以至少是一个空对象
  async getSearchList ({ commit }, params = {}) {
    const result = await reqGetSearchInfo(params)
    if (result.code === 200) {
      commit('SEARCHLIST', result.data)
    }
  }

}
const getters = {
// getters中的方法的第一个参数是当前仓库的state数据（状态），而不是大仓库的
// state.searchList.goodsList只有两种状态，服务器返回的数据或空对象
// 在getters中拿数据时，两种状态都要考虑到，若数据为空数组，这里return就是undefined，
// 这样组件拿去会报错，严谨周到一点，加个空数据给组件，处理错误就轻松很多
  goodsList (state) {
    return state.searchList.goodsList || {}
  },
  trademarkList (state) {
    return state.searchList.trademarkList || {}
  },
  attrsList (state) {
    return state.searchList.attrsList || {}
  }
}

export default {

  state,
  mutations,
  actions,
  getters
}
