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
            <span style="color:#24D668">{{this.sellerInfo.taskState}}</span>
          </li>
          <li>发送时间:
            <span>{{this.sellerInfo.sendTime}}</span>
          </li>
          <li>任务号:
            <span>{{this.sellerInfo.taskId}}</span>
          </li>
          <li class="widthContent">短信内容:
            <span>{{this.sellerInfo.sendCont}}</span>
          </li>
        </ul>
        <ul>
          <li>发送总数:
            <span>{{this.sellerInfo.sendTotal}}条</span>
          </li>
          <li>发送成功数:
            <span>{{this.sellerInfo.successNum}}条</span>
          </li>
          <li>发送成功率:
            <!-- <span>{{this.$route.query.successNumLv|reverse}}%</span> -->
            <span>{{this.sellerInfo.successNumLv|reverse}}%</span>
          </li>
        </ul>
        <ul>
          <li>点击数:
            <span>{{this.sellerInfo.click}}条</span>
          </li>
          <li>点击率:
            <span>{{this.sellerInfo.clickLv|reverse}}%</span>
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
      <p class="totalCount" v-show="pointOne">
        <span>
          发送成功总数:{{this.sellerInfo.successNum}}条</span>&nbsp;&nbsp;
        <span>点击率:{{this.sellerInfo.clickLv |reverse}}%</span>
      </p>
      <p class="totalCount" v-show="pointTwo">
        <span>
          发送成功总数:{{this.sellerInfo.successNum}}条</span>&nbsp;&nbsp;
        <span>成功率:{{this.sellerInfo.successNumLv|reverse}}%</span>
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
              <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </li>
          <li>
            是否打开链接&nbsp;&nbsp;
            <el-select v-model="value1" placeholder="请选择">
              <el-option v-for="(item,index) in options1" :key="index" :label="item.label" :value="item.value1">
              </el-option>
            </el-select>
          </li>
          <li>
            <el-button type="primary" @click="search">搜索</el-button>
            <i class="el-icon-download" @click="exports"></i>
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
        <noCont v-if="this.tableData.length===0"></noCont>
        <div class="page" v-if="this.tableData.length!==0">
          <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import echart from 'echarts'
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
import noCont from '../../base/noCont/noCont'
export default {
  name: 'marketEffectDetail',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    Vue.filter('reverse', function (message) {
      if (message === 1) {
        return message + '00'
      } else {
        return message.toFixed(2) * 100
      }
    })
    return {
      isCheack_2: true,
      isCheack_3: false,
      pointOne: true,
      pointTwo: false,
      pageSize: 5,
      currentPage: 1,
      apiUrl: '/api/market/getWaitingSendSMS',
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
            data: [11, 11, 15, 13, 12, 13, 10, 5, 6, 7, 8]
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
            name: '点击率',
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
              { value: 10, name: '点击数' },
              { value: 50, name: '未点击数' }
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
            name: '发送成功率',
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
              { value: 335, name: '发送成功数' },
              { value: 310, name: '发送失败数' }
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
        value: '0',
        label: '待发送'
      }, {
        value: '1',
        label: '已发送'
      }, {
        value: '2',
        label: '发送成功'
      }, {
        value: '3',
        label: '发送失败'
      }],
      value: '',
      value1: '',
      options1: [{
        value1: '0',
        label: '否'
      }, {
        value1: '1',
        label: '是'
      }],
      tableData: []
    }
  },
  computed: {
    ...mapGetters([
      'sellerInfo'
    ]),
    params () {
      return {
        taskId: this.sellerInfo.taskId,
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        phoneNo: this.input,
        smsStatus: this.value,
        whetherOpenUrl: this.value1
      }
    }
  },
  created () {
    this.setPiont.series[0].data[0].value = this.sellerInfo.click
    this.setPiont.series[0].data[1].value = this.sellerInfo.successNum - this.sellerInfo.click
    this.setSucess.series[0].data[0].value = this.sellerInfo.successNum
    this.setSucess.series[0].data[1].value = this.sellerInfo.sendTotal - this.sellerInfo.successNum
    // console.log()
    this.$ajax.post('/api/market/getViewCountByTaskId', {
      taskId: this.sellerInfo.taskId,
      pageSize: 144,
      pageNo: 1
    }).then((data) => {
      console.log(data)
      let res = data.data
      if (res.code === '200') {
        let arr = []
        let arr1 = []
        for (let word of res.data.datas) {
          arr.push(word.pvNum)
          arr1.push((word.gmtModify).substr(11, 5))
        }
        this.sendOption.series[0].data = arr
        this.sendOption.xAxis.data = arr1
        this.initEchart()
        // console.log(this.sendOption.series[0].data, this.sendOption.xAxis.data)
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
    // console.log(this.sendOption.series[0].data, this.sendOption.xAxis.data)
  },
  methods: {
    exports () {
      window.open('/api/market/downloadTaskDetailByTaskId?taskId=' + this.sellerInfo.taskId + '&pageNo=' + this.pageNo + '&pageSize=' + this.pageSize + '&phoneNo=' + this.input + '&smsStatus' + this.value + '&whetherOpenUrl' + this.value1)
    },
    search () {
      this.getList()
    },
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
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          sendCont: word.phoneNo || '暂无数据',
          sendType: word.smsStatus === '0' ? '待发送' : word.smsStatus === '1' ? '已发送' : word.sendType === '2' ? '发送成功' : '发送失败',
          creatTime: word.sendTime || '暂无数据',
          sendTime: word.whetherOpenUrl === 0 ? '是' : '否',
          taskState: word.openUrlTime || '暂无数据'
        }
        arr.push(goods)
      }
      this.tableData = arr
    }
  },
  mounted () {
    this.initEchart()
    this.initTwo()
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