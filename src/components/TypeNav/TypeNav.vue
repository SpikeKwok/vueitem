<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
      <div @mouseleave="leaveIndex" @mouseenter="enterShow">
        <h2 class="all">全部商品分类</h2>
        <!-- 过渡动画标签 -->
        <transition name="sort">
          <div class="sort" v-show="show">
            <div class="all-sort-list2" @click="goSearch">
              <div class="item" v-for="(c1, index) in categoryList" :key="c1.categoryId" :class="{cur:currentIndex == index}" @mouseenter="changeIndex(index)">
                <h3>
                  <a :data-categoryName="c1.categoryName" :data-category1Id="c1.categoryId">{{c1.categoryName}}</a>
                </h3>
                <!-- 二级，三级菜单 -->
                <div class="item-list clearfix" :style="{display:currentIndex == index?'block': 'none'}">
                  <div class="subitem" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                    <dl class="fore">
                      <dt>
                        <a :data-categoryName="c2.categoryName" :data-category2Id="c2.categoryId">{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <a :data-categoryName="c3.categoryName" :data-category3Id="c3.categoryId">{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>
      </div>
      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>

    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

// 这是把lodash所有功能都引入，不够轻量
// import _ from 'lodash'
// console.log(_)查看是否引入成功

// lodash用什么引什么：
import throttle from 'lodash/throttle'

export default {
  name: 'TypeNav',
  data () {
    return {
      currentIndex: -1,
      show: true
    }
  },
  // 组件挂载完毕就可以向服务器发请求
  mounted () {
    // 放到路由根组件中，不然home和search频繁请求列表数据，浪费资源
    // this.$store.dispatch('categoryList')
    // 当组件挂载完毕，让show的属性变为false
    // 如果不是home组件，则将typeNav隐藏
    if (this.$route.path !== '/home') {
      this.show = false
    }
  },
  computed: {
    ...mapState({
      // 当使用这个计算属性时，右侧函数会立即执行一次，函数中的state参数就是大仓库中的数据
      categoryList: state => {
        // console.log(state)// home小仓库, search小仓库
        return state.home.categoryList // 返回一个数组
      }
    })
  },
  methods: {
    // es6的写法，没法用lodash_.的方法
    // changeIndex (index) {
    //   // console.log(index)
    //   this.currentIndex = index
    // },
    // 改为es5写法：
    changeIndex: throttle(function (index) {
      this.currentIndex = index
    }, 50),

    // 1.事件委派加在父盒子上
    goSearch (e) {
      // 2.自定义属性先区分出点击的a标签
      // e.target是获取到当前触发这个事件的节点（h3,dl,em....）
      const element = e.target
      // 但是我需要带有属性名为data-categoryName的节点【一定是a标签】怎么拿？
      // 节点有一个属性dataset属性，他能获取到节点的自定义属性和属性值
      // 把类名解构出来(注意小写，浏览器自动小写)
      const { categoryname, category1id, category2id, category3id } = element.dataset
      if (categoryname) {
        // 3.现在已经知道是a标签，但如何知道是几级标签呢？
        // 整理一下要发送的数据 { name: 'search' , query不确定，还要再区分是几级id }
        const location = { name: 'search' }
        // 数据名属性都叫categoryname，可以直接写入，不用区分
        const query = { categoryName: categoryname }
        if (category1id) {
          query.category1Id = category1id
        } else if (category2id) {
          query.category2Id = category2id
        } else if (category3id) {
          query.category3Id = category3id
        }
        // 测试两个对象
        // console.log(location, query)
        // 判断：如果路由跳转时候，有params参数，则一并传过去
        if (this.$route.params) {
          location.params = this.$route.params
          // 现在是两个对象，需要合并
          location.query = query
          // 然后跳转传参
          this.$router.push(location)
        }
      }
    },
    // 鼠标进入则显示菜单
    enterShow () {
      if (this.$route.path !== '/home') {
        this.show = true
      }
    },
    // 鼠标离开顶部红色菜单，背景颜色才能消失
    // 控制search中菜单的显示与隐藏，而在home不能被影响，操作一并写在这一个回调内
    leaveIndex () {
      this.currentIndex = -1
      if (this.$route.path !== '/home') {
        this.show = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {

    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          cursor: pointer;
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 415px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }
        }
      }
    }

    .sort-enter{
      height: 0;
    }
    .sort-enter-to{
      height: 461px;
    }
    .sort-enter-active{
      transition: all 0.1s linear;
    }
    .sort-leave{
      height: 461px;
    }
    .sort-leave-to{
      height: 0px;
    }
    .sort-leave-active{
      transition: all 0.1s linear;
    }

  }
}
.cur {
  background-color: skyblue;
}
</style>
