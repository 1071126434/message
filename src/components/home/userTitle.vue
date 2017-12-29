<template>
  <div class="userTitle">
    <div class="cont">
      <span class="record">
        <i class="el-icon-circle-check-outline"></i>
        <strong>已认证</strong>
      </span>
      <span class="record" v-if="0">
        <i class="el-icon-remove-outline"></i>
        <strong>未认证</strong>
      </span>
      <b class="head">
        Y
      </b>
      <a class="el-icon-arrow-down"></a>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'userTitle',
  data () {
    return {
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userTitle
  height 60px
  font-size 12px
  background white
  .cont
    float right
    line-height 100%
    width 150px
    height 100%
    text-align right
    padding-right 30px
    .record
      line-height 60px
      margin-right 24px
    .head
      display inline-block
      width 19px
      height 19px
      border 1px solid #000000
      border-radius 50%
      background #000000
      line-height 20px
      text-align center
      color #ffffff
      font-weight bold
    a
      cursor pointer
</style>