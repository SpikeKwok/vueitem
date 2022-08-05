<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <!-- 选项标题栏 -->
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
        <!-- 商品v-for -->
      <div class="cart-body">
        <ul class="cart-list" v-for="(cartInfoList,index) in cartInfoList" :key="cartInfoList.id">
          <li class="cart-list-con1">
            <!-- 商品复选框 -->
            <input type="checkbox" name="chk_list" :checked="cartInfoList.isChecked == 1 " @click="updateCheckedById(cartInfoList,$event)">
          </li>
          <li class="cart-list-con2">
            <img :src=cartInfoList.imgUrl>
            <div class="item-msg">{{cartInfoList.skuName}}</div>
          </li>
          <li class="cart-list-con4">
            <span class="price">{{cartInfoList.skuPrice}}</span>
          </li>
          <li class="cart-list-con5">
            <!-- 商品数量操作 -->
            <a href="javascript:void(0)" class="mins" @click="handler('minus',-1,cartInfoList)" >-</a>
            <input autocomplete="off" type="text" minnum="1" class="itxt" :value="cartInfoList.skuNum" @change="handler('change',$event.target.value*1,cartInfoList)">
            <a href="javascript:void(0)" class="plus" @click="handler('add',1,cartInfoList)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{cartInfoList.skuNum * cartInfoList.skuPrice}}</span>
          </li>
          <li class="cart-list-con7">
            <a  class="sindelet" @click="deleteCartListById(cartInfoList)">删除</a>
            <br>
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <!-- 底部选项 -->
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" :checked="isAllChecked&&cartInfoList.length>0" @click="updateAllCartChecked">
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAllCheckedCart">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">已选择
          <span>0</span>件商品</div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{totalPrice}}</i>
        </div>
        <div class="sumbtn">
          <router-link class="sum-btn" to="/trade">结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import throttle from 'lodash/throttle'
export default {
  name: 'vws-ShopCart',
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      this.$store.dispatch('getCartList')
    },
    // 修改某一个商品的个数
    handler: throttle(async function (type, disNum, cart) {
      // type:区分这三个动作
      // disNum:变化量（+1，-1）。input内的是最终的数量，并不是变化量，需要处理
      // cartId:商品id，
      // 向服务器发请求修改数量
      switch (type) {
      case 'add':
        // disNum = 1
        break
      case 'minus':
        // 减法要判断商品个数要大于1,小于1则赋值为0，传递给服务器
        // 老师写法：
        // disNum = cart.skuNum > 1 ? -1 : 0
        if (cart.skuNum <= 1) {
          disNum = 0
        }
        break
      case 'change':
        // 如果用户输入的是非法的，或者小于1的，则置0
        if (isNaN(disNum) || disNum < 1) {
          disNum = 0
        } else {
        // 输入的是数字但不是整数，取整
          disNum = parseInt(disNum) - cart.skuNum
        }
        break
      }
      try {
        // 代表修改成功
        await this.$store.dispatch('addOrUpdateShopCart', { skuId: cart.skuId, skuNum: disNum })
        this.getData()
      } catch (error) {
      }
    }, 1000),
    // 删除商品请求发给服务器,更新数据
    async deleteCartListById (cart) {
      try {
        // 若成功再发请求获取新数据
        await this.$store.dispatch('deleteCartListById', cart.skuId)
        this.getData()
      } catch (error) {
        // 失败则弹出
        alert(error.message)
      }
    },
    // 复选框数据发给服务器，更新数据
    async updateCheckedById (cart, event) {
      // 带给服务器的参数isChecked是数字0和1，但标签checked是布尔值
      try {
        // 若成功再发请求获取新数据
        const isChecked = event.target.checked ? '1' : '0'
        await this.$store.dispatch('updateCheckedById', { skuId: cart.skuId, isChecked })
        this.getData()
      } catch (error) {
        // 失败则弹出
        alert('faile')
      }
    },
    // 批量删除选中的商品
    async deleteAllCheckedCart () {
      try {
        await this.$store.dispatch('deleteAllCheckedCart')
        // 成功则再更新数据发请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    },
    // 修改全部商品选中状态
    async updateAllCartChecked (e) {
      const isChecked = e.target.checked ? 1 : 0
      try {
        await this.$store.dispatch('updateAllCartChecked', isChecked)
        // 成功则再更新数据发请求
        this.getData()
      } catch (error) {
        alert(error.message)
      }
    }
  },
  computed: {
    ...mapGetters(['cartList']),
    cartInfoList () {
      return this.cartList.cartInfoList || []
    },
    // 计算商品总价
    totalPrice () {
      let sum = 0
      this.cartInfoList.forEach(item => {
        sum += item.skuNum * item.skuPrice
      })
      return sum
    },
    // 全选的遍历
    isAllChecked () {
      // 遍历数组元素，一假则假
      return this.cartInfoList.every(item => item.isChecked === 1)
    }
  }
}
</script>

