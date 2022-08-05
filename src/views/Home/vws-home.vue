<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <TodayRecommend></TodayRecommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="(floor,index) in floorList" :key="floor.id" :list="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/views/Home/ListContainer/ListContainer'
import Floor from '@/views/Home/Floor/Floor'
import Like from '@/views/Home/Like/Like'
import Rank from '@/views/Home/Rank/Rank'
import TodayRecommend from '@/views/Home/TodayRecommend/TodayRecommend'
import Brand from '@/views/Home/Brand/Brand'
import { mapState } from 'vuex'

export default {
  components: {
    ListContainer,
    Floor,
    Like,
    Rank,
    TodayRecommend,
    Brand
  },
  mounted () {
    // 派发action，将floor组件数据从服务器存到vuex
    this.$store.dispatch('getFloorList')
  },
  computed: {
    ...mapState({
      floorList: state => state.home.floorList
    })
  }

}
</script>

<style lang="less" scoped>

</style>
