
import { reqGetCode, reqUserRegister, reqUserLogin, reqUserInfo, reqLogOut } from '@/api'
import { setToken, getToken, removeToken } from '@/utils/token'
const state = {
  code: '',
  token: getToken(),
  userInfo: {}
}
const mutations = {
  GETCODE (state, code) {
    state.code = code
  },
  USERLOGIN (state, token) {
    state.token = token
  },
  GETUSERINFO (state, userInfo) {
    state.userInfo = userInfo
  },
  CLEAR (state) {
    // 先清空仓库数据，再移除token
    state.userInfo = {}
    state.token = ''
    removeToken()
  }
}
const actions = {
  // 获取验证码
  async getCode ({ commit }, phone) {
    const result = await reqGetCode(phone)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 注册的请求
  async userRegister  ({ commit }, user) {
    const result = await reqUserRegister(user)
    if (result.code === 200) {
      commit('GETCODE', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 登录的请求
  async userLogin  ({ commit }, data) {
    const result = await reqUserLogin(data)
    if (result.code === 200) {
      commit('USERLOGIN', result.data.token)
      // 将token存到本地存储
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 获取用户信息
  async getUserInfo  ({ commit }) {
    const result = await reqUserInfo()
    if (result.code === 200) {
      commit('GETUSERINFO', result.data)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
  },
  // 退出登录，向服务器发请求，清除数据和token,没有返回
  async userLogOut  ({ commit }) {
    const result = await reqLogOut()
    if (result.code === 200) {
      commit('CLEAR')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
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
