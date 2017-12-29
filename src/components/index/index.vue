<template>
  <div class="index" ref="index">
    <ul class="top">
      <li>
        <div class="left">

        </div>
        <div class="right">
          <p>账户余额(元)：
            <strong>￥21.21</strong>
            <b class="small-btn">充值</b>
          </p>
          <p>
            <span>收费标准</span>
            <span>查看账单</span>
            <span>余额预警：￥20.00</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left">

        </div>
        <div class="right">
          <p>今日发送成功数(条)：
            <strong>2134</strong>
          </p>
          <p>
            <span>累计：￥590.00</span>
          </p>
        </div>
      </li>
      <li>
        <div class="left">

        </div>
        <div class="right">
          <p>本月发送成功数(条)：
            <strong>2125462</strong>
          </p>
          <p>
            <span>累计：￥5290.00</span>
          </p>
        </div>
      </li>
    </ul>
    <div class="sendDetail">
      <h2 class="title">短信发送情况
        <el-date-picker class="datePick" style="width: 140px" v-model="sendDetaildMonth" type="month" placeholder="选择月">
        </el-date-picker>
      </h2>
      <div class="msgType">
        <div class="magDetail">
          <h3>系统短信
            <span class="link">接口调用说明
              <i class="el-icon-question"></i>
            </span>
          </h3>
          <div class="chartWrap">
            <div class="msg1 charts" style="height:100px" ref="msg1"></div>
            <div style="padding-top:40px">
              <p>
                <i></i>
                <span>发送成功数：</span>
                <b>12489条</b>
              </p>
              <p>
                <i></i>
                <span>发送失败数：</span>
                <b>12489条</b>
              </p>
              <p>
                <i></i>
                <span>系统发送总条</span>
                <b>12489条</b>
              </p>
            </div>
          </div>
        </div>
        <div class="magDetail">
          <h3>营销短信</h3>
          <div class="chartWrap">
            <div class="msg2 charts" style="height:100px" ref="msg2"></div>
            <div style="padding-top:40px">
              <p>
                <i></i>
                <span>发送成功数：</span>
                <b>12489条</b>
              </p>
              <p>
                <i></i>
                <span>发送失败数：</span>
                <b>12489条</b>
              </p>
              <p>
                <i></i>
                <span>系统发送总条</span>
                <b>12489条</b>
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
          <el-option label="全部" value="">
          </el-option>
        </el-select>
        <span>活动时间 </span>
        <el-date-picker v-model="acTime" type="date" placeholder="选择日期" style="margin-right:48px;margin-left:20px;width:150px;">
        </el-date-picker>
        <b class="btn">搜索</b>
        <el-button style="float:right">下载失败日志</el-button>
      </div>
      <div class="sendChart" ref="sendChart"></div>
    </div>
    <ul class="operate">
      <li>
        <h2>短信模板
          <i class="el-icon-circle-plus model"></i>
        </h2>
        <div>
          <strong>2</strong>
          <span>(可用)</span>
          <b class="small-btn" @click="showModel=true">查看</b>
        </div>
      </li>
      <li>
        <h2>短信签名
          <i class="el-icon-circle-plus sign"></i>
        </h2>
        <div>
          <strong>2</strong>
          <span>(可用)</span>
          <b class="small-btn">查看</b>
        </div>
      </li>
      <li>
        <h2>发送短信</h2>
        <div>
          <a class="radius-btn">营销短信</a>
          <a class="radius-btn orange">效果跟踪短信</a>
        </div>
      </li>
    </ul>
    <div class="orders">
      <h2 class="title">月账单</h2>
      <div class="search">
        <span>月账单查询</span>
        <el-date-picker v-model="monthOrder" type="month" placeholder="选择月">
        </el-date-picker>
        <el-button style="float:right">下载账单</el-button>
      </div>
      <div class="cont">
        <h3>当月短信：
          <span>68</span>&nbsp;&nbsp;条&nbsp;&nbsp;&nbsp;&nbsp;当前费用：
          <span>2.17</span>&nbsp;&nbsp;元
        </h3>
        <el-table :data="orderArr" style="width: 100%;border:1px solid #C0CCDA">
          <el-table-column prop="time" label="消费时间" align="center">
          </el-table-column>
          <el-table-column prop="countType" label="计费类型" align="center">
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" align="center">
          </el-table-column>
          <el-table-column prop="countMoney" label="消费" align="center">
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" align="center">
            <template slot-scope="scope">
              <span class="tipSuccess">{{ scope.row.orderStatus }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="countNum" label="累计用量 (条)" align="center">
          </el-table-column>
        </el-table>
        <div class="pager">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage1" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="alerts">
      <el-dialog title="提示" :visible.sync="showModel" :modal-append-to-body="false" width="600px">
        <span>这是一段信息</span>
        <span slot="footer" class="dialog-footer">
          <el-button @click="showModel = false">取 消</el-button>
          <el-button type="primary" @click="showModel = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echarts from 'echarts'
export default {
  name: 'index',
  data () {
    return {
      sendDetaildMonth: '',
      monthOrder: '',
      msgType: '',
      acTime: '',
      currentPage1: 1,
      showModel: false,
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
              { value: 12489, name: '发送成功数' },
              { value: 1289, name: '发送失败数' }
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
              { value: 12489, name: '发送成功数' },
              { value: 1289, name: '发送失败数' }
            ]
          }
        ]
      },
      sendOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['计划下单数', '实际下单数', '失败数量']
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
            name: '计划下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#029E4A'
              }
            },
            data: [11, 11, 15, 13, 12, 13, 10]
          },
          {
            name: '实际下单数',
            type: 'line',
            itemStyle: {
              normal: {
                color: '#40B6FF'
              }
            },
            data: [1, 4, 2, 5, 3, 2, 9]
          },
          {
            name: '失败数量',
            type: 'line',
            itemStyle: {
              normal: {
                color: 'transparent'
              }
            },
            data: [2, 5, 4, 6, 4, 3, 8]
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
      }]
    }
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
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    }
  },
  mounted () {
    this.initCharts()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.index
  padding 16px
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
        background #FF3341
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
            &:hover
              cursor pointer
              color #40B6FF
            &:last-child
              padding 0
              margin 0
              border none
              cursor default
            &:last-child:hover
              color #525f75
              cursor default
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
      .magDetail
        flex 1
        padding 16px 20px
        &:first-child
          box-shadow 1px 0 0 #E8EBF0
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
                width 10px
                height 10px
                background red
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
</style>