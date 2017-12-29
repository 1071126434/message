<template>
  <div class="home">
    <div class="left">
      <navBar></navBar>
    </div>
    <div class="right">
      <div class="rTop">
        <userTitle></userTitle>
      </div>
      <div class="rCont">
        <router-view/>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import NavBar from './navBar'
import UserTitle from './userTitle'
export default {
  name: 'home',
  components: {
    NavBar,
    UserTitle
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.home
  height 100%
  overflow hidden
  display flex
  flex 1
  background #E8EBF0
  .left
    width 180px
    min-width 180px
    height 100%
    background #19223D
  .right
    flex 1
    display flex
    flex-direction column
    .rTop
      height 60px
      background #ffffff
    .rCont
      flex 1
      overflow auto
</style>