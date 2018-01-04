<template>
  <div class="search">
    <h2>短信查询</h2>
    <div class="cont">
      <div class="inputs">
        <span>接受号码</span>
        <el-input v-model="phone" placeholder="填写手机号" class="inp" style="width:150px"></el-input>
        <span>短信类型</span>
        <el-select v-model="msgType" placeholder="请选择" class="inp">
          <el-option label="通知" value="0">
          </el-option>
          <el-option label="验证码" value="1">
          </el-option>
          <el-option label="营销短信" value="2">
          </el-option>
        </el-select>
        <span>活动时间</span>
        <el-date-picker v-model="time" type="date" placeholder="选择日期" class="inp">
        </el-date-picker>
        <span class="btn">查询</span>
      </div>
      <div class="tables">
        <el-table :data="searchArr" style="width: 100%">
          <el-table-column prop="phone" label="接收号码" align="center">
          </el-table-column>
          <el-table-column prop="type" label="短信类型" align="center">
          </el-table-column>
          <el-table-column prop="cont" label="内容" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.cont" placement="bottom">
                <span class="tooltipOverflow">{{ scope.row.cont }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[100, 200, 300, 400]" :page-size="100" layout="total, sizes, prev, pager, next, jumper" :total="400">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'search',
  data () {
    return {
      currentPage: 1,
      phone: '',
      msgType: '1',
      time: '',
      searchArr: [{
        phone: '186671899665',
        type: '通知',
        cont: '杰斯积分算法发师傅i撒谎发u斯哈随风',
        date: '2017-9-5',
        status: '成功'
      }]
    }
  },
  methods: {
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
.search
  min-height 600px
  margin 16px 20px
  background #ffffff
  h2
    font-size 16px
    line-height 40px
    color #525F75
    font-weight bold
    padding 0 20px
    box-shadow 0 1px 0 #E8EBF0
  .cont
    padding 16px 20px
    .inputs
      font-size 14px
      color #5E6D82
      .inp
        width 175px
        margin-left 12px
        margin-right 48px
    .tables
      margin-top 20px
      border 1px solid #BAC6DC
</style>