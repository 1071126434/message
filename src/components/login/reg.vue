<template>
  <div class="login">
    <div class="logo">
      <img src="../../assets/images/logo.png" alt="logo">
      <span>抱 一 通 信</span>
    </div>
    <div class="cont">
      <div class="text">
        <h1>数 据 智 能&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;驱 动 未 来</h1>
      </div>
      <div class="board">
        <h2>注册账号</h2>
        <div class="inputCont">
          <div class="input" :class="{'actives':focus}">
            <img src="../../assets/images/phone.png" alt="">
            <input @input="isCanUse" v-model="phoneNum" type="number" placeholder="输入手机号" @focus="focus=true" @blur="focus=false">
          </div>
          <div class="inputCode">
            <div class="smInput input" :class="{'actives':focusCode}">
              <img src="../../assets/images/password.png" alt="">
              <input type="password" placeholder="输入验证码" @focus="focusCode=true" @blur="focusCode=false">
            </div>
            <span class="testButton" v-show="!isCan">
              验证码
            </span>
            <span class="testButton" :class="{'active':isSendMsg}" v-show="isCan">
              <span v-show="show" @click="send">获取验证码</span>
              <span v-show="!show">{{time}} s</span>
            </span>
          </div>
          <div class="input pCont" :class="{'actives':focusWord}">
            <img src="../../assets/images/password.png" alt="">
            <input type="password" placeholder="输入新密码" v-model="newpass" @focus="focusWord=true" @blur="focusWord=false">
          </div>
          <div class="input" :class="{'actives':focusWords}">
            <img src="../../assets/images/password.png" alt="">
            <input type="password" placeholder="再次输入密码" v-model="agpass" @focus="focusWords=true" @blur="focusWords=false">
          </div>
          <el-checkbox v-model="checked">阅读并接受《抱一云信用户协议》</el-checkbox>
          <router-link :to="{name:'certification'}">
            <button @click="submit">下一步</button>
          </router-link>
          <h3>
            <span>
              <router-link :to="{ name: 'login', params: { userId: 123 }}">去登录</router-link>
            </span>
          </h3>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import md5 from 'md5'
export default {
  name: 'reg',
  data () {
    return {
      isCan: false,
      phoneNum: '',
      newpass: '',
      agpass: '',
      code: '',
      show: true,
      time: 60,
      focus: false,
      focusCode: false,
      focusWord: false,
      focusWords: false,
      isSendMsg: true,
      checked: false
    }
  },
  methods: {
    isCanUse () {
      if (/^1[34578]\d{9}$/.test(this.phoneNum)) {
        this.isCan = true
        this.isSendMsg = true
      } else {
        this.isCan = false
      }
    },
    send () {
      this.isSendMsg = false
      this.$ajax.post('/api/sms/sendVcode', {
        telephone: this.phoneNum,
        type: 2
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
          let me = this
          me.show = false
          let interval = window.setInterval(function () {
            if ((me.time--) <= 0) {
              me.time = 60
              me.show = true
              this.isCan = true
              window.clearInterval(interval)
            }
          }, 1000)
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    submit () {
      if (this.newpass !== this.agpass) {
        this.$message({
          message: '两次密码不一致,请重新输入',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('', {
        telephone: this.phoneNum,
        code: this.code,
        password: md5(this.newpass),
        repeatPwd: md5(this.agpass)
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.message,
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'login' })
            }
          })
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
.login
  position fixed
  min-width 800px
  width 100%
  height 100%
  background url('../../assets/images/bg.png')
  .logo
    color #ffffff
    height 33px
    padding 26px 45px
    overflow hidden
    img
      width 47.5px
      height 36.5px
      line-height 36.5px
      opacity 37.53
      float left
      vertical-align middle
    span
      font-size 18px
      line-height 30px
      margin-left 12px
      float left
      margin-top 5px
  .cont
    display flex
    justify-content space-around
    align-content center
    height calc(100% - 200px)
    .text
      align-self center
      font-size 24px
      line-height 33px
      color #ffffff
    .board
      align-self center
      background #ffffff
      border 1px solid #cccccc
      box-shadow 0 1px 12px rgba(255, 255, 255, 0.5)
      h2
        font-size 24px
        color #7c7c7c
        line-height 60px
        box-shadow 0 1px 0 #cfc9c9
        text-align center
      .inputCont
        padding 30px
        .inputCode
          display flex
          .smInput
            width 176px
            height 16px
            border 1px solid #cccccc
            padding 14px 9px
            margin-bottom 24px
            span
              display inline-block
              width 24px
              height 24px
              text-align center
            input
              margin-left 15px
              width 130px
              outline none
              border none
              font-size 16px
              line-height 16px
            :-moz-placeholder /* Mozilla Firefox 4 to 18 */
              color lightgray
            ::-moz-placeholder /* Mozilla Firefox 19+ */
              color lightgray
            input:-ms-input-placeholder
              color lightgray
            input::-webkit-input-placeholder
              color lightgray
          .testButton
            display inline-block
            border-radius 2px
            text-align center
            cursor pointer
            margin-left 23px
            width 108px
            height 44px
            line-height 44px
            color #ffffff
            background #999999
            font-size 16px
          .active
            background #40b6ff
          .actives
            border 1px solid #40b6f2
        .input
          width 310px
          height 16px
          border 1px solid #cccccc
          padding 14px 9px
          margin-bottom 17px
          img
            display inline-block
            // width 24px
            height 24px
            text-align center
            vertical-align middle
          input
            width 250px
            margin-left 15px
            outline none
            border none
            font-size 16px
            line-height 22px
          :-moz-placeholder /* Mozilla Firefox 4 to 18 */
            color lightgray
          ::-moz-placeholder /* Mozilla Firefox 19+ */
            color lightgray
          input:-ms-input-placeholder
            color lightgray
          input::-webkit-input-placeholder
            color lightgray
        .pCont
          margin-bottom 42px
          &:after
            content '6-18位数字/字母'
            display inline-block
            font-size 12px
            color #999999
            line-height 28px
        button
          width 100%
          border none
          outline none
          line-height 52px
          color #ffffff
          font-size 16px
          background #40b6ff
          cursor pointer
          border-radius 2px
          margin-bottom 16px
          &:hover
            background #40b6f2
        h3
          overflow hidden
          span
            font-size 14px
            float right
            line-height 38px
            cursor pointer
            color #525F75
            // :hover
            // color #40b6ff
        .actives
          border 1px solid #40b6f2
</style>