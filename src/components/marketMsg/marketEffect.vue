<template>
  <div class="boxWrap">
    <div class="market">
      <h1>营销短信</h1>
      <p class="right">该服务能够获取打开链接记录,需付费,服务费按条收费,每条发送成功的短信收费(包含服务费)为
        <span>0.045</span>元</p>
      <div class="line"></div>
      <ul class="search">
        <li>
          发送时间&nbsp;&nbsp;&nbsp;
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li>
          任务状态&nbsp;&nbsp;&nbsp;
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          关键字&nbsp;&nbsp;&nbsp;
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
          <el-table-column prop="click" label="点击人数" align="center">
          </el-table-column>
          <el-table-column align="center" label="操作">
            <template slot-scope="scope">
              <router-link :to="{name:'marketEffectDetail'}">
                <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">查看</el-button>
              </router-link>
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">日志</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'market',
  data () {
    return {
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
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5',
        click: 5
      }, {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5',
        click: 5
      },
      {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5',
        click: 5
      }]
    }
  },
  methods: {
    handleClick (val, index) {
      console.log(val, index)
      // this.dialogVisible = true
      // this.centerDialogVisible = true
      this.centerDialogVisibleDel = true
    },
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
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