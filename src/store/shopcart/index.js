// detail模块小仓库
// 引入api/index中统一写的接口处理函数
import { reqCartList, reqDeleteCartListById, reqUpdateCheckedById } from '@/api'

const state = {
  cartList: []
}
const mutations = {
  GETCARTLIST (state, cartList) {
    state.cartList = cartList
  }
}
const actions = {
  // 获取购物车数据
  async getCartList ({ commit }) {
    const result = await reqCartList()
    // console.log(result)
    if (result.code === 200) {
      commit('GETCARTLIST', result.data)
    }
  },
  // 删除请求发给服务器
  async deleteCartListById ({ commit }, skuId) {
    const result = await reqDeleteCartListById(skuId)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 将更新的复选框数据发给服务器
  async updateCheckedById ({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateCheckedById(skuId, isChecked)
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('faile'))
    }
  },
  // 批量删除选中的商品，这个功能没有接口，需要调用删除操作
  deleteAllCheckedCart ({ dispatch, getters }) {
    const promiseAll = []
    // 获取；购物车中全部的产品
    getters.cartList.cartInfoList.forEach(item => {
      const promise = item.isChecked === 1 ? dispatch('deleteCartListById', item.skuId) : ''
      // 每一次返回的promise都放在数组中
      promiseAll.push(promise)
    })
    // 用promise.all方法返回成功或失败
    return Promise.all(promiseAll)
  },
  // 全选按钮的操作
  updateAllCartChecked ({ dispatch, getters }, isChecked) {
    const promiseAll = []
    // 获取；购物车中全部的产品
    getters.cartList.cartInfoList.forEach(item => {
      const promise = dispatch('updateCheckedById', { skuId: item.skuId, isChecked })
      // 每一次返回的promise都放在数组中
      promiseAll.push(promise)
    })
    // 用promise.all方法返回成功或失败
    return Promise.all(promiseAll)
  }
}

const getters = {
  // 数据太复杂简化一下
  cartList (state) {
    return state.cartList[0] || {}
  }

}

export default {

  state,
  mutations,
  actions,
  getters
}
