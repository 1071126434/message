<template>
  <div class="msgDocGuider">
    <h2>短信服务文档使用指引</h2>
    <div class="cont">
      <div>
        <span class="title">短信接口配置</span>
      </div>
      <div class="step">
        <el-steps direction="vertical" :active="-1">
          <el-step>
            <span slot="title" class="stepCont">入驻抱一云信后，需通过实名认证</span>
          </el-step>
          <el-step>
            <span slot="title" class="stepCont">
              系统短信服务
              <br /> 1)
              <strong @click="showKey=true">获取account/accessKey</strong>
              <br /> 2) 配置回调地址
            </span>
          </el-step>
          <el-step>
            <span slot="title" class="stepCont">
              创建短信签名
              <strong>
                <i class="el-icon-circle-plus"></i>
                添加签名
              </strong>
            </span>
          </el-step>
          <el-step>
            <span slot="title" class="stepCont">
              短信接口配置 (API对接)
              <br />1)
              <strong>下载API接口文档</strong> &
              <strong>demo</strong>
              <br />2) 配置接口参数联调
            </span>
          </el-step>
          <el-step>
            <span slot="title" class="stepCont">
              发送短信：选择签名&模板，输入短信内容进行短信发送
            </span>
          </el-step>
        </el-steps>
      </div>
    </div>
    <div class="alert">
      <el-dialog title="获取account/accessKey" :visible.sync="showKey" :modal-append-to-body="false" width="600px">
        <div class="list">
          <span>accessKey：10212155541412525</span>
          <b class="small-btn copy" data-clipboard-text="123456" @click="doCopy">复制</b>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showKey = false">取 消</el-button>
          <el-button type="primary" @click="showKey = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import Clipboard from 'clipboard'
export default {
  name: 'msgDocGuider',
  data () {
    return {
      showKey: false
    }
  },
  methods: {
    doCopy () {
      var clipboard = new Clipboard('.copy')
      clipboard.on('success', (e) => {
        this.$message({
          message: '复制成功！',
          type: 'success'
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.msgDocGuider
  margin 16px 20px
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
    .title
      display inline-block
      width 116px
      height 32px
      line-height 32px
      background #40B6FF
      font-size 14px
      color #ffffff
      text-align center
      font-weight bold
    .step
      margin-top 36px
      span
        font-size 14px
        color #525F75
        display inline-block
        margin-bottom 40px
        strong
          color #3EAFFF
          cursor pointer
  .alert
    .list
      padding 20px 90px
      span
        margin-right 20px
</style>