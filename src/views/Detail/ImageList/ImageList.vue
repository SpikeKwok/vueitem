<template>
  <div class="swiper-container" ref="cur">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="(slide,index ) in skuImageList" :key="slide.id">
        <img :src="slide.imgUrl" :class="{active:currentIndex == index}" @click="changeCurrentIndex(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
export default {
  data () {
    return {
      // 默认下标为零的图片有边框css样式
      currentIndex: 0
    }
  },
  name: 'ImageList',
  props: ['skuImageList'],
  watch: {
    skuImageList () {
      this.$nextTick(() => {
        const mySwiper = new Swiper(this.$refs.cur, {
          // loop: true, // 循环模式选项
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
          },
          slidesPerView: 2, // 'auto'
          // slidesPerView : 3.7,
          // 如果设置为auto（例如制作全屏展示时的页脚部分），最后一个slide在键盘或鼠标滚动时可能会直接跳到倒数第三个slide，
          // 此时可以手动设置activeIndex解决，如下
          // onTransitionEnd: function (swiper) {
          slidesPerGroup: 2
          // slidesPerGroup 在carousel mode下定义slides的数量多少为一组。
        })
      })
    }
  },
  methods: {
    changeCurrentIndex (index) {
      this.currentIndex = index
      this.$buss.$emit('getIndex', index)
    }
  }
}
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }

      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>
