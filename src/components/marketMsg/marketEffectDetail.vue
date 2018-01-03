<template>
  <div class="marketEffectDetail">
    <div class="sendTop">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ name: 'marketEffectDetail' }">效果追踪短信</el-breadcrumb-item>
        <el-breadcrumb-item>查看详情</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='sendInfoContent'>
      <div class="top">
        <h1>发送营销短信</h1>
      </div>
      <div class="flex">
        <ul>
          <li>任务状态:
            <span style="color:#24D668">已发送</span>
          </li>
          <li>发送时间:
            <span>20174-11-55 12:00:00</span>
          </li>
          <li>任务号:
            <span>5445454444456546</span>
          </li>
          <li class="widthContent">短信内容:
            <span>拉夫卡是否好看是否开始恢复还是好客山东发is复活甲爱是否假房东阿双</span>
          </li>
        </ul>
        <ul>
          <li>上传成功数:
            <span>55条</span>
          </li>
          <li>发送成功数:
            <span>55条</span>
          </li>
          <li>上传失败数:
            <span>55条</span>
          </li>
          <li>发送成功率:
            <span>55条</span>
          </li>
        </ul>
        <ul>
          <li>发送总数:
            <span>55条</span>
          </li>
          <li>点击数:
            <span>55条</span>
          </li>
          <li>点击率:
            <span>55条</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 第二部分的内容 -->
    <div class="echart">
      <div class="time">
        <h4>各个时间段点击数</h4>
        <span>
          <i></i>点击人数</span>
      </div>
      <div class="echarts" ref="echarts"></div>
    </div>
    <!-- 第二部分的右侧 -->
    <div class="point">
      <h4>成功率</h4>
      <div class="line"></div>
      <p class="pointNum">
        <span @click="isCheack" :class="{'styleClass':isCheack_2}" class="one">点击率</span>
        <i @click="isCheack_1" :class="{'styleClass':isCheack_3}" class="one">发送成功率</i>
      </p>
      <div class="circular" ref="circular" v-show="pointOne"></div>
      <div class="sucessNum" ref="sucessNum" v-show="pointTwo"></div>
      <p class="totalCount">
        <span>
          发送成功总数:55条</span>&nbsp;&nbsp;
        <span>点击率:95%</span>
      </p>
    </div>
    <!-- 列表展示部分 -->
    <div class="infoList">
      <div class="market">
        <h1>点击详情</h1>
        <div class="line"></div>
        <ul class="search">
          <li>
            手机号&nbsp;&nbsp;
            <el-input v-model="input" placeholder="请输入手机号"></el-input>
          </li>
          <li>
            发送状态&nbsp;&nbsp;
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            是否打开链接&nbsp;&nbsp;
            <el-select v-model="value" placeholder="请选择">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary">搜索</el-button>
            <i class="el-icon-download"></i>
          </li>
        </ul>
        <div class="table">
          <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="sendCont" label="手机号" align="center">
            </el-table-column>
            <el-table-column prop="sendType" label="发送状态" align="center">
            </el-table-column>
            <el-table-column prop="creatTime" label="发送时间" align="center">
            </el-table-column>
            <el-table-column prop="sendTime" label="是否打开链接" align="center">
            </el-table-column>
            <el-table-column prop="taskState" label="打开链接时间" align="center">
            </el-table-column>
          </el-table>
        </div>
        <div class="page">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echart from 'echarts'
