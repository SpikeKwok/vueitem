// 对axios进行二次封装
import axios from 'axios'
// 引入进度条
import nProgress from 'nprogress'
// 引入进度条样式
import 'nprogress/nprogress.css'
import store from '@/store'
// 1.利用axios对象的方法create，去创建一个axios实例
// 2.request就是axios，只不过稍微配置一下
const requests = axios.create({
  // 配置对象
  // 基础路径，发请求的时候，路径当中会出现api
  baseURL: '/api',
  // 代表请求超时的事件为5s
  timeout: 5000
})
// 3.请求拦截器:请求发出之前，拦截器可以检测到，可以在发出之前做一些事情
requests.interceptors.request.use((config) => {
  // config是什么？配置对象
  if (store.state.detail.uuid_token) {
    // 给请求头添加一个字段，和后台商量好的
    config.headers.userTempId = store.state.detail.uuid_token
  }
  // 将token带给服务器
  if (store.state.user.token) {
    // 给请求头添加一个字段，和后台商量好的
    config.headers.token = store.state.user.token
  }
  // 进度条开始
  nProgress.start()
  // config: 配置对象，里面有一个属性很重要，header请求头
  return config
})
// 4.响应拦截器
requests.interceptors.response.use((res) => {
  // 进度条结束
  nProgress.done()

  // 成功的回调函数：服务器响应的数据回来以后，响应拦截器可以检测到，可以做一些事情
  // 比如一般请求都有data属性，先写一个.data
  return res.data
}, (errr) => {
  // 温馨提示:某一天发请求,请求失败,请求失败的信息打印出来
  alert(errr.message)
  // 终止Promise链
  return new Promise()
})
// 对外暴露
export default requests
