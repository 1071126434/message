<template>
  <div class="userGuider">
    <h2>用户指南</h2>
    <div class="cont">
      <div class="nav">
        <span v-for="(item, index) in navArr" :class="{ 'actives': active==index }" :key="index" @click="active=index">{{ item }}</span>
      </div>
      <div class="detail" v-show="active==0">
        <div>
          <h4>签名是什么</h4>
          <p>·短信签名是为客户提供一种快捷、方便的个性化签名方式。当客户发送短信时，短信平台会根据客户的设置，在短信内容里附加个性化签名，再发送给被叫手机客户。
            <br />·签名示例</p>
          <p class="orange">
            入驻企业为：阿里巴巴网络技术有限公司
            <br />可以提交的签名为：【阿里巴巴】
            <br />或者可以提交自己公司旗下的产品签名：【淘宝网】
          </p>
          <h4>创建签名</h4>
          <p>
            ·通过控制台左侧导航，点击“签名与模板管理-签名管理”，进入签名管理页
            <br />·点击左上角“创建短信签名”进入创建签名页，根据用途上传相应证明材料
          </p>
          <h4>请根据短信的用途正确选择签名类型，避免申请被驳回</h4>
          <p>
            1.系统短信：用于发送验证码类短信／系统通知类短信，如登录验证、支付确认、登录异常、物流通知、付款回执、状态通知等
            <br />2.推广短信：用于发送营销推广类短信，如会员关怀、新品上线、活动通知等
            <br />·审核通过后，可以在“短信签名”中查看签名内容，该字符串是短信发送接口的必填入参
          </p>
          <p>签名的审核规则详见签名提交规则</p>
        </div>
      </div>
      <div class="detail" v-show="active==1">
        <div>
          <h4>签名提交规则</h4>
          <p>
            短信签名是作为短信内容属性的一种标识，签名必须用于标识公司或业务。
            <br />签名内容不能含有黄赌毒，宗教，党政等信息。
            <br />签名内容要求2~12个字（由中英文，数字组成，签名首位不能为数字，不能包含任何符号，不能是全英文或全数字）
            <br />短信签名由【】及签名内容组成，例如：抱一云信需要发送短信通知，签名应为【抱一云信】。
            <br />短信签名需要在移动运营商备案，需要您提供企业授权委托书（要加盖企业公章）。
          </p>
          <h4>签名审核时间</h4>
          <p>
            一般签名预计1个工作日内审核完成，审核通过后可使用。工作时间:9:00-23:00 （法定节日顺延）,建议您尽量在18:00前提交申请。如涉及政检法等事业单位会在2~3个工作日内审 核完成；为配合三大运营商的业务要求，同时也可以侧面保证用户品牌效应，短信在发送时，需签署已经备案的签名。
          </p>
          <h4>短信发送时间限制</h4>
          <p>营销推广短信、群发助手晚上21:00~次日8:30不支持发送，尽量避免夜间发送，减少用户投诉。系统短信发送时间没有限制。</p>
          <h4>系统短信格式限制</h4>
          <p>
            鉴于特殊符号可能会导致短信出现乱码，不支持如￥ ★以及包含可通过按键录入的组合型特殊符号，如ヾ(●?▽`●)ノ ^_^&，☞，√，※，→）,●； 【 】符号在模板内容中任意位置都不能使用, [ ]符号模板内容首尾不能使用,系统均会默认为签名，签名请单独申请，传参需传签名及短信模板ID；
          </p>
          <h4>系统短信内容限制</h4>
          <p>
            验证码模板内容必须含验证码，注册码，校验码，动态密码，动态码这4个词其中一个；
            <br />不支持营销内容；
            <br />禁止发送色情、赌博、毒品、党政、维权、众筹、慈善募捐、佛教迷信、股票、移民、面试招聘、博彩、贷款、催款、信用卡提额、投资理财、中奖、抽奖、一元 夺宝、一元秒杀、A货、 整形、烟酒、交友、暴力、恐吓、色情、皮草、代开发票、代理注册、代办证件、加群、加QQ或者加微信、贩卖个人信息、运营商策反、流量营销等类型的短信；另外房地产、教育、培 训这三类（除验证码外均不支持发送） 不能发送未经许可的发送行为，主要指邀请注册、邀请成为会员的商业性信息；
          </p>
          <h4>推广短信格式限制</h4>
          <p>
            鉴于特殊符号可能会导致短信出现乱码，不支持如￥ ★以及包含可通过按键录入的组合型特殊符号，如ヾ(●?▽`●)ノ ^_^&，☞，√，※，→）,●； 】符号在模板内容中任意位置都不能使用, [ ]符号模板内容首尾不能使用,系统均会默认为签名，签名请单独申请，传参需传签名及短信模板ID；
          </p>
          <h4>推广短信内容限制</h4>
          <p>禁止发送色情、赌博、毒品、党政、维权、众筹、慈善募捐、佛教迷信、股票、移民、面试招聘、博彩、贷款、催款、信用卡提额、投资理财、中奖、抽奖、一元夺宝、一元秒杀、A货、 整形、烟酒、交友、暴力、恐吓、色情、皮草、代开发票、代理注册、代办证件、加群、加QQ或者加微信、贩卖个人信息、运营商策反、流量营销等类型的短信；另外房地产、教育、培 训这三类（除验证码外均不支持发送） 不能发送未经许可的发送行为，主要指邀请注册、邀请成为会员的商业性信息；</p>
        </div>
      </div>
      <div class="detail" v-show="active==2">
        <div>
          <h4>抱一云信暂未开通网上申请开发票功能，若您有开发票需求，可联系客服：158XXXXXXXX</h4>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'userGuider',
  data () {
    return {
      active: 0,
      navArr: ['申请短信签名', '审核标准', '开票申请']
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.userGuider
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