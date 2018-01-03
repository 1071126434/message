<template>
  <div class="developGuider">
    <h2>开发指南</h2>
    <div class="cont">
      <div class="nav">
        <span v-for="(item, index) in navArr" :class="{ 'actives': active==index }" :key="index" @click="active=index">{{ item }}</span>
      </div>
      <div class="detail" v-show="active==0">
        <div class="tables">
          <table>
            <tr>
              <th>序号</th>
              <th>错误代码</th>
              <th>代码描述</th>
            </tr>
            <tr v-for="(item, index) in tablesArr" :key="index">
              <td>{{ item.id }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.desc }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div class="detail" v-show="active==1">
        <div class="api">
          <h1>云信短信API使用手册</h1>
          <p>*云信系统使用了HMAC进行加密签名，具体可参考样例DEMO使用</p>
          <h2>通用参数说明</h2>
          <div>
            <pre>
              {
                'message': 'ok', //接口状态说明
                'code': 0, //状态码, 0, 正常, 非0异常
                'data': //具体业务数据返回
              }
          </pre>
          </div>
        </div>
      </div>
      <div class="detail" v-show="active==2">

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'developGuider',
  data () {
    return {
      active: 0,
      navArr: ['短信错误码', 'API文档', 'SDK或DEMO下载'],
      tablesArr: [{
        id: '1',
        code: '6',
        desc: '黑名单'
      }, {
        id: '2',
        code: '-103',
        desc: '黑名单'
      }, {
        id: '3',
        code: '24',
        desc: '用户关机或无法接通'
      }, {
        id: '4',
        code: '59',
        desc: '关机'
      }, {
        id: '5',
        code: '-131',
        desc: '验证码发送频率过高'
      }, {
        id: '6',
        code: '640',
        desc: '空号'
      }, {
        id: '7',
        code: '-1005',
        desc: '敏感词拦截'
      }, {
        id: '8',
        code: '0',
        desc: '正确'
      }, {
        id: '9',
        code: '1',
        desc: '消息结构错或是空号'
      }, {
        id: '10',
        code: '2',
        desc: '命令字错，欠费停机'
      }, {
        id: '11',
        code: '3',
        desc: '消息序号重复'
      }, {
        id: '12',
        code: '4',
        desc: '消息长度错或是用户未开通短信功能'
      }, {
        id: '13',
        code: '5',
        desc: '用户欠费停机'
      }]
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.developGuider
  margin 16px 20px
  min-height 600px
  background #ffffff
  .cont
    padding 20px
  .nav
    span
      cursor pointer
      line-height 32px
      height 32px
      display inline-block
      padding 0 16px
      background rgba(64, 182, 255, 0.2)
      font-size 14px
      font-weight bold
      color #40B6FF
      margin-right 4px
    .actives
      background #40B6FF
      color #ffffff
  .detail>div
    margin-top 32px
  .tables
    margin-bottom 40px
    table
      width 100%
      font-size 16px
      th
        width 33.33%
        height 40px
        border 2px solid #E8EBF0
        font-weight bold
        padding 10px 20px
        box-sizing border-box
      td
        height 40px
        border 2px solid #E8EBF0
        padding 10px 20px
        box-sizing border-box
  .api
    h1
      font-size 30px
      margin-top 50px
    h2
      font-size 20px
    h1, h2
      font-weight bold
      color #000000
      padding-bottom 10px
      border-bottom 1px dashed #999999
      margin-bottom 20px
    p
      font-size 16px
      line-height 20px
      margin 40px 0
</style>