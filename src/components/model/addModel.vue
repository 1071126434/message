<template>
  <div class="addModel">
    <div class="nav">
      <span @click="$router.push({name: 'modelManger'})">模板管理</span>
      <strong>></strong>
      <b v-if="$route.query.fix">修改模板</b>
      <b v-else>添加模板</b>
    </div>
    <div class="cont">
      <h2 v-if="$route.query.fix">修改模板
        <span>注：一个企业最多申请
          <strong>10个</strong>模板
        </span>
      </h2>
      <h2 v-else>添加模板
        <span>注：一个企业最多申请
          <strong>10个</strong>模板
        </span>
      </h2>
      <ul class="addCont">
        <li v-if="addObj.reason">
          <span>驳回理由</span>
          <strong>{{ addObj.reason }}</strong>
        </li>
        <li>
          <span>模板名称</span>
          <el-input v-model="addObj.modelName" placeholder="请输入内容" style="width:370px"></el-input>
          <p class="tip">不超过30个字符</p>
        </li>
        <li>
          <span>发送类型</span>
          <el-radio v-model="addObj.modelType" label="1">短信通知</el-radio>
          <el-radio v-model="addObj.modelType" label="2">验证码</el-radio>
          <el-radio v-model="addObj.modelType" label="3">推广短信</el-radio>
        </li>
        <li>
          <span>模板内容</span>
          <el-input v-model="addObj.modelCont" type="textarea" :rows="5" resize="none" placeholder="变量格式：${code}; 示例：您的验证码为：${code}，请勿泄露于他人。" style="width:370px">
          </el-input>
        </li>
        <li>
          <span></span>
          <b class="btn" @click="submit">提交审核</b>
          <b class="btn-b">取 消</b>
        </li>
        <li>
          <p>温馨提示：
            <br />1. 证码模板只支持验证码作为变量；变量替换值&lt;=6位数字或字母
            <br />2.不能发送营销/贷款/借款/中奖/抽奖类短信,不支持金融理财&房产通知类短信(验证码除外)
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'addModel',
  data () {
    return {
      addObj: {
        reason: '',
        modelName: '',
        modelType: '1',
        modelCont: '',
        code: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    submit () {
      if (this.$route.query.fix) {
        this.fixModel()
      } else {
        this.addModel()
      }
    },
    // 添加模板
    addModel () {
      if (this.addObj.modelName === '') {
        this.$message({
          message: '请输入模板名称!',
          type: 'warning'
        })
      } else if (this.addObj.modelCont === '') {
        this.$message({
          message: '请输入模板内容!',
          type: 'warning'
        })
      } else {
        this.$ajax.post('/api/template/addTemplate', {
          type: this.addObj.modelType,
          name: this.addObj.modelName,
          content: this.addObj.modelCont,
          accountId: this.userInfo.userId
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.$message({
              message: '添加成功!',
              type: 'success'
            })
            this.$router.push({ name: 'modelManger' })
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch((error) => {
          this.$message.error(error)
        })
      }
    },
    // 修改模板
    fixModel () {
      this.$ajax.post('/api/template/updateTemplate', {
        type: this.addObj.modelType,
        code: this.addObj.code,
        name: this.addObj.modelName,
        content: this.addObj.modelCont,
        accountId: this.userInfo.userId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '修改成功!',
            type: 'success'
          })
          this.$router.push({ name: 'modelManger' })
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    }
  },
  mounted () {
    if (this.$route.query.fix) {
      console.log(1)
      let row = JSON.parse(sessionStorage.getItem('_fixModelInfo_'))
      this.addObj = {
        reason: row.errorInfo ? row.errorInfo : '',
        modelName: row.name,
        modelType: row.type + '',
        modelCont: row.content,
        code: row.code
      }
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.addModel
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
</style>