<style lang="less" scoped>
  .cart {
    width: 1200px;
    margin: 0 auto;

    h4 {
      margin: 9px 0;
      font-size: 14px;
      line-height: 21px;
    }

    .cart-main {
      .cart-th {
        background: #f5f5f5;
        border: 1px solid #ddd;
        padding: 10px;
        overflow: hidden;

        &>div {
          float: left;
        }

        .cart-th1 {
          width: 25%;

          input {
            vertical-align: middle;
          }

          span {
            vertical-align: middle;
          }
        }

        .cart-th2 {
          width: 25%;
        }

        .cart-th3,
        .cart-th4,
        .cart-th5,
        .cart-th6 {
          width: 12.5%;

        }
      }

      .cart-body {
        margin: 15px 0;
        border: 1px solid #ddd;

        .cart-list {
          padding: 10px;
          border-bottom: 1px solid #ddd;
          overflow: hidden;

          &>li {
            float: left;
          }

          .cart-list-con1 {
            width: 15%;
          }

          .cart-list-con2 {
            width: 35%;

            img {
              width: 82px;
              height: 82px;
              float: left;
            }

            .item-msg {
              float: left;
              width: 150px;
              margin: 0 10px;
              line-height: 18px;
            }
          }

          .cart-list-con4 {
            width: 10%;

          }

          .cart-list-con5 {
            width: 17%;

            .mins {
              border: 1px solid #ddd;
              border-right: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }

            input {
              border: 1px solid #ddd;
              width: 40px;
              height: 33px;
              float: left;
              text-align: center;
              font-size: 14px;
            }

            .plus {
              border: 1px solid #ddd;
              border-left: 0;
              float: left;
              color: #666;
              width: 6px;
              text-align: center;
              padding: 8px;
            }
          }

          .cart-list-con6 {
            width: 10%;

            .sum {
              font-size: 16px;
            }
          }

          .cart-list-con7 {
            width: 13;

            a {
              color: #666;
            }
          }
        }
      }
    }

    .cart-tool {
      overflow: hidden;
      border: 1px solid #ddd;

      .select-all {
        padding: 10px;
        overflow: hidden;
        float: left;

        span {
          vertical-align: middle;
        }

        input {
          vertical-align: middle;
        }
      }

      .option {
        padding: 10px;
        overflow: hidden;
        float: left;

        a {
          float: left;
          padding: 0 10px;
          color: #666;
        }
      }

      .money-box {
        float: right;

        .chosed {
          line-height: 26px;
          float: left;
          padding: 0 10px;
        }

        .sumprice {
          width: 200px;
          line-height: 22px;
          float: left;
          padding: 0 10px;

          .summoney {
            color: #c81623;
            font-size: 16px;
          }
        }

        .sumbtn {
          float: right;

          a {
            display: block;
            position: relative;
            width: 96px;
            height: 52px;
            line-height: 52px;
            color: #fff;
            text-align: center;
            font-size: 18px;
            font-family: "Microsoft YaHei";
            background: #e1251b;
            overflow: hidden;
          }
        }
      }
    }
  }
</style>
