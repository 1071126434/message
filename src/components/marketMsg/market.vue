<template>
  <div class="boxWrap">
    <div class="market">
      <h1>营销短信</h1>
      <div class="line"></div>
      <ul class="search">
        <li>
          发送时间&nbsp; &nbsp;
          <el-date-picker v-model="value6" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
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
          <el-button type="primary" @click="searchBtn">搜索</el-button>
        </li>
      </ul>
      <div class="btns">
        <router-link :to="{name:'sendInfo'}">
          <el-button>发送营销短信</el-button>
        </router-link>
        <el-button style="float:right" @click="exports">导出</el-button>
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
              <el-button style="color:#40B6FF" @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              <el-button style="color:#99A9BF" v-show="scope.row.taskState==='待发送'" @click="handleNoClickNo(scope.$index, scope.row)" type="text" size="small">撤销</el-button>
              <el-button style="color:#99A9BF" v-show="scope.row.sendNo>0" @click="handleClickWork(scope.$index, scope.row)" type="text" size="small">日志</el-button>
              <el-button style="color:#99A9BF" v-show="scope.row.taskState==='已撤销'" @click="handleNoClickDele(scope.$index, scope.row)" type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <lottie v-show="task"></lottie>
      <noCont v-show="this.tableData.length===0"></noCont>
      <div class="pager" v-show="this.tableData.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
    <!-- 点击查看的弹出框 -->
    <el-dialog title="任务详情" :visible.sync="dialogVisible" width="35%">
      <ul class="taskDetail">
        <li>任务号:
          <span>{{details.taskId}}</span>
        </li>
        <li>短信内容:
          <span>{{details.sendCont}}</span>
        </li>
        <li>发送时间:
          <span>{{details.sendTime}}</span>
          <span style="float:right">任务状态:
            <em>{{details.taskState}}</em>
          </span>
        </li>
        <li>
          <span>发送总数: {{details.sendTotal}}条</span>
          <span style="float:right">发送成功数: {{details.sedSucess}}条</span>
        </li>
        <li>
          <span>发送成功率: {{details.sedSucessPer|reverse}}%</span>
          <span style="float:right">发送失败数: {{details.sendNo}}条</span>
        </li>
      </ul>
      <div style="width:100%;text-align:center">
        <button class="centerBtn" @click="dialogVisible = false">关闭</button>
      </div>
    </el-dialog>
    <!-- 撤销短息发送任务 -->
    <el-dialog title="撤销短息发送任务" :visible.sync="centerDialogVisible" width="40%" center>
      <p style="font-size:16px;color:#525F75;margin-top:24px;text-align:center">确认撤销短信发送任务?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 删除短信发送任务 -->
    <el-dialog title="删除短信发送任务" :visible.sync="centerDialogVisibleDel" width="40%" center>
      <p style="font-size:16px;color:#525F75;margin-top:24px;text-align:center">确认删除短信发送任务?</p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
import Vue from 'vue'
import { pageCommon } from '../../assets/js/mixin.js'
import { mapGetters } from 'vuex'
import noCont from '../../base/noCont/noCont'
import lottie from '../../base/lottie/index'
export default {
  name: 'market',
  mixins: [pageCommon],
  components: {
    noCont,
    lottie
  },
  data () {
    Vue.filter('reverse', function (message) {
      if (message === 1) {
        return message + '00'
      } else {
        return (message * 100).toFixed(2)
      }
    })
    return {
      value6: '',
      input: '',
      currentPage: 1,
      pageSize: 10,
      dialogVisible: false,
      centerDialogVisible: false,
      centerDialogVisibleDel: false,
      options: [
        {
          value: '',
          label: '全部'
        }, {
          value: '0',
          label: '待发送'
        }, {
          value: '1',
          label: '发送完成'
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
        type: '0',
        status: this.value,
        sendStartTime: this.value6 ? this.value6[0] : '',
        sendEndTime: this.value6 ? this.value6[1] : ''
      }
    }
  },
  methods: {
    // 当点击查看的时候触发的事件
    handleClick (index, val) {
      console.log(val)
      this.dialogVisible = true
      this.details = {
        taskId: val.taskId,
        sendCont: val.sendCont,
        sendTime: val.sendTime,
        taskState: val.taskState,
        sendTotal: val.sendTotal || 0,
        sedSucess: val.successNum || 0,
        sedSucessPer: val.successNum / val.sendTotal || 0,
        sendNo: val.sendNo || 0
      }
      // this.centerDialogVisible = true
      // this.centerDialogVisibleDel = true
    },
    // 当点击撤销的时候触发的事件
    handleNoClickNo (index, val) {
      this.$ajax.post('/api/sms/cancelTaskByTaskId', {
        taskId: val.taskId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '已成功撤销',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: '30分钟以内的短信不能进行撤销',
            type: 'warning'
          })
        }
      }).catch((err) => {
        console.log(err)
        this.$message.error('服务器错误！')
      })
    },
    // 当点击删除的时候进行删除
    handleNoClickDele (index, val) {
      console.log(val)
      this.$ajax.post('/api/sms/deleteTaskByTaskId', {
        taskId: val.taskId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.$message({
            message: '已成功删除',
            type: 'success'
          })
          this.getList()
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
    // 当点击下载的时候进行一个下载
    exports () {
      console.log(1111)
      let abc = window.open('/api/market/downloadNormalTasksByAccountId?accountId=' + this.userInfo.userId + '&sendStartTime=' + (this.value6 ? this.value6[0] : '') + '&sendEndTime=' + (this.value6 ? this.value6[1] : '') + '&status=' + this.value + '&type=0' + '&content=' + this.input + '&currPageNo=' + this.pageNo + '&limit=' + this.pageSize)
      console.log(abc)
    },
    searchBtn () {
      this.getList()
    },
    // 点击日志,下载失败的日志
    handleClickWork (index, val) {
      // console.log(val)
      window.open('/api/market/downloadTaskErrorDetailByTaskId?taskId=' + val.taskId)
    },
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          sendCont: word.content || '暂无数据',
          sendType: word.sendType === '0' && word.sendTimeType === '0' ? 'csv上传发送' : word.sendType === '0' && word.sendTimeType === '1' ? 'csv上传定时发送' : word.sendType === '1' && word.sendTimeType === '0' ? '单条发送' : '单条定时发送',
          creatTime: word.gmtCreate,
          sendTime: word.sendTime || '暂无数据',
          taskState: word.status === '0' ? '待发送' : word.status === '1' ? '发送完成' : '已撤销',
          sendTotal: word.totalNum,
          sendNo: word.failNum || 0,
          taskId: word.taskId,
          sign: word.sign,
          successNum: word.successNum,
          sendTimeType: word.sendTimeType
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
  min-width 1000px
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
      margin-right 27px
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