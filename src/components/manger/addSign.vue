<template>
  <div class="addSign">
    <div class="nav">
      <span @click="$router.push({name: 'manger'})">签名管理</span>
      <strong>></strong>
      <b>添加签名</b>
    </div>
    <div class="cont">
      <h2>添加签名
        <span>注：一个企业最多申请
          <strong>5个</strong>签名
        </span>
      </h2>
      <ul class="addCont">
        <li>
          <span>驳回理由</span>
          <strong>授权书公章不清晰</strong>
        </li>
        <li>
          <span>签名名称</span>
          <el-input v-model="addObj.signName" placeholder="请输入内容" style="width:370px"></el-input>
          <p class="tip">长度介于2~8个字符之间，至少包含汉子、数字、英文中的两种</p>
        </li>
        <li>
          <span>签名类型</span>
          <div class="checkBox">
            <el-checkbox-group v-model="addObj.signType">
              <el-checkbox label="营销短信"></el-checkbox>
              <el-checkbox label="系统短信"></el-checkbox>
            </el-checkbox-group>
          </div>
        </li>
        <li>
          <span>授权书</span>
          <div class="model">
            <p>请您
              <i>下载授权书模板</i>，填写、打印并盖章后，拍照上传
            </p>
            <el-upload class="uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a>(照片支持jpg/png/jpeg格式，大小不超过2M)</a>
          </div>
        </li>
        <li>
          <span></span>
          <b class="btn">提交审核</b>
          <b class="btn-b">取 消</b>
        </li>
        <li>
          <p>温馨提示
            <br />1. 短信签名建议为用户真实应用名、网站名、公司名；
            <br />2.短信发送时签名会自带【】，您无需在签名中添加【】、[]、{}等符号，避免重复
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'addSign',
  data () {
    return {
      addObj: {
        signName: '',
        signType: ['营销短信', '系统短信'],
        modelCont: ''
      },
      imgUrl: ''
    }
  },
  methods: {
    handleAvatarSuccess (res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload (file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addSign
  padding 16px
  .nav
    font-size 12px
    color #525F75
    line-height 1
    margin-bottom 8px
    span
      &:hover
        cursor pointer
        color #40B6FF
  .cont
    background #ffffff
    min-height 600px
    h2
      font-size 16px
      line-height 40px
      color #525F75
      font-weight bold
      padding 0 20px
      box-shadow 0 1px 0 #E8EBF0
      span
        float right
        font-size 12px
        color #4A566D
        strong
          color #FB203A
    .addCont
      padding 16px 20px
      font-size 14px
      color #525F75
      li
        min-height 36px
        line-height 36px
        margin-bottom 16px
        >div
          display inline-block
        .model
          padding-top 6px
          i
            color #3EAFFF
            cursor pointer
        span
          display inline-block
          width 100px
          vertical-align top
        strong
          display inline-block
          height 32px
          line-height 32px
          font-weight bold
          background rgba(255, 51, 65, 0.2)
          padding-left 12px
          padding-right 12px
          font-size 14px
          color #FF3341
        p
          font-size 12px
          line-height 20px
        .tip
          font-size 12px
          margin-left 110px
          line-height 20px
        .btn
          margin-right 20px
        .uploader
          display inline-block
          width 58px
          height 58px
          border-radius 4px
          border 1px solid #BAC6DC
          background #EFF2F6
          color #C0CCDA
          text-align center
          line-height 58px
          font-size 20px
          margin 20px 0
          img
            width 60px
            height 60px
        a
          font-size 12px
          color #99A9BF
          line-height 60px
          vertical-align bottom
</style>