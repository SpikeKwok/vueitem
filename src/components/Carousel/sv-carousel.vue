<template>
  <div class="swiper-container" ref="floor2Swiper">
    <div class="swiper-wrapper">
      <!-- list一定是对象数组 -->
      <div class="swiper-slide" v-for="(Carousel, index) in list" :key="Carousel.id">
        <img :src="Carousel.imgUrl">
      </div>

    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  name: 'sv-carousel',
  props: ['list'],
  watch: {
    list: {
      // 监听list的数据变化，但list是父组件给的数据，在carousel全局组件中没有变过，为了使函数执行一次，使用immediately
      immediate: true,
      handler () {
        this.$nextTick(() => {
          const floor2Swiper = new Swiper(this.$refs.floor2Swiper, {
            // direction: 'vertical', // 垂直切换选项
            loop: true, // 循环模式选项

            // 如果需要分页器
            pagination: {
              el: '.swiper-pagination',
              clickable: true
            },

            // 如果需要前进后退按钮
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            }

            // 如果需要滚动条
            // scrollbar: {
            //   el: '.swiper-scrollbar',
            // },
          })
        })
      }
    }
  }
}
</script>

<style scoped>
</style>
