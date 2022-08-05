<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName" >{{searchParams.categoryName}}<i @click="removeCategoryName">×</i></li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword" >{{searchParams.keyword}}<i @click="removeKeyword">×</i></li>
            <!-- 品牌面包屑 -->
            <li class="with-x" v-if="searchParams.trademark" >{{searchParams.trademark.split(':')[1]}}<i @click="removeTradeMark">×</i></li>
            <!-- 商品属性面包屑 -->
            <li class="with-x" v-for="(attrValue,index) in searchParams.props" :key="index">{{attrValue.split(':')[1]}}<i @click="removeAttr(index)">×</i></li>

          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <!-- 商品排序 -->
                <li :class="{active:isOne}" @click="changeOrder('1')">
                  <a >综合<span class="iconfont" v-show="isOne" :class="{'icon-jiantou_xiangshang':isAsc ,'icon-jiantou_xiangxia':isDesc}"></span></a>
                </li>

                <li :class="{active:isTwo}" @click="changeOrder('2')">
                  <a >价格<span class="iconfont" v-show="isTwo" :class="{'icon-jiantou_xiangshang':isAsc ,'icon-jiantou_xiangxia':isDesc}" ></span></a>
                </li>

              </ul>
            </div>
          </div>
          <!-- 商品显示 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="(goods, index) in goodsList" :key="goods.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link target="_blank" :to="`/detail/${goods.id}`"><img v-lazy="goods.defaultImg" /></router-link >
                  </div>
                  <div class="price">
                    <strong>
                      <i>{{'￥'+goods.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠，火爆销售中">{{goods.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>

            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 测试分页器的数据，将来要替换为search中的数据 -->
          <sv-pagenation :total="180" :pageSize="pageSize" :pageNo="pageNo" :continues="5" @getPageNo="getPageNo"></sv-pagenation>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { mapGetters, mapState } from 'vuex'
import SearchSelector from './SearchSelector/SearchSelector'
export default {
  name: 'vws-search',
  data () {
    return {
      // 带给服务器的参数，请求中参数直接写的空对象
      searchParams: {
        category1Id: '', // 三级菜单
        category2Id: '',
        category3Id: '',
        categoryName: '', // 菜单中选中的名字
        keyword: '', // 搜索输入框中的关键字
        order: '1:desc', // 先写个默认值
        props: [], // 平台售卖属性的参数，就是search页面中的菜单
        trademark: '', // search页面中菜单中的品牌
        pageNo: 1 // 分页器用的，代表当前在第几页，默认第一页
        // pageSize: '', // 代表每一页有多少数据
        // total: '' // 全部有多少数据
        // totalPages: '' // 连续页数5

      }

    }
  },
  beforeMount () {
    // 笨写法
    // this.searchParams.category1Id = this.$route.query.category1Id
    // es6新增objec.assign合并参数
    Object.assign(this.searchParams, this.$route.query, this.$route.params)
  },
  mounted () {
    // 目前把请求放在mounted中，所以在home中时请求只能发一次，到了search组件就不能再发请求了
    this.getData()
  },
  methods: {
    // Search组件会多次，不同位置获取数据，把它封装成一个函数，需要获取数据时调用即可
    getData () {
      this.$store.dispatch('getSearchList', this.searchParams)
    },
    // 面包屑，删除菜单分类
    removeCategoryName () {
      this.searchParams.categoryName = undefined
      this.searchParams.category1Id = undefined
      this.searchParams.category2Id = undefined
      this.searchParams.category3Id = undefined
      this.getData()
      // 地址栏也要改变：自己跳自己,搜索关键字不能消失，加个判断
      if (this.$route.params) {
        this.$router.push({ name: 'search', params: this.$route.params })
      }
    },
    // 删除关键字面包屑
    removeKeyword () {
      this.searchParams.keyword = undefined
      // 在main中指定事件总线对象，在这里使用emit数据
      this.$buss.$emit('clear')
      // 地址栏也要改变：自己跳自己,类名不能消失，加个判断，严谨
      if (this.$route.query) {
        this.$router.push({ name: 'search', query: this.$route.query })
      }
    },
    // 品牌面包屑，移除品牌面包屑
    trademarkInfo (trademark) {
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
      // this.searchParams.trademark = trademark.tmName,不写成固定形式，后端数据库不识别，商品就不能更新
      this.getData()
    },
    removeTradeMark () {
      this.searchParams.trademark = undefined
      this.getData()
    },
    // 商品属性的面包屑，移除
    attrInfo (attr, attrValue) {
      // this.searchParams.props = [`${attr.attrId}:${attrValue}:${attr.attrName}`]这样写有问题，选择多个属性时，数组只替换不能添加
      // 注意：props是一个数组，示例: ["2:6.0～6.24英寸:屏幕尺寸"], id：值：名
      const props = `${attr.attrId}:${attrValue}:${attr.attrName}`
      // 加一个数组去重判断，解决重复的问题
      if (this.searchParams.props.indexOf(props) === -1) this.searchParams.props.push(props)
      this.getData()
    },
    removeAttr (index) {
      // console.log(index)
      this.searchParams.props.splice(index, 1)
      this.getData()
    },
    // 改变排序的点击事件
    changeOrder (flag) {
      // flag是一个标记，区分用户点击的是综合还是价格
      const originOrder = this.searchParams.order
      // 获取最开始的状态
      const originFlag = originOrder.split(':')[0]
      const originSort = originOrder.split(':')[1]
      // 准备一个新的order属性值
      let newOrder = ''
      if (flag === originFlag) {
        newOrder = `${originFlag}:${originSort === 'desc' ? 'asc' : 'desc'}`
      } else {
        // 若点击另一个标签，则这样判断
        newOrder = `${flag}:${'desc'}`
      }
      this.searchParams.order = newOrder
      this.getData()
    },
    getPageNo (pageNo) {
      this.searchParams.pageNo = pageNo
      this.getData()
    }

  },
  computed: {
    ...mapGetters(['goodsList']),
    ...mapState({
      total: function (state) {
        return state.search.searchList.total
      },
      totalPages: function (state) {
        return state.search.searchList.totalPages
      },
      pageSize: function (state) {
        return state.search.searchList.pageSize
      },
      pageNo: function (state) {
        return state.search.searchList.pageNo
      }
    }),
    // 判断排序的计算属性
    isOne () {
      return this.searchParams.order.indexOf('1') !== -1
    },
    isTwo () {
      return this.searchParams.order.indexOf('2') !== -1
    },
    isAsc () {
      return this.searchParams.order.indexOf('asc') !== -1
    },
    isDesc () {
      return this.searchParams.order.indexOf('desc') !== -1
    }
  },
  components: {
    SearchSelector
  },
  watch: {
    $route: {
      handler () {
        Object.assign(this.searchParams, this.$route.params, this.$route.query)
        this.getData()
        this.searchParams.category1Id = ''
        this.searchParams.category2Id = ''
        this.searchParams.category3Id = ''
      }
    }
  }
}
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .sui-navbar {
        overflow: visible;
        margin-bottom: 0;

        .filter {
          min-height: 40px;
          padding-right: 20px;
          background: #fbfbfb;
          border: 1px solid #e2e2e2;
          padding-left: 0;
          border-radius: 0;
          box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

          .sui-nav {
            position: relative;
            left: 0;
            display: block;
            float: left;
            margin: 0 10px 0 0;

            li {
              float: left;
              line-height: 18px;

              a {
                display: block;
                cursor: pointer;
                padding: 11px 15px;
                color: #777;
                text-decoration: none;
              }

              &.active {
                a {
                  background: #e1251b;
                  color: #fff;
                }
              }
            }
          }
        }
      }

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .commit {
                padding-left: 15px;
                height: 22px;
                font-size: 13px;
                color: #a7a7a7;

                span {
                  font-weight: 700;
                  color: #646fb0;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }

      .page {
        width: 733px;
        height: 66px;
        overflow: hidden;
        float: right;

        .sui-pagination {
          margin: 18px 0;

          ul {
            margin-left: 0;
            margin-bottom: 0;
            vertical-align: middle;
            width: 490px;
            float: left;

            li {
              line-height: 18px;
              display: inline-block;

              a {
                position: relative;
                float: left;
                line-height: 18px;
                text-decoration: none;
                background-color: #fff;
                border: 1px solid #e0e9ee;
                margin-left: -1px;
                font-size: 14px;
                padding: 9px 18px;
                color: #333;
              }

              &.active {
                a {
                  background-color: #fff;
                  color: #e1251b;
                  border-color: #fff;
                  cursor: default;
                }
              }

              &.prev {
                a {
                  background-color: #fafafa;
                }
              }

              &.disabled {
                a {
                  color: #999;
                  cursor: default;
                }
              }

              &.dotted {
                span {
                  margin-left: -1px;
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  font-size: 14px;
                  border: 0;
                  padding: 9px 18px;
                  color: #333;
                }
              }

              &.next {
                a {
                  background-color: #fafafa;
                }
              }
            }
          }

          div {
            color: #333;
            font-size: 14px;
            float: right;
            width: 241px;
          }
        }
      }
    }
  }
}
</style>
