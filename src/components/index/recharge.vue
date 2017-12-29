<template>
  <div class="recharge">
    <div class="nav">
      <span @click="$router.push({name: 'index'})">首页</span>
      <strong>></strong>
      <b>收费标准</b>
    </div>
    <div class="cont">
      <h2>充值</h2>
      <ul class="list">
        <li>
          <span>余额：</span>
          <strong>￥30.00</strong>
        </li>
        <li>
          <span>充值金额：</span>
          <el-input v-model="rechargeNum" style="width: 88px;"></el-input>
          <b>元</b>
        </li>
        <li>
          <span>支付方式：</span>
          <img src="../../assets/images/payImg.svg" alt="pay">
        </li>
        <li class="elbtn">
          <span></span>
          <el-button type="primary">充 值</el-button>
        </li>
        <li>
          <a>
            温馨提示：
            <br /> 1、仅支持支付宝方式充值。
            <br /> 2、如您有未结清账单，充值后优先抵扣未结清账单。
            <br /> 3、充值后请及时对支付订单进行结算，以免影响正常服务。
          </a>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'recharge',
  data () {
    return {
      rechargeNum: ''
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.recharge
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
    min-height 600px
    h2
      font-size 16px
      color #525F75
      font-weight bold
      line-height 40px
      padding-left 20px
      box-shadow 0 1px 0 #E8EBF0
    .list
      padding 16px 24px
      li
        height 40px
        line-height 40px
        font-size 14px
        color #525F75
        margin 10px 0
        img
          width 60px
          vertical-align middle
        span
          display inline-block
          min-width 70px
          margin-right 44px
        strong
          color #40B6FF
          font-weight bold
        b
          margin-left 10px
        a
          display inline-block
          margin-left 114px
          line-height 20px
      .elbtn
        margin-top 40px
</style>