<template>
  <div class="index" ref="index">
    <ul class="top">
      <li>
        <div class="left">
          <i class="iconfont icon-wallet"></i>
        </div>
        <div class="right">
          <p>账户余额(元)：
            <strong>￥{{ topInfoObj.balance || 0 }}</strong>
            <b class="small-btn" @click="$router.push({name: 'recharge',query:{moneyNum: topInfoObj.balance}})">充值</b>
          </p>
          <p>
            <span class="link" @click="$router.push({name: 'fee'})">收费标准</span>
            <span class="link" @click="$router.push({name: 'orders'})">查看账单</span>
            <span class="link" @click="showLeftMoney=true">余额预警：￥{{ topInfoObj.alarmValue || 0 }}</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left" style="background:#40B6FF;">
          <i class="iconfont icon-image"></i>
        </div>
        <div class="right">
          <p>今日发送成功数(条)：
            <strong>{{ topInfoObj.todaySendCount || 0 }}</strong>
          </p>
          <p>
            <span>累计：￥{{ topInfoObj.todayMoney || 0 }}</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left" style="background:#FF9F00;">
          <i class="iconfont icon-image1"></i>
        </div>
        <div class="right">
          <p>本月发送成功数(条)：
            <strong>{{ topInfoObj.sendCount || 0 }}</strong>
          </p>
          <p>
            <span>累计：￥{{ topInfoObj.monthMoney || 0 }}</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="sendDetail">
      <h2 class="title">短信发送情况
        <el-date-picker class="datePick" style="width: 140px" v-model="sendDetaildMonth" @change="getSendInfo" value-format="yyyyMM" type="month" placeholder="选择月">
        </el-date-picker>
      </h2>
      <div class="msgType">
        <div class="msgDetail">
          <h3>系统短信
            <span class="link" @click="$router.push({name: 'modelIntro'})">接口调用说明
              <i class="el-icon-question"></i>
            </span>
          </h3>
          <div class="chartWrap">
            <div class="msg1 charts" style="height:100px" ref="msg1"></div>
            <div style="padding-top:40px">
              <p>
                <i style="border-color: #40B6FF"></i>
                <span>发送成功数：</span>
                <b>{{ sendInfoObj.systemSuccessCount }}条</b>
              </p>
              <p>
                <i style="border-color: #B8E3FE"></i>
                <span>发送失败数：</span>
                <b>{{ sendInfoObj.systemSendCount - sendInfoObj.systemSuccessCount }}条</b>
              </p>
              <p>
                <i style="border-color: #B8E3FE #40B6FF #40B6FF #B8E3FE"></i>
                <span>系统发送总条</span>
                <b>{{ sendInfoObj.systemSendCount }}条</b>
              </p>
            </div>
          </div>
        </div>
        <div class="msgDetail">
          <h3>营销短信</h3>
          <div class="chartWrap">
            <div class="msg2 charts" style="height:100px" ref="msg2"></div>
            <div style="padding-top:40px">
              <p>
                <i style="border-color: #FF9F00"></i>
                <span>发送成功数：</span>
                <b>{{ sendInfoObj.marketSuccessCount }}条</b>
              </p>
              <p>
                <i style="border-color: #FED590"></i>
                <span>发送失败数：</span>
                <b>{{ sendInfoObj.marketSendCount - sendInfoObj.marketSuccessCount }}条</b>
              </p>
              <p>
                <i style="border-color: #FED590 #FF9F00 #FF9F00 #FED590"></i>
                <span>系统发送总条</span>
                <b>{{ sendInfoObj.marketSendCount }}条</b>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="sendPre">
      <h2 class="title">发送趋势</h2>
      <div class="search">
        <span>短信类型 </span>
        <el-select v-model="msgType" placeholder="请选择" style="margin-right:48px;margin-left:20px;width:150px;">
          <el-option label="通知" value="1">
          </el-option>
          <el-option label="验证码" value="2">
          </el-option>
        </el-select>
        <span>发送时间 </span>
        <el-date-picker v-model="acTime" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyyMMdd" style="margin-right:48px;margin-left:20px;width:360px;">
        </el-date-picker>
        <b class="btn" @click="getSendTrend">搜索</b>
        <el-button style="float:right" @click="downFailLog">下载失败日志</el-button>
      </div>
      <div class="sendChart" ref="sendChart"></div>
    </div>
    <ul class="operate">
      <li>
        <h2>短信模板
          <i class="el-icon-circle-plus model" @click="$router.push({name: 'addModel'})"></i>
        </h2>
        <div>
          <strong>{{ topInfoObj.templateCount || 0 }}</strong>
          <span>(可用)</span>
          <b class="small-btn" @click="$router.push({name: 'modelManger'})">查看</b>
        </div>
      </li>
      <li>
        <h2>短信签名
          <i class="el-icon-circle-plus sign" @click="$router.push({name: 'addSign'})"></i>
        </h2>
        <div>
          <strong>{{ topInfoObj.signCount || 0 }}</strong>
          <span>(可用)</span>
          <b class="small-btn" @click="$router.push({name: 'manger'})">查看</b>
        </div>
      </li>
      <li>
        <h2>发送短信</h2>
        <div>
          <a class="radius-btn" @click="$router.push({name: 'sendInfo'})">营销短信</a>
          <a class="radius-btn orange" @click="$router.push({name: 'marketEffectSend'})">效果跟踪短信</a>
        </div>
      </li>
    </ul>
    <orderBill style="margin:16px 0 0"></orderBill>
    <div class="alerts">
      <el-dialog title="短信模板列表" :visible.sync="showModel" :modal-append-to-body="false" width="600px">
        <div class="list">
          <el-table :data="modelArr" class="border" style="width: 100%;border:1px solid #C0CCDA">
            <el-table-column prop="code" label="模板CODE" align="center">
            </el-table-column>
            <el-table-column prop="modelName" label="模板名称" align="center">
            </el-table-column>
            <el-table-column prop="modelType" label="模板类型" align="center">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer pager">
          <el-pagination background layout="prev, pager, next" :total="50">
          </el-pagination>
        </span>
      </el-dialog>
      <el-dialog title="短信签名列表" :visible.sync="showSign" :modal-append-to-body="false" width="600px">
        <div class="list">
          <el-table :data="signArr" class="border" style="width: 100%;border:1px solid #C0CCDA">
            <el-table-column prop="signName" label="签名名称" align="center">
            </el-table-column>
            <el-table-column prop="signType" label="签名类型" align="center">
            </el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer pager">
          <el-pagination background layout="prev, pager, next" :total="50">
          </el-pagination>
        </span>
      </el-dialog>
      <el-dialog title="修改余额提醒值" :visible.sync="showLeftMoney" :modal-append-to-body="false" width="600px">
        <div class="list tips">
          <span>余额提醒值</span>
          <el-input v-model="lestMoneyTip" type="number" style="width:300px;" placeholder="请输入内容"></el-input>
          <span>元</span>
          <p>当账户余额低于提醒值时，您会收到提醒短信。</p>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showLeftMoney = false">取 消</el-button>
          <el-button type="primary" @click="sureToAlertNum">确 定</el-button>
        </span>
      </el-dialog>
    </div>
    <div class="confirm" v-if="this.userInfo.status===2">
      <div class="cont">
        <div class="top">
          <i class="qiye"></i>
          <div>
            <p>请您先认证企业短信</p>
            <p>若您已提交信息，请耐心等待平台审核</p>
            <p>平台联系方式：
              <span class="blue">1337384556552</span>
            </p>
          </div>
        </div>
        <div class="bottom">
          <router-link :to="{name:'certification'}">
            <span class="btn">去认证</span>
          </router-link>
        </div>
      </div>
    </div>
    <!-- 审核未通过 -->
    <div class="confirm" v-if="this.userInfo.status===0">
      <div class="cont">
        <div class="top">
          <i class="qiye"></i>
          <div>
            <p>您的认证不通过请修改后再提交</p>
            <p>原因:营业执照不清晰</p>
            <p>平台联系方式：
              <span class="blue">1337384556552</span>
            </p>
          </div>
        </div>
        <div class="bottom">
          <router-link :to="{name:'certificationChange'}">
            <span class="btn">去修改</span>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts'
