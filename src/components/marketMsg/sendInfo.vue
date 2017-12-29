<template>
  <div class="sendInfo">
    <div class="sendTop">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'market' }">营销短信</el-breadcrumb-item>
        <el-breadcrumb-item>发送营销短信</el-breadcrumb-item>
      </el-breadcrumb>
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
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <sub>还没有签名?点此
            <i>新建签名</i>
          </sub>
        </li>
        <li class="content">
          <span>短信内容</span>
          <textarea name="" class="input" cols="40" rows="10" placeholder="请输入内容" v-model="textarea2"></textarea>
          <p>
            <em>0</em>个字,共
            <em>0</em>条短信(每
            <em>70</em>个字未一条短信)</p>
        </li>
        <li>
          <span>发送时间</span>
          <el-radio v-model="radio" label="1">即时发送</el-radio>
          <el-radio v-model="radio" label="2">定时发送</el-radio>
          <el-date-picker style="margin-left:30px" v-model="value1" type="datetime" placeholder="选择日期时间">
          </el-date-picker>
        </li>
        <li class="sendType">
          <span>发送方式</span>
          <el-radio v-model="radio1" label="1">批量发送</el-radio>
          <el-radio v-model="radio1" label="2">单挑发送</el-radio>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'sendInfo',
  data () {
    return {
      textarea2: '',
      radio: '1',
      radio1: '1',
      input: '',
      value1: '',
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
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
    li
      padding-bottom 20px
      textarea
        border 1px solid #BDC9D9
        vertical-align top
        outline none
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
</style>