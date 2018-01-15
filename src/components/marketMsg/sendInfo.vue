<template>
  <div class="sendInfo">
    <div class="sendTop">
      <span @click="$router.push({name: 'market'})">营销短信</span>
      <strong>></strong>
      <b>发送营销短信</b>
    </div>
    <div class='sendInfoContent'>
      <div class="top">
        <h1>发送营销短信</h1>
        <p>营销短信,每条发送成功的短信收费为
          <span>0.045元</span>
        </p>
      </div>
      <ul class="sendConte">
        <li>
          <span>选择签名</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.sign">
            </el-option>
          </el-select>
          <sub>还没有签名?点此
            <router-link :to="{name:'addSign'}">
              <i>新建签名</i>
            </router-link>
          </sub>
        </li>
        <li class="content">
          <span>短信内容</span>
          <textarea name="" class="input" cols="40" rows="10" placeholder="请输入内容" v-model="textarea2" @input="descInput" @blur="sendContent"></textarea>
          <p>
            <em>{{word}}</em>个字,共
            <em>{{tiao}}</em>条短信(每
            <em>70</em>个字为一条短信)</p>
        </li>
        <li style="line-height: 40px">
          <span>发送时间</span>
          <el-radio v-model="radio" label="0" @change="instant">即时发送</el-radio>
          <el-radio v-model="radio" label="1" @change="timing">定时发送</el-radio>
          <el-date-picker style="margin-left:30px" v-model="value1" type="datetime" placeholder="选择日期时间" v-if="radioTime" format="yyyy-MM-dd HH:mm:ss" value-format='yyyy-MM-dd HH:mm:ss'>
          </el-date-picker>
        </li>
        <li class="sendType" style="line-height: 40px">
          <span>发送方式</span>
          <el-radio v-model="radio1" label="0" @change="allSend">批量发送</el-radio>
          <el-radio v-model="radio1" label="1" @change="oneSend">单条发送</el-radio>
          <el-input v-model="input" placeholder="请输入手机号" v-if="phone"></el-input>
        </li>
        <li class="instructions">
          单价:¥{{normalMarketPrice}}/条 费用总计:¥{{normalMarketPrice*tiao}} 余额:¥{{money}}
          <span class="coinpay" v-show="coinPayShow">充值</span>
        </li>
        <li class="iconfont">
          <!-- <p>
            <i class="iconfont icon-dui"></i>
            <span>上传成功</span>
          </p> -->
          <p v-show="sucess">
            <i class="iconfont icon-dui"></i>
            <span>上传成功</span>
          </p>
          <!-- <p class="shibai">
            <i class="icon-buchenggong"></i>
            <span>解析失败</span>
          </p> -->
          <p class="waite" v-show="uping">
            <i class="el-icon-loading"></i>
            <span style="color:green">上传中</span>
          </p>
        </li>
        <li style="margin-left:100px" v-show="oneSendShow">
          共计上传{{totalNum}}个手机号,成功解析{{realNum}}个,解析失败{{loser}}个
          <span style="color:#ff3341;cursor:pointer" @click="download">下载失败详情</span>
        </li>
        <li class="btnSend">
          <button class="BtnDisable" @click="oneSendInfo" v-if="send">发送短信</button>
          <p v-if="allUplaod">
            <el-upload class="upload-demo" :show-file-list='false' accept=".csv" action="/api/sms/uploadFile" :on-success="handlePreview" :on-progress='uploadCsv' :headers="{'accesstoken':userToken, 'userAccountId':userInfo.userId}" :data='{ oldFileName:""||uploadFileName}' multiple>
              <button class="BtnDisable" @click="upoldCsv">上传csv文件</button>
            </el-upload>
            <button class="BtnDisable csvsend" @click="csvSend" v-if="allUplaod">发送短信</button>
            <span class="csvNumber">下载模板(每次上传csv文件,最多只能发送50000条)</span>
          </p>
        </li>
        <li class="txt">
          <h5>温馨提示:</h5>
          <p>1.短信发送后请耐心等候结果,一般发送时间不会超过1分钟,重复发送会导致用户受到重复短信</p>
          <p>2.发送短信可能有0-5分钟的延迟</p>
          <p>3.半小时内相同手机号相同短信内容可能会被系统自动拦截</p>
          <p>4.减少对用户的干扰,短信大批量的发送时间为上午8:30:00至下午21:00:00,其它时间段会延迟进行发送,请您注意</p>
          <p>5.请大量发送之前进行单条测试,成功接收并确认内容无误后再进行大量发送</p>
          <p>6.定时发送任务至少大于当前时间2小时,定时任务可取消,请提前20分钟或更早取消操作</p>
          <p>7.定时任务由系统自动触发并提交发送</p>
        </li>
      </ul>
      <div class="picSend" style="margin-top:25px">
        <img :src="sendPic" alt="">
        <div class="scoll">
          <div v-for="(item,index) in inputArr" :key="index">
            <p>{{item}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import sendPic from '../../assets/images/Group.svg'
import { mapGetters } from 'vuex'
export default {
  name: 'sendInfo',
  data () {
    return {
      sendPic: sendPic,
      textarea2: '',
      radio: '0',
      radio1: '0',
      input: '',
      value1: '',
      send: false,
      radioTime: false,
      phone: false,
      allUplaod: true,
      uping: false,
      word: 0,
      tiao: 0,
      uploadFileName: '',
      realNum: 0,
      totalNum: 0,
      loser: 0,
      sucess: false,
      money: 0,
      normalMarketPrice: 0,
      options: [],
      value: '',
      oneSendShow: true,
      coinPayShow: false
    }
  },
  created () {
    this.getsign()
    this.moneyNum()
    if (this.money < (this.specialMarketPrice)) {
      this.coinPayShow = true
      this.$message({
        message: '余额不足,请充值',
        type: 'warning'
      })
      return false
    }
    this.textarea2 = sessionStorage.getItem('smsContentNoner')
  },
  computed: {
    inputArr: function () {
      let arr = []
      for (let i = 0; i < this.tiao; i++) {
        let str = this.textarea2.substring(70 * i, 70 * (i + 1))
        arr.push(str)
      }
      return arr
    },
    ...mapGetters([
      'userToken',
      'userInfo'
    ])

  },
  methods: {
    sendContent () {
      sessionStorage.setItem('smsContentNoner', this.textarea2)
    },
    btn () {
      console.log(this.radio1)
    },
    timing () {
      this.radioTime = true
    },
    instant () {
      this.radioTime = false
    },
    allSend () {
      this.phone = false
      this.allUplaod = true
      this.send = false
      this.oneSendShow = true
    },
    oneSend () {
      this.phone = true
      this.allUplaod = false
      this.send = true
      this.oneSendShow = false
    },
    descInput () {
      let length = this.textarea2.length
      this.word = length
      this.tiao = Math.ceil(length / 70)
    },
    closeWindow (e) {
      return '确认要离开? 离开后若未解析完成数据将丢失!'
    },
    handlePreview (file) {
      this.sucess = true
      this.uping = false
      console.log(file)
      this.uploadFileName = file.data.uploadFileName
      this.totalNum = file.data.totalNum
      this.realNum = file.data.realNum
      this.loser = file.data.totalNum - file.data.realNum
    },
    download () {
      window.open('/api/sms/downloadErrorTelephones?fileName=' + this.uploadFileName)
    },
    // 获取签名列表
    getsign () {
      this.$ajax.post('/api/sign/getAvalidListByAccountIdAndType', {
        accountId: this.userInfo.userId,
        type: 3
      }).then((data) => {
        console.log(data)
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              sign: word.sign,
              id: word.id
            }
            arr.push(goods)
          }
          this.options = arr
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    },
    // 获取钱的数额的情况
    moneyNum () {
      this.$ajax.post('/api/user/getUserSMSFundInfo', {
        telephone: this.userInfo.telephone
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.money = data.data.data.money
          this.normalMarketPrice = data.data.data.normalMarketPrice
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
    // 当点击上传文件触发的事件
    uploadCsv () {
      this.uping = true
    },
    upoldCsv () {
      this.sucess = false
    },
    // 当上传过csv文件的时候开始发送短信  批量发送
    csvSend () {
      if (this.uploadFileName === '') {
        this.$message({
          message: '请先操作上传csv文件',
          type: 'warning'
        })
        return false
      }
      if (this.realNum === 0) {
        this.$message({
          message: '没有可发送的手机号,请正确上传',
          type: 'warning'
        })
        return false
      }
      if (this.value === '' || this.textarea2 === '') {
        this.$message({
          message: '请正确填写内容,不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.money < (this.normalMarketPrice * this.tiao)) {
        this.$message({
          message: '余额不足,请充值',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/sms/parseFile', {
        uploadFileName: this.uploadFileName,
        signature: this.value,
        content: this.textarea2,
        sendTimeType: this.radio,
        sendType: this.radio1,
        accountId: this.userInfo.userId,
        type: 0,
        totalNum: this.realNum,
        sendTime: this.value1 || ''
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.message,
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'market' })
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
    },
    // 单条发送的请求
    oneSendInfo () {
      if (this.value === '' || this.textarea2 === '') {
        this.$message({
          message: '请正确填写内容,不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.money < (this.normalMarketPrice * this.tiao)) {
        this.$message({
          message: '余额不足,请充值',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/sms/sendOneMarket', {
        signature: this.value,
        content: this.textarea2,
        sendType: this.radio1,
        sendTimeType: this.radio,
        sendTime: this.value1 || '',
        accountId: this.userInfo.userId,
        type: 0,
        telephone: this.input
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: data.data.message,
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'market' })
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
  },
  mounted () {
    window.onbeforeunload = this.closeWindow
  },
  destroyed () {
    window.onbeforeunload = null
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendInfo
  overflow hidden
  min-width 1130px
  .sendTop
    padding 12px 0px 12px 16px
    color #525F75
    line-height 1
    font-size 12px
    span
      &:hover
        cursor pointer
        color #40B6FF
  .sendInfoContent
    background #FFFFFF
    margin 0px 17px 0px 15px
    position relative
    overflow hidden
    .top
      border-bottom 1px solid #E8EBF0
      padding-bottom 12px
      margin-top 12px
      overflow hidden
      h1
        padding-left 20px
        float left
        font-size 16px
        color #525F75
      p
        float right
        margin-right 15px
        font-size 12px
        color #4a566d
        span
          color #fb203a
    .sendConte
      padding 16px 20px
      font-size 14px
      color #525F75
      width 50%
      float left
      li
        padding-bottom 20px
        textarea
          border 1px solid #BDC9D9
          vertical-align top
          outline none
          padding 7px
        span
          margin-right 40px
        sub
          font-size 12px
          i
            color #3eafff
      .content p
        font-size 12px
        color #93A2BA
        margin-left 100px
        margin-top 5px
        em
          color #fb203a
      .btnSend
        margin-left 100px
        position relative
        .csvsend
          position absolute
          top 0
          left 105px
        .csvNumber
          margin-top 10px
          display inline-block
      .txt
        font-size 12px
        color #525f75
        line-height 17px
        margin-top 36px
      .instructions
        margin-left 100px
    .picSend
      float right
      position relative
      margin-right 192px
      .scoll
        width 132px
        height 172px
        overflow auto
        position absolute
        top 83px
        left 22px
        ::-webkit-scrollbar
          normal
        div
          border 1px solid #eff5f6
          border-radius 4px 4px 4px 0px
          line-height 25px
          transform scale(0.5)
          width 194%
          transform-origin 0 0
          height 70px
          p
            background #eff5f6
            word-break break-all
    .iconfont
      color #00C957
      font-size 14px
      margin-left 50px
      .shibai
        color #ff3341
        margin-left 50px
      .waite
        color #525F75
        margin-left 50px
</style>