import { mapGetters } from 'vuex'
import OrderBill from '../orders/orders'
export default {
  name: 'index',
  components: {
    OrderBill
  },
  data () {
    return {
      sendDetaildMonth: '',
      monthOrder: '',
      msgType: '2',
      acTime: '',
      // 顶部信息对象
      topInfoObj: {},
      // 发送情况对象
      sendInfoObj: {},
      // 余额提醒值
      lestMoneyTip: '',
      currentPage1: 1,
      showModel: false,
      showSign: false,
      showLeftMoney: false,
      msgOption1: {
        tooltip: {
          trigger: 'item',
          position: function (p) {
            return [p[0] + 10, p[1] - 10]
          },
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '系统短信',
            type: 'pie',
            radius: ['55%', '84%'],
            center: ['100px', '50%'],
            color: ['#40B6FF', '#B8E3FE'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '发送成功数' },
              { value: 0, name: '发送失败数' }
            ]
          }
        ]
      },
      msgOption2: {
        tooltip: {
          trigger: 'item',
          position: function (p) {
            return [p[0] + 10, p[1] - 10]
          },
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '营销短信',
            type: 'pie',
            radius: ['55%', '84%'],
            center: ['100px', '50%'],
            color: ['#FF9F00', '#FED590'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '12',
                  fontWeight: 'bold'
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              { value: 0, name: '发送成功数' },
              { value: 0, name: '发送失败数' }
            ]
          }
        ]
      },
      sendOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['发送总数', '成功数量']
        },
        toolbox: {
          show: false,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            dataView: { readOnly: false },
            magicType: { type: ['line', 'bar'] },
            restore: {},
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0', '9-8', '9-9', '9-10', '9-11', '9-12', '9-13']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '发送总数',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#029E4A'
              }
            },
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          {
            name: '成功数量',
            type: 'line',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#40B6FF'
              }
            },
            data: [1, 4, 2, 5, 3, 2, 9]
          }
        ]
      },
      orderArr: [{
        time: '2016-05-02',
        countType: '扣费',
        orderType: '消费',
        countMoney: '10.59',
        orderStatus: '已扣费',
        countNum: '5'
      }],
      modelArr: [{
        code: 'SMS_70335616',
        modelName: '验证码通用模版',
        modelType: '验证码模板'
      }, {
        code: 'SMS_70335616',
        modelName: '通知短信通用模版',
        modelType: '通知模板'
      }],
      signArr: [{
        signName: '使用报到',
        signType: '验证码或同孩子短信'
      }]
    }
  },
  computed: {
    initTime: function () {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() - 0 + 1
      if (month < 10) {
        month = '0' + month
      }
      let postMonth = year + '' + month
      return postMonth
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    initCharts () {
      this.$refs.msg1.style.height = '120px'
      this.$refs.msg2.style.height = '120px'
      this.$refs.sendChart.style.height = '470px'
      let msg1 = echarts.init(this.$refs.msg1)
      let msg2 = echarts.init(this.$refs.msg2)
      let sendChart = echarts.init(this.$refs.sendChart)
      msg1.setOption(this.msgOption1)
      msg2.setOption(this.msgOption2)
      sendChart.setOption(this.sendOption)
    },
    // 获取顶部信息
    getInfo () {
      this.$ajax.post('/api/homepage/getAccountCurrentInfo', {
        userId: this.userInfo.userId,
        month: this.initTime
      }).then((data) => {
        if (data.data.code === '200') {
          this.topInfoObj = data.data.data
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
    // 获取发送情况
    getSendInfo () {
      this.$ajax.post('/api/homepage/getAccountCurrentInfo', {
        userId: this.userInfo.userId,
        month: this.sendDetaildMonth
      }).then((data) => {
        if (data.data.code === '200') {
          let res = data.data.data
          this.sendInfoObj = res
          this.msgOption1.series[0].data[0].value = res.systemSuccessCount
          this.msgOption1.series[0].data[1].value = res.systemSendCount - res.systemSuccessCount
          this.msgOption2.series[0].data[0].value = res.marketSuccessCount
          this.msgOption2.series[0].data[1].value = res.marketSendCount - res.marketSuccessCount
          this.initCharts()
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
    // 获取发送趋势数据
    getSendTrend () {
      this.$ajax.post('/api/homepage/getByTypeTime', {
        userId: this.userInfo.userId,
        startDay: this.acTime[0],
        endDay: this.acTime[1],
        type: this.msgType
      }).then((data) => {
        if (data.data.code === '200') {
          let res = data.data.data
          let xData = []
          let aNum = []
          let sNum = []
          if (res.length === 0) {
            xData = [0]
            aNum = [0]
            sNum = [0]
          } else {
            for (let i of res) {
              xData.push(i.hour)
              aNum.push(i.quireNum)
              sNum.push(i.successNum)
            }
          }
          this.sendOption.xAxis.data = xData
          this.sendOption.series[0].data = aNum
          this.sendOption.series[1].data = sNum
          this.initCharts()
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
    // 修改预警值
    sureToAlertNum () {
      if (this.lestMoneyTip) {
        this.$ajax.post('/api/homepage/setAlarmMoney', {
          userId: this.userInfo.userId,
          amount: this.lestMoneyTip
        }).then((data) => {
          if (data.data.code === '200') {
            this.$message({
              message: '设置成功!',
              type: 'success'
            })
            this.showLeftMoney = false
            this.getInfo()
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
    },
    // 下载失败日志
    downFailLog () {
      window.open('/api/homepage/downloadFail')
      // this.$ajax.get('/api/account/getMessagePrice', {
      // }).then((data) => {
      //   if (data.data.code === '200') {
      //   }
      // }).catch(() => {
      //   this.$message.error('服务器错误！')
      // })
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    this.sendDetaildMonth = this.initTime
    this.getInfo()
    this.getSendInfo()
    this.getSendTrend()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.index
  padding 16px
  position relative
  .top
    display flex
    li
      flex 1
      display flex
      margin-right 15px
      box-shadow 0 1px 4px rgba(0, 0, 0, 0.12)
      &:last-child
        margin-right 0
      .left
        width 48px
        height 100%
        background #FF3341
        display table
        text-align center
        i
          display table-cell
          vertical-align middle
          font-size 24px
          color #ffffff
      .right
        flex 1
        padding 14px 32px
        background #ffffff
        p
          line-height 30px
          font-size 12px
          color #525f75
          strong
            font-size 20px
            color #40B6FF
            margin-right 20px
          span
            padding-right 6px
            margin-right 6px
            border-right 1px solid #525f75
            &:last-child
              padding 0
              margin 0
              border none
              cursor default
            &:last-child:hover
              color #525f75
              cursor default
          span.link:hover
            cursor pointer
            color #40B6FF
  .title
    height 40px
    line-height 40px
    font-size 16px
    font-weight bold
    padding-left 20px
    color #525F75
    box-shadow 0 1px 0 #E8EBF0
  .sendDetail
    margin-top 16px
    background #ffffff
    .datePick
      float right
    .msgType
      display flex
      .msgDetail
        flex 1
        padding 16px 20px
        &:first-child
          box-shadow 1px 0 0 #E8EBF0
        .link:hover
          cursor pointer
          color #40B6FF
        h3
          font-size 14px
          color #525F75
          span
            float right
            font-size 12px
            color #99A9BF
        .chartWrap
          display flex
          >div
            flex 1
            padding 20px
            vertical-align bottom
            p
              font-size 14px
              line-height 30px
              i
                display inline-block
                width 0
                height 0
                border-width 6px
                border-style solid
                margin-right 10px
              span
                color #93A2BA
              b
                color #4A566D
          .charts
            width 100px
  .sendPre
    background #ffffff
    margin-top 16px
    .search
      padding 16px 20px
      margin-bottom 20px
      span
        font-size 14px
        color #525F75
  .operate
    padding 20px 0
    margin-top 16px
    background #ffffff
    display flex
    li
      flex 1
      box-shadow -1px 0 0 #E8EBF0
      padding-left 40px
      padding-right 40px
      h2
        font-size 18px
        color #525F75
        margin-bottom 18px
        i
          float right
          position relative
          color #40B6FF
          cursor pointer
          &:hover:after
            content '添加短信模板'
            position absolute
            top 20px
            right 0
            height 30px
            width 104px
            background #40B6FF
            font-size 12px
            line-height 30px
            color #ffffff
            text-align center
            box-shadow 0 2px 4px rgba(64, 182, 255, 0.65)
        .sign:hover:after
          content '添加短信签名'
      >div
        text-align center
        strong
          font-size 32px
          color #4A566D
        span
          font-size 14px
          color #93A2BA
          margin-right 22px
        a.orange
          background #FF9F00
          box-shadow 0 2px 6px rgba(255, 159, 0, 0.48)
          margin-left 20px
  .orders
    background #ffffff
    margin-top 16px
    .search
      padding 16px 20px
      span
        font-size 16px
        line-height 40px
        color #525F75
        margin-right 20px
    .cont
      padding 10px 20px 20px
      h3
        font-size 12px
        color #4A566D
        margin-bottom 14px
        span
          font-size 20px
          color #FB203A
  .alerts
    .list
      padding 0 20px
    .tips
      color #525F75
      span
        font-size 14px
        margin-right 20px
        margin-left 10px
      p
        font-size 12px
        line-height 30px
        padding-left 100px
  .confirm
    position absolute
    top 0
    left 0
    width 100%
    height 100%
    background rgba(2, 2, 2, 0.1)
    .cont
      padding 50px 100px
      position absolute
      top 320px
      left 0
      right 0
      margin 0 auto
      width 600px
      box-sizing border-box
      background #ffffff
      box-shadow 0 1px 5px rgba(0, 0, 0, 0.2)
      i
        display inline-block
        width 74px
        height 74px
      .top>div
        display inline-block
        margin-left 30px
        p
          font-size 16px
          color #414C62
          line-height 26px
          span
            color #3EAFFF
            font-weight bold
      .bottom
        text-align center
        margin-top 32px
</style>