<template>
  <div>
    <Header></Header>
    <router-view></router-view>
    <Footer v-if="$route.meta.show"></Footer>
  </div>
</template>

<script>
import Header from '@/components/Header/sv-header'
import Footer from '@/components/Footer/sv-footer'
export default {
  components: {
    Header,
    Footer
  },
  mounted () {
    this.$store.dispatch('categoryList')
  }
}
</script>

<style lang="less" scoped>

</style>
