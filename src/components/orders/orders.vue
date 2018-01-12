<template>
  <div class="orders">
    <h2>月账单</h2>
    <div class="cont">
      <div class="inputs">
        <span>月账单查询</span>
        <el-date-picker v-model="month" @change="getList" type="month" value-format="yyyy-MM" placeholder="选择日期" class="inp">
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
          <el-table-column prop="feetype" label="计费类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.feetype==1 ? '通知短信' : scope.row.feetype==2 ? '验证码短信' : scope.row.feetype==3 ? '推广短信' : '其他' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" align="center">
            <template slot-scope="scope">
              <span>消费</span>
            </template>
          </el-table-column>
          <el-table-column prop="fee" label="消费金额" align="center">
          </el-table-column>
          <el-table-column prop="status" label="订单状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0" class="tipError">未扣费</span>
              <span v-if="scope.row.status==1" class="tipSuccess">已扣费</span>
            </template>
          </el-table-column>
          <el-table-column prop="count" label="累计用量（条）" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
export default {
  name: 'orders',
  mixins: [pageCommon],
  data () {
    return {
      currentPage: 1,
      phone: '',
      msgType: '',
      month: '',
      apiUrl: '/api/homepage/getMonthBillByMonth',
      searchArr: [],
      feeNumObj: {}
    }
  },
  computed: {
    params () {
      return {
        userId: this.userInfo.userId,
        month: this.month,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 初始化时间
    initTime () {
      let time = new Date()
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      if (month < 10) {
        month = '0' + month
      }
      this.month = year + '-' + month
      this.getList()
    },
    getFeeNum () {
      this.$ajax.post('/api/homepage/getCountMonthByMonth', {
        month: this.month,
        userId: this.userInfo.userId
      }).then((data) => {
        let res = data.data
        if (res.code === '200') {
          this.feeNumObj = res.data
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch((error) => {
        this.$message.error(error)
      })
    },
    // 获取月账单
    setList (data) {
      this.searchArr = data
    }
  },
  mounted () {
    this.initTime()
    this.getFeeNum()
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