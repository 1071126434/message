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
        <li v-if="add">
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
            <el-checkbox v-model="checked2">营销短信</el-checkbox>
            <el-checkbox v-model="checked">通知短信</el-checkbox>
            <el-checkbox v-model="checked1">验证码</el-checkbox>
          </div>
        </li>
        <li>
          <span>授权书</span>
          <div class="model">
            <p>请您
              <i @click="uploadModel">下载授权书模板</i>，填写、打印并盖章后，拍照上传
            </p>
            <el-upload class="uploader" :show-file-list="false" :http-request="uploadImg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" ref="upload" action="">
              <img v-if="imgUrl" :src="imgUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            <a>(照片支持jpg/png/jpeg格式，大小不超过2M)</a>
            <p class="bigPic" @click="lookImg(imgUrl)">
              <i class="el-icon-zoom-in"></i>放大图片</p>
          </div>
        </li>
        <li>
          <span></span>
          <b class="btn" @click="submit">提交审核</b>
          <router-link :to="{name:'manger'}">
            <b class="btn-b">取 消</b>
          </router-link>
        </li>
        <li>
          <p>温馨提示
            <br />1. 短信签名建议为用户真实应用名、网站名、公司名；
            <br />2.短信发送时签名会自带【】，您无需在签名中添加【】、[]、{}等符号，避免重复
          </p>
        </li>
      </ul>
      <div v-show="showLookImg ">
        <lookImg :imgUrl="lookImgUrl " @close="showLookImg=false "></lookImg>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { uploadPromise, uploadFile, getFileWidthAndHeight } from '../../assets/js/upload'
import { mapGetters } from 'vuex'
import LookImg from '../../base/lookImg/lookImg'
export default {
  name: 'addSign',
  components: {
    LookImg
  },
  data () {
    return {
      addObj: {
        signName: '',
        modelCont: ''
      },
      imgUrl: '',
      add: false,
      checked: false,
      checked1: false,
      checked2: false,
      isCanUpload: false,
      showLookImg: false,
      lookImgUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  watch: {
    isCanUpload (val) {
      if (val) {
        this.$refs.upload.submit()
      }
    }
  },
  methods: {
    lookImg (url) {
      console.log(url)
      this.showLookImg = true
      this.lookImgUrl = url
    },
    uploadImg (img) {
      if (!this.isCanUpload) {
        return false
      }
      uploadPromise.then((res) => {
        console.log(res)
        if (res.data.code === '200') {
          uploadFile(res.data.data, img.file).then((res) => {
            this.imgUrl = res.url || `http://smsfile.oss-cn-hangzhou.aliyuncs.com/${res.name}`
          }).catch(() => {
            this.$message.error('网络错误，请刷新试试')
          })
        }
      }).catch((error) => {
        console.log(error)
        this.$message.error('网络错误，请刷新试试')
      })
    },
    beforeAvatarUpload (file) {
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/png') || (file.type === 'image/gif')
      const isLt1M = file.size / 2048 / 2048 < 1
      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
        this.isCanUpload = false
        return false
      } else if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
        this.isCanUpload = false
        return false
      } else {
        getFileWidthAndHeight(file).then((img) => {
          this.isCanUpload = true
        })
      }
    },
    // 点击下载授权书模板进行下载
    uploadModel () {
      window.open('http://smsfile.oss-cn-hangzhou.aliyuncs.com/%E7%AD%BE%E5%90%8D%E6%8E%88%E6%9D%83%E5%A7%94%E6%89%98%E4%B9%A6-%E6%A8%A1%E6%9D%BF.docx')
    },
    submit () {
      if (this.addObj.signName === '' || this.picUrl === '') {
        this.$message({
          message: '请正确填写内容,不能为空',
          type: 'warning'
        })
        return false
      }
      if (this.checked2 === false && this.checked === false && this.checked1 === false) {
        this.$message({
          message: '请先勾选短信类型',
          type: 'warning'
        })
        return false
      }
      this.$ajax.post('/api/sign/addSign', {
        name: this.addObj.signName,
        types: (this.checked2 === true && this.checked === true && this.checked1 === true) ? '1,2,3' : (this.checked2 === true && this.checked === true) ? '3,1' : (this.checked2 === true && this.checked1 === true) ? '3,2' : (this.checked1 === true && this.checked === true) ? '2,1' : this.checked2 === true ? '3' : this.checked === true ? '1' : '2',
        picUrl: this.imgUrl,
        accountId: this.userInfo.userId
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: '信息提交成功',
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'manger' })
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
        .bigPic
          margin-top -19px
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
            width 57px
            height 57px
        a
          font-size 12px
          color #99A9BF
          line-height 60px
          vertical-align bottom
</style>