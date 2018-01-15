<template>
  <div class="boxWrap">
    <div class="certification">
      <h1>企业信息认证</h1>
      <p class="state">审核状态:
        <span v-if="this.userInfo.status===2">认证中</span>
        <span v-if="this.userInfo.status===3">未认证</span>
        <span v-if="this.userInfo.status===4">未通过</span>
        <span v-if="this.userInfo.status===1">已认证</span>
      </p>
      <div class="line"></div>
      <ul>
        <li>
          <span>公司名称:</span>
          <el-input v-model="companyName" placeholder="请输入与营业执照相同公司名" @input="isCont"></el-input>
        </li>
        <li class="inputSelect">
          <span>公司地址:</span>
          <el-select v-model="itemPro" placeholder="省份" @input="isCont" @change="provinceChange" value-key='code'>
            <el-option v-for="(itemPro,index) in provinces" :key="index" :label="itemPro.name" :value="itemPro"></el-option>
          </el-select>
          <el-select v-model="itemCity" placeholder="市" @input="isCont" @change="cityChange" value-key='code'>
            <el-option v-for="(itemCity,index) in city" :key="index" :label="itemCity.name" :value="itemCity"></el-option>
          </el-select>
          <el-select v-model="itemZone" placeholder="区" @input="isCont" value-key='code'>
            <el-option v-for="(itemZone,index) in zone" :key="index" :label="itemZone.name" :value="itemZone"></el-option>
          </el-select>
        </li>
        <li style="margin-left:72px;margin-top:-10px">
          <el-input v-model="input" placeholder="请输入与营业执照相同地址" @input="isCont"></el-input>
        </li>
        <li>
          <span>注册号或信用代码:</span>
          <el-input v-model="input2" placeholder="请输入内容" @input="isCont"></el-input>
        </li>
        <li>
          <span>法人姓名:</span>
          <el-input v-model="input3" placeholder="请输入内容" @input="isCont"></el-input>
        </li>
        <li>
          <span>联系人姓名:</span>
          <el-input v-model="input4" placeholder="请输入内容" @input="isCont"></el-input>
        </li>
        <li>
          <span>联系人电话:</span>
          <el-input v-model="input5" placeholder="请输入内容" @input="isCont"></el-input>
        </li>
        <li>
          <span>联系人邮箱:</span>
          <el-input v-model="input6" placeholder="请输入内容" @input="isCont"></el-input>
        </li>
        <li style="text-align:left;margin-left:150px">
          <span style="margin-left:-65px">营业执照:</span>
          <el-upload class="avatar-uploader" :show-file-list="false" :http-request="uploadImg" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload" ref="upload" action="">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" width="182px" height="182px">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
          <p class="bigPic" @click="lookImg(imageUrl)">
            <i class="el-icon-zoom-in"></i>放大图片</p>
        </li>
        <li style="text-align:center;margin-top:20px">
          <!-- <el-button type="info" disabled v-show="status">提交审核</el-button> -->
          <el-button type="primary" style="margin-left:-1px" @click="submit">提交审核</el-button>
          <p class="wordText">注意:提交审核后,系统将会在一个工作日内完成审核</p>
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
  name: 'certification',
  components: {
    LookImg
  },
  data () {
    return {
      input: '',
      imageUrl: '',
      status: true,
      status_1: false,
      input2: '',
      input3: '',
      input4: '',
      input5: '',
      input6: '',
      companyName: '',
      provinces: [],
      itemPro: null,
      city: [],
      itemCity: null,
      zone: [],
      itemZone: null,
      isCanUpload: false,
      getObj: {},
      showLookImg: false,
      lookImgUrl: ''
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  created () {
    this.getSubmit()
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
    isCont () {
      if (this.itemPro !== '' && this.companyName !== '' && this.itemCity !== '' && this.itemZone !== '' && this.input !== '' && this.input2 !== '' && this.input3 !== '' && this.input4 !== '' && this.input5 !== '' && this.input6 !== '') {
        this.status = false
        this.status_1 = true
      } else {
        this.status = true
        this.status_1 = false
      }
    },

    uploadImg (img) {
      if (!this.isCanUpload) {
        return false
      }
      uploadPromise.then((res) => {
        console.log(res)
        if (res.data.code === '200') {
          uploadFile(res.data.data, img.file).then((res) => {
            console.log(1111)
            this.imageUrl = res.url || `http://smsfile.oss-cn-hangzhou.aliyuncs.com/${res.name}`
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
      const isLt1M = file.size / 1024 / 1024 < 1

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG/PNG/GIF 格式!')
        this.isCanUpload = false
        return false
      } else if (!isLt1M) {
        this.$message.error('上传头像图片大小不能超过 1MB!')
        this.isCanUpload = false
        return false
      } else {
        getFileWidthAndHeight(file).then((img) => {
          this.isCanUpload = true
        })
      }
    },
    // 当认证被驳回的时候,获取到能够修改的数据进行一个展示
    getSubmit () {
      this.$ajax.post('/api/companyCertify/getCompanyInfo', {
        accountId: this.userInfo.userId
      }).then((data) => {
        console.log(data)
        let res = data.data.data
        if (data.data.code === '200') {
          this.companyName = res.companyName
          this.itemPro = res.proviceDetail
          this.itemCity = res.cityDetail
          this.itemZone = res.areaDetail
          this.input = res.addressDetail
          this.input2 = res.companyCreditCode
          this.input3 = res.legalPersonName
          this.input4 = res.concatName
          this.input5 = res.concatPhone
          this.input6 = res.concatEmail
          this.imageUrl = res.businessLicenceUrl
          this.$message({
            message: res.comment || '暂无数据',
            type: 'warning',
            duration: 0,
            showClose: true
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
    submit () {
      this.$ajax.post('/api/companyCertify/submit', {
        companyName: this.companyName,
        provinceCode: this.itemPro.code,
        provinceDetail: this.itemPro.name,
        cityCode: this.itemCity.code,
        cityDetail: this.itemCity.name,
        areaCode: this.itemZone.code,
        areaDetail: this.itemZone.name,
        address: this.input,
        companyCreditCode: this.input2,
        legalName: this.input3,
        concatName: this.input4,
        concatTelephone: this.input5,
        concatEmail: this.input6,
        picUrl: this.imageUrl,
        accountId: this.userInfo.userId
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: '信息提交成功,请耐心等待',
            type: 'success',
            onClose: () => {
              this.$router.push({ name: 'index' })
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
    // 检测当省份发生变化出发的改变事件
    provinceChange () {
      this.itemCity = ''
      this.itemZone = ''
      this.zone = []
      this.getCity()
    },
    cityChange () {
      this.getZone()
      this.itemZone = ''
    },
    // 获取省的接口
    Provinces () {
      this.$ajax.post('/api/config/location/getProvinceList', {
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code
            }
            arr.push(goods)
          }
          this.provinces = arr
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
    // 获取市通过省份获取市
    getCity () {
      this.$ajax.post('/api/config/location/getCityListByProvinceCode', {
        provinceCode: this.itemPro.code
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              provinceCode: word.provinceCode
            }
            arr.push(goods)
          }
          this.city = arr
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
    // 通过市获取区的值
    getZone () {
      this.$ajax.post('/api/config/location/getAreaListByCityCode', {
        cityCode: this.itemCity.code
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          let arr = []
          for (let word of res.data) {
            let goods = {
              id: word.id,
              name: word.name,
              code: word.code,
              cityCode: word.cityCode
            }
            arr.push(goods)
          }
          this.zone = arr
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
      .bigPic
        font-size 12px
        color #525F75
        margin-left 50px
        margin-top 5px
        cursor pointer
</style>