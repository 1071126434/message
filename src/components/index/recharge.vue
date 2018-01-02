<template>
  <div>
    <div class="recharge" v-if="pay==1">
      <div class="nav">
        <span @click="$router.push({name: 'index'})">首页</span>
        <strong>></strong>
        <b>充值</b>
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
            <el-button type="primary" @click="pay=2">充 值</el-button>
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
    <div class="pay" v-if="pay==2">
      <div class="nav">
        <span @click="$router.push({name: 'index'})">首页</span>
        <strong>></strong>
        <span @click="pay=1">充值</span>
        <strong>></strong>
        <b>支付</b>
      </div>
      <div class="cont">
        <h2>支付</h2>
        <div v-if="0">
          <div class="title">
            <strong>充值：</strong>
            <span>抱一云信充值服务</span>
            <strong>账单编号：</strong>
            <span>hhj45612314563</span>
            <strong>收款方：</strong>
            <span>抱一有限公司</span>
          </div>
          <ul class="rCode">
            <li>扫一扫付款(元)</li>
            <li class="orange">30.00</li>
            <li><img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1514871183923&di=ceddf49f16c776c0410320e888617108&imgtype=0&src=http%3A%2F%2Fpic87.nipic.com%2Ffile%2F20160113%2F9636300_092658115154_2.jpg" alt=""></li>
          </ul>
        </div>
        <div v-if="1" class="success">
          <span>充值成功，
            <strong>5</strong>秒后返回
            <b @click="$router.push({name: 'index'})">首页</b>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'recharge',
  data () {
    return {
      rechargeNum: '',
      pay: 1
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
.pay
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
    .title
      padding 20px
      font-size 14px
      color #525F75
      line-height 1
      span
        margin-right 100px
    .rCode
      padding 30px 0
      border 1px solid #E8EBF0
      margin 30px 20px
      font-size 16px
      color #525F75
      text-align center
      .orange
        font-size 28px
        font-weight bold
        color #FF9F00
        line-height 1
        margin-top 8px
        margin-bottom 25px
      img
        width 178px
        height 244px
    .success
      padding 160px 0
      text-align center
      font-size 20px
      color #4A566D
      strong
        color #FD9908
        font-weight bold
      b
        color #3EAFFF
        cursor pointer
</style>