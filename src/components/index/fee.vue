<template>
  <div class="fee">
    <div class="nav">
      <span @click="$router.push({name: 'index'})">首页</span>
      <strong>></strong>
      <b>收费标准</b>
    </div>
    <div class="cont">
      <h2>收费标准</h2>
      <div class="list" v-for="(item, index) in rulesArr" :key="index">
        <div class="title">
          {{ item.title }}
        </div>
        <p>
          {{ item.payIntro1 }}
          <strong>0.045元/条</strong>
          {{ item.payIntro2 }}
        </p>
        <el-table :data="item.marketArr" class="border" style="width: 100%;border: 1px solid #C0CCDA">
          <el-table-column prop="userNum" label="短信使用量阶梯(月/条)" align="center">
          </el-table-column>
          <el-table-column prop="lev1" label="10万≤量≤20万" align="center">
          </el-table-column>
          <el-table-column prop="lev2" label="20万≤量≤30万" align="center">
          </el-table-column>
          <el-table-column prop="lev3" label="30万≤量≤50万" align="center">
          </el-table-column>
          <el-table-column prop="lev4" label="50万≤量≤100万" align="center">
          </el-table-column>
          <el-table-column prop="lev5" label="100万≤量" align="center">
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'fee',
  data () {
    return {
      rulesArr: [{
        title: '营销短信',
        payIntro1: '营销短信收费标准为',
        feeRules: '0.045',
        payIntro2: '，同时平台推出优惠活动，按阶梯进行优惠，详情如下表：用于发送营销推广类短信，如会员关怀、新品上线、活动通知等',
        marketArr: [{
          userNum: '优惠(元 / 条)',
          lev1: '-0.001',
          lev2: '-0.002',
          lev3: '-0.003',
          lev4: '-0.004',
          lev5: '-0.005'
        }]
      }, {
        title: '验证码短信',
        payIntro1: '验证码短信收费标准为',
        feeRules: '0.045',
        payIntro2: '，同时平台推出优惠活动，按阶梯进行优惠，详情如下表：用于发送验证码类短信，如登录验证、支付确认、登录异常等',
        marketArr: [{
          userNum: '优惠(元 / 条)',
          lev1: '-0.001',
          lev2: '-0.002',
          lev3: '-0.003',
          lev4: '-0.004',
          lev5: '-0.005'
        }]
      }, {
        title: '通知短信',
        payIntro1: '通知短信收费标准为',
        feeRules: '0.045',
        payIntro2: '，同时平台推出优惠活动，按阶梯进行优惠，详情如下表：用于发送系统通知类短信，如物流通知、付款回执、状态通知等',
        marketArr: [{
          userNum: '优惠(元 / 条)',
          lev1: '-0.001',
          lev2: '-0.002',
          lev3: '-0.003',
          lev4: '-0.004',
          lev5: '-0.005'
        }]
      }, {
        title: '效果追踪短信',
        payIntro1: '效果追踪短信收费（包含服务费）标准为',
        feeRules: '0.045',
        payIntro2: '，同时平台推出优惠活动，按阶梯进行优惠，详情如下表：用于查看营销短信中的链接被用户打开情况',
        marketArr: [{
          userNum: '优惠(元 / 条)',
          lev1: '-0.001',
          lev2: '-0.002',
          lev3: '-0.003',
          lev4: '-0.004',
          lev5: '-0.005'
        }]
      }]
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.fee
  padding 16px
  .nav
    font-size 12px
    color #525F75
    line-height 1
    margin-bottom 16px
    span
      &:hover
        cursor pointer
        color #40B6FF
  .cont
    background #ffffff
    padding-bottom 80px
    h2
      font-size 16px
      color #525F75
      font-weight bold
      line-height 40px
      padding-left 20px
      box-shadow 0 1px 0 #E8EBF0
    .list
      padding 20px
      .title
        background rgba(64, 182, 255, 0.2)
        display inline-block
        text-align center
        font-weight 600
        min-width 150px
        border-radius 16px
        height 32px
        line-height 32px
        font-size 14px
        color #40B6FF
      p
        font-size 12px
        margin-top 20px
        margin-bottom 10px
        color #414C62
        strong
          color #FB203A
</style>