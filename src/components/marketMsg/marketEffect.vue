<template>
  <div class="boxWrap">
    <div class="market">
      <h1>营销短信</h1>
      <p class="right">该服务能够获取打开链接记录,需付费,服务费按条收费,每条发送成功的短信收费(包含服务费)为
        <span>0.045</span>元</p>
      <div class="line"></div>
      <ul class="search">
        <li>
          发送时间&nbsp; &nbsp;
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li>
          任务状态&nbsp; &nbsp;
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="(item,index) in options" :key="index" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          关键字&nbsp; &nbsp;
          <el-input v-model="input" placeholder="请输入短信内容关键字"></el-input>
        </li>
        <li>
          <el-button type="primary">搜索</el-button>
        </li>
      </ul>
      <div class="btns">
        <router-link :to="{name:'marketEffectSend'}">
          <el-button>发送营销短信</el-button>
        </router-link>
        <el-button style="float:right">导出</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="sendCont" label="发送内容" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.sendCont" placement="bottom">
                <span class="tooltipOverflow">{{ scope.row.sendCont }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="sendType" label="发送方式" align="center">
          </el-table-column>
          <el-table-column prop="creatTime" label="创建时间" align="center">
          </el-table-column>
          <el-table-column prop="sendTime" label="发送时间" align="center">
          </el-table-column>
          <el-table-column prop="taskState" label="任务状态" align="center">
          </el-table-column>
          <el-table-column prop="sendTotal" label="发送总数" align="center">
          </el-table-column>
          <el-table-column prop="sendNo" label="发送失败" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              <el-button v-show="scope.row.sendNo>0" @click="handleClickWork(scope.$index, scope.row)" type="text" size="small">日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin.js'
import { mapGetters } from 'vuex'
export default {
  name: 'market',
  mixins: [pageCommon],
  data () {
    return {
      value6: '',
      input: '',
      currentPage: 1,
      pageSize: 5,
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
        label: '已撤销'
      }],
      value: '',
      tableData: [],
      apiUrl: '/api/sms/getTaskListByCondition',
      details: {}
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'userToken'
    ]),
    params () {
      return {
        currPageNo: this.pageNo,
        limit: this.pageSize,
        content: this.input,
        accountId: this.userInfo.userId,
        type: '1',
        status: this.value,
        sendStartTime: this.value6[0] ? this.value6[0] : '',
        sendEndTime: this.value6[1] ? this.value6[1] : ''
      }
    }
  },
  methods: {
    // 当点击查看的时候触发的事件
    handleClick (index, val) {
      this.$router.push({ name: 'marketEffectDetail' })
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          sendCont: word.content || '暂无数据',
          sendType: word.sendType === '0' && word.sendTimeType === '0' ? 'csv上传发送' : word.sendType === '0' && word.sendTimeType === '1' ? 'csv上传定时发送' : word.sendType === '1' && word.sendTimeType === '0' ? '单条发送' : '单条定时发送',
          creatTime: word.gmtCreate,
          sendTime: word.gmtModify,
          taskState: word.status === '0' ? '待发送' : word.status === '1' ? '发送完成' : '已撤销',
          sendTotal: word.totalNum,
          sendNo: word.numPerSms,
          taskId: word.taskId,
          sign: word.sign
        }
        arr.push(goods)
      }
      this.tableData = arr
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.boxWrap
  background #FFFFFF
  margin 16px
  position relative
  overflow hidden
  min-width 1080px
  h1
    padding 12px 0px 12px 20px
    float left
    color #525F75
    font-size 16px
    font-weight 600
  .right
    float right
    font-size 12px
    color #4a556d
    margin-top 16px
    margin-right 15px
    span
      color #ff3341
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
  .btns
    clear both
    padding 16px 20px 20px 20px
  .table
    margin 0px 20px
    border 1px solid #E8EBF0
  .pager
    float right
    padding 38px 20px 164px 0px
  .taskDetail
    font-size 14px
    color #525F75
    padding 0px 43px 32px 43px
    li
      padding-bottom 20px
</style>