<template>
  <div class="help">
    <h2>帮助文档</h2>
    <div class="cont">
      <div class="nav">
        <span v-for="(m, i) in navArr" @click="change(i)" :key="i" :class="{ 'actives':  active==i}">{{ m.title }}</span>
      </div>
      <div class="detail" v-for="(item, index) in navArr" :key="index" v-if="active==index">
        <div v-for="(h3item, ih3) in item.contArr" :key="ih3">
          <h4>{{ h3item.h3Title }}</h4>
          <div class="intro" v-for="(h4item, ih4) in h3item.h3Arr" :key="ih4">
            <h5>{{ h4item.h4Title }}</h5>
            <p>{{ h4item.cont }}</p>
            <p class="orange" v-if="h4item.ege">{{ h4item.ege }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'help',
  props: {
    active: {
      type: Number,
      default: 0
    },
    navArr: {
      type: Array,
      default: [{
        title: '',
        contArr: [{
          h3Title: '',
          h3Arr: [{
            h4Title: '',
            cont: ''
          }]
        }]
      }]
    }
  },
  data () {
    return {
    }
  },
  methods: {
    change (i) {
      this.$emit('change', i)
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.help
  margin 16px 20px
  min-height 600px
  background #ffffff
  h2
    font-size 16px
    color #525F75
    font-weight bold
    padding 0 20px
    line-height 40px
    box-shadow 0 1px 0 #E8EBF0
  .cont
    padding 20px
    .nav
      span
        cursor pointer
        line-height 32px
        height 32px
        display inline-block
        padding 0 16px
        background rgba(64, 182, 255, 0.2)
        font-size 14px
        font-weight bold
        color #40B6FF
        margin-right 4px
      .actives
        background #40B6FF
        color #ffffff
    .detail>div
      margin-top 32px
      h4
        font-size 20px
        color #525F75
        font-weight bold
        line-height 1
        margin-bottom 20px
      h5
        font-size 14px
        color #525F75
        line-height 1
        margin-bottom 12px
        font-weight bolder
        margin-top 20px
      p
        font-size 12px
        line-height 16px
        color #525F75
        margin-bottom 10px
      .orange
        color #FF9F00
</style>