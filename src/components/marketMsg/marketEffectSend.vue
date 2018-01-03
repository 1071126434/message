<template>
  <div class="sendInfo">
    <div class="sendTop">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'market' }">效果追踪短信</el-breadcrumb-item>
        <el-breadcrumb-item>发送追踪服务短信</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='sendInfoContent'>
      <div class="top">
        <h1>发送追踪服务短信</h1>
        <p>该服务能够获取打开链接记录，需付费，服务费按条收费，每条发送成功的短信收费（包含服务费）为
          <span>0.045元</span>
        </p>
      </div>
      <ul class="sendConte">
        <li>
          <span>选择签名</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <sub>还没有签名?点此
            <i>新建签名</i>
          </sub>
        </li>
        <li class="content">
          <span>短信内容</span>
          <textarea name="" class="input" cols="40" rows="10" placeholder="请输入内容" v-model="textarea2" @input="descInput"></textarea>
          <p>
            <em>{{word}}</em>个字,共
            <em>1</em>条短信(每
            <em>56</em>个字为一条短信)</p>
        </li>
        <li>
          <textarea name="" class="inputUrl" cols="40" rows="3" placeholder="请在此处输入URL链接" v-model="textarea3"></textarea>
        </li>
        <li style="line-height: 40px">
          <span>发送时间</span>
          <el-radio v-model="radio" label="1" @change="instant">即时发送</el-radio>
          <el-radio v-model="radio" label="2" @change="timing">定时发送</el-radio>
          <el-date-picker style="margin-left:30px" v-model="value1" type="datetime" placeholder="选择日期时间" v-if="radioTime">
          </el-date-picker>
        </li>
        <li class="sendType" style="line-height: 40px">
          <span>发送方式</span>
          <el-radio v-model="radio1" label="1" @change="allSend">批量发送</el-radio>
          <el-radio v-model="radio1" label="2" @change="oneSend">单条发送</el-radio>
          <el-input v-model="input" placeholder="请输入手机号" v-if="phone"></el-input>
        </li>
        <li class="instructions">
          单价:¥0.045/条 费用总计:¥0.045 余额:¥20.00 请先
          <span class="coinpay">充值</span>
        </li>
        <li class="iconfont">
          <!-- <p>
            <i class="iconfont icon-dui"></i>
            <span>上传成功</span>
          </p> -->
          <!-- <p>
            <i class="iconfont icon-dui"></i>
            <span>解析成功</span>
          </p> -->
          <!-- <p class="shibai">
            <i class="icon-buchenggong"></i>
            <span>解析失败</span>
          </p> -->
          <p class="waite">
            <i class="el-icon-loading"></i>
            <span>解析中</span>
          </p>
        </li>
        <li style="margin-left:100px">
          共计上传34个手机号,成功解析32个,解析失败2个
          <span style="color:#ff3341">下载失败详情</span>
        </li>
        <li class="btnSend">
          <button class="BtnDisable" @click="btn" v-if="send">发送短信</button>
          <p v-if="allUplaod">
            <button class="BtnDisable">上传csv文件</button>
            <span>下载模板(每次上传csv文件,最多只能发送50000条)</span>
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
          <div v-for="(item,index) in inputArr" :key="index">{{item}}</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import sendPic from '../../assets/images/Group.svg'
export default {
  name: 'sendInfo',
  data () {
    return {
      sendPic: sendPic,
      textarea2: '',
      textarea3: '',
      radio: '1',
      radio1: '1',
      input: '',
      value1: '',
      send: false,
      radioTime: false,
      phone: false,
      allUplaod: true,
      word: 0,
      tiao: 0,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: ''
    }
  },
  computed: {
    inputArr: function () {
      let arr = []
      for (let i = 0; i < this.tiao; i++) {
        let str = this.textarea2.substring(70 * i, 70 * (i + 1))
        arr.push(str)
      }
      return arr
    }
  },
  methods: {
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
    },
    oneSend () {
      this.phone = true
      this.allUplaod = false
      this.send = true
    },
    descInput () {
      let length = this.textarea2.length
      this.word = length
      if (this.word > 56) {
        alert('再输打死你')
        this.textarea2 = this.textarea2.substring(0, 56)
        this.word = 56
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.sendInfo
  overflow hidden
  min-width 1080px
  .sendTop
    padding 12px 0px 12px 16px
    font-size 12px
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
        .inputUrl
          margin-left 100px
      .content p
        font-size 12px
        color #93A2BA
        margin-left 100px
        margin-top 5px
        em
          color #fb203a
      .btnSend
        margin-left 100px
      .txt
        font-size 12px
        color #525f75
        line-height 17px
        margin-top 36px
      .instructions
        margin-left 100px
    .picSend
      float right
      margin-right 192px
      position relative
      .scoll
        width 163px
        height 176px
        overflow auto
        position absolute
        top 80px
        left -16px
        ::-webkit-scrollbar
          normal
        div
          border 1px solid #eff5f6
          background #eff5f6
          border-radius 4px 4px 4px 0px
          line-height 25px
          transform scale(0.6)
          width 122%
          margin-bottom -48px
          padding 5px
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