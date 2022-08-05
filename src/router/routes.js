import Home from '@/views/Home/vws-home'
import Register from '@/views/Register/vws-register'
import Search from '@/views/Search/vws-search'
import Login from '@/views/Login/vws-login'
import Detail from '@/views/Detail/vws-detail'
import AddCartSuccess from '@/views/AddCartSuccess/vws-addCartSuccess'
import ShopCart from '@/views/ShopCart/vws-ShopCart'
import Trade from '@/views/Trade/vws-trade'
import Pay from '@/views/Pay/vws-pay'
import PaySuccess from '@/views/PaySuccess/vws-PaySuccess'
import Center from '@/views/Center/vws-center'
import MyOrder from '@/views/Center/myOrder/vws-myOrder'
import GroupOrder from '@/views/Center/groupOrder/vws-groupOrder'
export default [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: Home,
    meta: { show: true }
  },
  {
    path: '/search/:keyword?',
    component: Search,
    meta: { show: true },
    name: 'search'

  },
  {
    path: '/register',
    component: Register,
    meta: { show: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { show: false }
  },
  {
    path: '/detail/:skuid?',
    component: Detail

  },
  {
    path: '/addcartsuccess',
    name: 'AddCartSuccess',
    component: AddCartSuccess
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart
  },
  {
    path: '/trade',

    component: Trade,
    beforeEnter: (to, from, next) => {
      if (from.path === '/shopcart') {
        next()
      } else {
        next(to.path)
      }
    }
  },
  {
    path: '/pay',
    name: 'Pay',
    component: Pay,
    beforeEnter: (to, from, next) => {
      if (from.path === '/trade') {
        next()
      } else {
        next(to.path)
      }
    }

  },
  {
    path: '/paysuccess',
    name: 'PaySuccess',
    component: PaySuccess

  },
  {
    path: '/center',
    name: 'Center',
    component: Center,
    redirect: '/center/myorder',
    children: [
      {
        path: 'myorder',
        component: MyOrder
      },
      {
        path: 'grouporder',
        component: GroupOrder
      }
    ]
  }

]
