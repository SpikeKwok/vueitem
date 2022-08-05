// 统一管理项目接口的模块
// 引入二次封装的axios（带有请求，响应的拦截器）
import requests from './ajax'
// 引入mock二次封装的axios（复制的ajax.js,改了baseURL）
import mockRequsets from './mockAjax'

// 三级联动接口
// 对外暴露一个函数，只要外部调用这个函数，就向服务器发ajax请求，获取三级菜单数据,当前这个函数只需要把服务器返回的结果返回即可
// axios发请求返回的结果是一个promise对象
export const reqCategoryList = () => requests.get('/product/getBaseCategoryList')

// 获取banner（home首页轮播图接口）
export const reqGetBannerList = () => mockRequsets('/banner')

// floor家用电器接口,拿数据不用传参，所以函数无参数
export const reqFloorList = () => mockRequsets('/floor')

// 获取搜索模块的数据 ， 请求地址：/api/list  ，请求方式post
// 当前这个接口给服务器传递参数params，至少是一个空对象
// 要传的参数形式（参考）
// {
//   "category3Id": "61",
//   "categoryName": "手机",
//   "keyword": "小米",
//   "order": "1:desc",
//   "pageNo": 1,
//   "pageSize": 10,
//   "props": ["1:1700-2799:价格", "2:6.65-6.74英寸:屏幕尺寸"],
//   "trademark": "4:小米"
// }
export const reqGetSearchInfo = (params) => requests({
  url: '/list',
  method: 'post',
  data: params
})

// 商品信息详情页
// 两种写法
// export const reqGoodsInfo = (skuid) => requests({ url: `/item/${skuid}`, method: 'get' })
export const reqGoodsInfo = (skuId) => requests({ url: `/item/${skuId}`, method: 'get' })
// 添加到购物车(对已有物品进行数量改动)
// /cart/addToCart/{ skuId }/{ skuNum }
// post
export const reqAddOrUpdateShopCart = (skuId, skuNum) => requests({
  url: `/cart/addToCart/${skuId}/${skuNum}`,
  method: 'post'
})
// 获取购物车商品列表数据
export const reqCartList = () => requests({ url: '/cart/cartList', method: 'get' })
// 删除购物车商品列表数据
export const reqDeleteCartListById = (skuId) => requests({ url: `/cart/deleteCart/${skuId}`, method: 'delete' })
// 修改商品勾选状态
export const reqUpdateCheckedById = (skuId, isChecked) => requests({ url: `/cart/checkCart/${skuId}/${isChecked}`, method: 'get' })
// 通过手机号获取验证码
export const reqGetCode = (phone) => requests({ url: `/user/passport/sendCode/${phone}`, method: 'get' })
// 通过手机号，密码，验证码向服务器发请求注册
// 数据放在请求体了
export const reqUserRegister = (data) => requests({ url: '/user/passport/register', data, method: 'post' })
// 登录页面接口，带手机号和密码
export const reqUserLogin = (data) => requests({ url: '/user/passport/login', data, method: 'post' })
// 获取用户信息：需要带着用户的token向服务器要用户数据
export const reqUserInfo = () => requests({ url: '/user/passport/auth/getUserInfo', method: 'get' })
// 退出登录，不用参数，没有返回值
export const reqLogOut = () => requests({ url: '/user/passport/logout', method: 'get' })
// 获取用户地址信息
export const reqAddressInfo = () => requests({ url: '/user/userAddress/auth/findUserAddressList', method: 'get' })
// 获取商品清单
export const reqOrderInfo = () => requests({ url: '/order/auth/trade', method: 'get' })
// 提交订单接口
export const reqSubmitOrder = (tradeNo, data) => requests({ url: `/order/auth/submitOrder?tradeNo=${tradeNo}`, method: 'post', data })
// 支付页面获取订单信息接口
export const reqPayInfo = (orderId) => requests({ url: `/payment/weixin/createNative/${orderId}`, method: 'get' })
// 支付状态
export const reqPayStatus = (orderId) => requests({ url: `/payment/weixin/queryPayStatus/${orderId}`, method: 'get' })
// 获取订单列表
export const reqOrderList = (page, limit) => requests({ url: `/order/auth/${page}/${limit}`, method: 'get' })