export default {
  name: 'marketEffectDetail',
  data () {
    return {
      isCheack_2: true,
      isCheack_3: false,
      pointOne: true,
      pointTwo: false,
      sendOption: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['0:00', '2:00', '4:00', '6:00', '8:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}'
          }
        },
        series: [
          {
            name: '点击数',
            type: 'line',
            symbol: 'none',
            smooth: true,
            itemStyle: {
              normal: {
                color: '#40B6FF'
              }
            },
            data: [1, 3, 2, 5, 3, 2, 0, 6, 10, 20, 30, 10, 6]
          }
        ]
      },
      setPiont: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: ['50%', '70%'],
            color: ['#40B6FF ', '#FF9F00'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '10',
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
              { value: 335, name: '点击率' },
              { value: 310, name: '发送成功率' }
            ]
          }
        ]
      },
      setSucess: {
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        series: [
          {
            name: '数据统计',
            type: 'pie',
            radius: ['50%', '70%'],
            color: ['#0F81EB ', '#4A55C1'],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: 'center'
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: '10',
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
              { value: 335, name: '发送失败率' },
              { value: 310, name: '发送成功率' }
            ]
          }
        ]
      },
      value6: '',
      input: '',
      currentPage4: 5,
      dialogVisible: false,
      centerDialogVisible: false,
      centerDialogVisibleDel: false,
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      tableData: [{
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成'
      }, {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成'
      },
      {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成'
      }]
    }
  },
  methods: {
    initEchart () {
      this.$refs.echarts.style.height = '300px'
      let sendChart = echart.init(this.$refs.echarts)
      sendChart.setOption(this.sendOption)
      this.$refs.circular.style.height = '200px'
      this.$refs.circular.style.width = '200px'
      let msg = echart.init(this.$refs.circular)
      msg.setOption(this.setPiont)
    },
    initTwo () {
      this.$refs.sucessNum.style.height = '200px'
      this.$refs.sucessNum.style.width = '200px'
      let msg1 = echart.init(this.$refs.sucessNum)
      msg1.setOption(this.setSucess)
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    isCheack () {
      this.isCheack_2 = true
      this.isCheack_3 = false
      this.pointOne = true
      this.pointTwo = false
    },
    isCheack_1 () {
      this.isCheack_3 = true
      this.isCheack_2 = false
      this.pointOne = false
      this.pointTwo = true
      this.initTwo()
    }
  },
  mounted () {
    this.initEchart()
    // this.initTwo()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.marketEffectDetail
  overflow hidden
  min-width 1200px
  .sendTop
    padding 12px 0px 12px 16px
    font-size 12px
  .sendInfoContent
    background #FFFFFF
    margin 0px 17px 0px 15px
    position relative
    overflow hidden
    .top
      border-bottom 1px solid #E8EBF0
      padding-bottom 12px
      margin-top 12px
      overflow hidden
      h1
        padding-left 20px
        float left
        font-size 16px
        color #525F75
    .flex
      display flex
      text-align left
      padding 16px 20px
      ul
        flex 1
        li
          margin-bottom 20px
          font-size 14px
          color #93A2BA
          span
            color #414C62
        .widthContent span
          width 200px
          display inline-block
          vertical-align top
  .echart
    background #FFFFFF
    margin 0px 17px 0px 15px
    margin-top 20px
    float left
    width 75%
    margin-bottom 16px
    .time
      padding 12px 20px
      overflow hidden
      color #525F75
      border-bottom 1px solid #E8EBF0
      h4
        font-size 16px
        font-weight 600
        float left
      span
        float right
        font-size 14px
        i
          height 1px
          width 30px
          background #40B6FF
          display inline-block
          vertical-align middle
          margin-right 6px
  .point
    background #FFFFFF
    padding-right 22px
    margin-top 20px
    float left
    width 20%
    height 340px
    .circular, .sucessNum
      text-align center
      margin-left 20%
      margin-top 30px
    h4
      font-size 16px
      color #525f75
      font-weight 600
      padding 12px 20px
    .line
      border-bottom 1px solid #E8EBF0
    .one
      width 94px
      height 24px
      background rgba(64, 182, 255, 0.2)
      font-size 14px
      color #40B6FF
      display inline-block
      line-height 24px
      text-align center
      margin 16px 0px 0px 16px
      cursor pointer
    .styleClass
      display inline-block
      width 94px
      height 24px
      background #40B6FF
      font-size 14px
      color #ffffff
      line-height 24px
      text-align center
      margin 16px 0px 0px 16px
      cursor pointer
    .totalCount
      text-align center
      margin-left 50px
      font-size 14px
      color #525F75
  .infoList
    background #FFFFFF
    margin 16px
    position relative
    overflow hidden
    clear both
    h1
      padding 12px 0px 12px 20px
      float left
      color #525F75
      font-size 16px
      font-weight 600
    .line
      height 1px
      background #E8EBF0
      width 100%
      clear both
    .search
      padding 16px 0px 12px 20px
      font-size 14px
      color #5E6D82
      li
        float left
        margin-right 48px
        .el-icon-download
          font-size 30px
          vertical-align top
          background rgba(64, 182, 255, 0.2)
          padding 5px
          border-radius 2px
          cursor pointer
    .btns
      clear both
      padding 16px 20px 20px 20px
    .table
      margin 22px 20px
      border 1px solid #E8EBF0
      margin-top 50px
    .page
      float right
      padding 38px 20px 164px 0px
    .taskDetail
      font-size 14px
      color #525F75
      padding 0px 43px 32px 43px
      li
        padding-bottom 20px
</style>