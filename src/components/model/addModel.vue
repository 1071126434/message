<template>
  <div class="addModel">
    <div class="nav">
      <span @click="$router.push({name: 'modelManger'})">模板管理</span>
      <strong>></strong>
      <b>添加模板</b>
    </div>
    <div class="cont">
      <h2>添加模板
        <span>注：一个企业最多申请
          <strong>10个</strong>模板
        </span>
      </h2>
      <ul class="addCont">
        <li>
          <span>模板名称</span>
          <el-input v-model="addObj.modelName" placeholder="请输入内容" style="width:370px"></el-input>
          <p class="tip">不超过30个字符</p>
        </li>
        <li>
          <span>发送类型</span>
          <el-radio v-model="addObj.modelType" label="1">验证码</el-radio>
          <el-radio v-model="addObj.modelType" label="2">短信通知</el-radio>
        </li>
        <li>
          <span>模板内容</span>
          <el-input v-model="addObj.modelCont" type="textarea" :rows="5" resize="none" placeholder="变量格式：${code}; 示例：您的验证码为：${code}，请勿泄露于他人。" style="width:370px">
          </el-input>
        </li>
        <li>
          <span></span>
          <b class="btn">提交审核</b>
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
export default {
  name: 'addModel',
  data () {
    return {
      addObj: {
        modelName: '',
        modelType: '1',
        modelCont: ''
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