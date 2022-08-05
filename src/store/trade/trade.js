
import { reqAddressInfo, reqOrderInfo } from '@/api'

const state = {
  userAddress: [],
  orderInfo: {}
}
const mutations = {
  GETUSERADDRESS (state, userAddress) {
    state.userAddress = userAddress
  },
  GETORDERINFO (state, orderInfo) {
    state.orderInfo = orderInfo
  }
}
const actions = {
  // 获取用户地址信息
  async getUserAddress ({ commit }) {
    const result = await reqAddressInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('GETUSERADDRESS', result.data)
    }
  },
  // 获取商品清单
  async getOrderInfo ({ commit }) {
    const result = await reqOrderInfo()
    // console.log(result)
    if (result.code === 200) {
      commit('GETORDERINFO', result.data)
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
