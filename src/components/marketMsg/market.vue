<template>
  <div class="boxWrap">
    <div class="market">
      <h1>营销短信</h1>
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
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
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
        <router-link :to="{name:'sendInfo'}">
          <el-button>发送营销短信</el-button>
        </router-link>
        <el-button style="float:right">导出</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="sendCont" label="发送内容" align="center">
            <template slot-scope="scope">
              <el-tooltip effect="dark" placement="top">
                <div slot="content">{{ scope.row.sendCont }}</div>
                <p class="overHidden">{{ scope.row.sendCont }}</p>
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
              <!-- <el-button @click="handleNoClickNo(scope.$index, scope.row)" type="text" size="small">撤销</el-button>
              <el-button @click="handleClick(scope.$index, scope.row)" type="text" size="small">日志</el-button>
              <el-button @click="handleNoClickNo(scope.$index, scope.row)" type="text" size="small">删除</el-button> -->
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage4" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
    <!-- 点击查看的弹出框 -->
    <el-dialog title="任务详情" :visible.sync="dialogVisible" width="35%">
      <ul class="taskDetail">
        <li>任务号:
          <span>jifoiejfoaimfjlafmkolaf-5454654656</span>
        </li>
        <li>短信内容:
          <span>家里附近哦啊而非骄傲里附近啊</span>
        </li>
        <li>发送时间:
          <span>2017-11-29 11:11:14</span>
          <span style="float:right">任务状态:
            <em>发送完成</em>
          </span>
        </li>
        <li>
          <span>上传总数: 55条</span>
          <span style="float:right">上传成功数: 55条</span>
        </li>
        <li>
          <span>发送总数: 55条</span>
          <span style="float:right">发送成功数: 55条</span>
        </li>
        <li>
          <span>发送成功率: 55%</span>
          <span style="float:right">发送失败数: 55条</span>
        </li>
      </ul>
      <div style="width:100%;text-align:center">
        <button class="centerBtn">关闭</button>
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
        sendCont: 'hjdlfj梵蒂冈梵蒂冈的的说法都是sdfafas大是打发三分大师傅大沙发沙发大师傅oiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5'
      }, {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5'
      },
      {
        sendCont: 'hjdlfjoiejfo',
        sendType: '单挑发送',
        creatTime: '2019-10-10',
        sendTime: '2019-10-10',
        taskState: '发送完成',
        sendTotal: '2',
        sendNo: '5'
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