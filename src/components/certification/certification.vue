<template>
  <div class="boxWrap">
    <div class="certification">
      <h1>企业信息认证</h1>
      <p class="state">审核状态:
        <span>未认证</span>
      </p>
      <div class="line"></div>
      <ul>
        <li>
          <span>公司名称:</span>
          <el-input v-model="input1" placeholder="请输入与营业执照相同公司名" @input="isCont"></el-input>
        </li>
        <li class="inputSelect">
          <span>公司地址:</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li style="margin-left:72px;margin-top:-10px">
          <el-input v-model="input" placeholder="请输入与营业执照相同地址"></el-input>
        </li>
        <li>
          <span>注册号或信用代码:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>法人姓名:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>联系人姓名:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>联系人电话:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
        <li>
          <span>联系人邮箱:</span>
          <el-input v-model="input" placeholder="请输入内容"></el-input>
        </li>
        <li style="text-align:left;margin-left:150px">
          <span style="margin-left:-65px">营业执照:</span>
          <el-upload class="avatar-uploader" action="https://jsonplaceholder.typicode.com/posts/" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
            <img v-if="imageUrl" :src="imageUrl" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li style="text-align:center;margin-top:20px">
          <el-button type="info" disabled v-show="status">提交审核</el-button>
          <el-button type="primary" v-show="status_1" style="margin-left:-1px">主要按钮</el-button>
          <p class="wordText">注意:提交审核后,系统将会在一个工作日内完成审核</p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'certification',
  data () {
    return {
      input: '',
      imageUrl: '',
      status: true,
      status_1: false,
      input1: '',
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }],
      value: ''
    }
  },
  methods: {
    isCont () {
      if (this.input1 !== '') {
        this.status = false
        this.status_1 = true
      } else {
        this.status = true
        this.status_1 = false
      }
    },
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
.boxWrap
  background #FFFFFF
  margin 16px
  h1
    padding 12px 0px 12px 20px
    float left
    color #525F75
    font-size 16px
    font-weight 500
  .state
    float right
    padding 12px 20px 12px 0px
    font-size 12px
    color #4A566D
    span
      color #fc1733
  .line
    height 1px
    background #E8EBF0
    width 100%
    clear both
  ul
    padding 16px 0px 12px 30px
    text-align right
    width 500px
    li
      padding-bottom 30px
      span
        margin-right 40px
      .avatar-uploader .el-upload
        border 1px dashed #d9d9d9
        border-radius 6px
        cursor pointer
        position relative
        overflow hidden
      .avatar-uploader .el-upload:hover
        border-color #409EFF
      .avatar-uploader-icon
        font-size 28px
        color #8c939d
        width 178px
        height 178px
        line-height 178px
        text-align center
        border 1px solid #EFF2F6
        margin-left 50px
      .avatar
        width 178px
        height 178px
        display block
        margin-left 50px
        border 1px solid #EFF2F6
      .wordText
        margin-top 8px
        font-size 12px
        color #525F75
        text-align right
        margin-right 30px
        padding-bottom 93px
</style>