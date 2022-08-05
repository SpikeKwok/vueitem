// detail模块小仓库
// 引入api/index中统一写的接口处理函数
import { reqGoodsInfo, reqAddOrUpdateShopCart } from '@/api'
import { getUUID } from '@/utils/uuid_token'
const state = {
  goodsInfo: {},
  // 游客临时身份uuid
  uuid_token: getUUID()
}
const mutations = {
  GETGOODSINFO (state, goodsInfo) {
    state.goodsInfo = goodsInfo
  }
}
const actions = {
  async getGoodsInfo ({ commit }, skuId) {
    const result = await reqGoodsInfo(skuId)
    if (result.code === 200) {
      commit('GETGOODSINFO', result.data)
    }
  },
  // 将产品添加到购物车
  // 参数解构：因为会传给他一个对象，对象里面有skuid, skuNum所以这里解构
  async addOrUpdateShopCart ({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateShopCart(skuId, skuNum)
    // 当前函数返回的是一个promise
    if (result.code === 200) {
      return 'ok'
    } else {
      return Promise.reject(new Error('failed'))
    }
  }
}
const getters = {
  // 路径导航简化
  categoryView (state) {
    // goodInfo是一个空对象，所以报错undefined，之后数据到了，就生效了，但是一开始是空对象，所以计算属性时不能一杆子打死，至少让他是个空对象
    return state.goodsInfo.categoryView || {}
  },
  // 产品信息简化
  skuInfo (state) {
    return state.goodsInfo.skuInfo || {}
  },
  // 产品售卖属性简化
  spuSaleAttrList (state) {
    return state.goodsInfo.spuSaleAttrList || []
  }
}

export default {

  state,
  mutations,
  actions,
  getters
}
