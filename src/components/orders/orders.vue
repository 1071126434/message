<template>
  <div class="orders">
    <h2>月账单</h2>
    <div class="cont">
      <div class="inputs">
        <span>月账单查询</span>
        <el-date-picker v-model="time" type="date" placeholder="选择日期" class="inp">
        </el-date-picker>
        <!-- <span class="btn">查询</span> -->
        <span class="download btn-b">下载账单</span>
      </div>
      <div class="count">
        <span>当月短信：
          <strong>68</strong>条
        </span>
        <span>当月费用：
          <strong>2.17</strong>元
        </span>
      </div>
      <div class="tables">
        <el-table :data="searchArr" style="width: 100%">
          <el-table-column prop="time" label="消费时间" align="center">
          </el-table-column>
          <el-table-column prop="payType" label="计费类型" align="center">
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" align="center">
          </el-table-column>
          <el-table-column prop="countMoney" label="消费金额" align="center">
          </el-table-column>
          <el-table-column prop="orderStatus" label="订单状态" align="center">
            <template slot-scope="scope">
              <span class="tipSuccess">已扣费</span>
            </template>
          </el-table-column>
          <el-table-column prop="countNum" label="累计用量（条）" align="center">
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
  name: 'orders',
  data () {
    return {
      currentPage: 1,
      phone: '',
      msgType: '',
      time: '',
      searchArr: [{
        time: '2017-9-5',
        payType: '扣费',
        orderType: '消费',
        countMoney: '100.59',
        orderStatus: '已扣费',
        countNum: '5'
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
.orders
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
      .download
        float right
    .count
      margin-top 20px
      span
        font-size 12px
        color #4A566D
        margin-right 48px
        strong
          font-size 20px
          color #FB203A
          margin 0 4px
    .tables
      margin-top 10px
      border 1px solid #BAC6DC
</style>