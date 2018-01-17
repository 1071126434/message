<template>
  <div class="orders">
    <h2>月账单</h2>
    <div class="cont">
      <div class="inputs">
        <span>月账单查询</span>
        <el-date-picker v-model="month" @change="monthChange" type="month" value-format="yyyy-MM" placeholder="选择日期" class="inp">
        </el-date-picker>
        <!-- <span class="btn">查询</span> -->
        <span class="download btn-b" @click="downOrder">下载账单</span>
      </div>
      <div class="changeBar">
        <span @click="changeIndex(1)" :class="{'active': activeIndex==1}">系统短信</span>
        <span @click="changeIndex(2)" :class="{'active': activeIndex==2}">营销短信</span>
      </div>
      <div v-if="activeIndex===1" class="count">
        <span>当月短信：
          <strong>{{ feeNumObj ? feeNumObj.count : 0 }}</strong>条
        </span>
        <span>当月费用：
          <strong>{{ feeNumObj ? feeNumObj.fee : 0 }}</strong>元
        </span>
        <span>预计优惠：
          <strong>{{ feeNumObj ? feeNumObj.saleNum * feeNumObj.discount : 0 }}</strong>元(预计在月终返还)
        </span>
      </div>
      <div v-else class="count">
        <span>当月短信：
          <strong>{{ feeNumObj ? feeNumObj.totalNum : 0 }}</strong>条
        </span>
        <span>当月费用：
          <strong>{{ feeNumObj ? feeNumObj.totalCost : 0 }}</strong>元
        </span>
        <span>预计优惠：
          <strong>{{ feeNumObj ? feeNumObj.totalDiscounts : 0 }}</strong>元(预计在月终返还)
        </span>
      </div>
      <lottie v-show="task"></lottie>
      <noCont v-if="searchArr.length==0"></noCont>
      <div class="tables" v-if="searchArr.length!=0 && activeIndex==1">
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
      <div class="tables" v-if="searchArr.length!=0 && activeIndex==2">
        <el-table :data="searchArr" style="width: 100%">
          <el-table-column prop="sendTime" label="消费时间" align="center">
          </el-table-column>
          <el-table-column prop="type" label="计费类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type==0 ? '营销短信' : scope.row.type==1 ? '高级营销短信' : '其他' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="orderType" label="订单类型" align="center">
            <template slot-scope="scope">
              <span>消费</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalCost" label="消费金额" align="center">
          </el-table-column>
          <el-table-column prop="status" label="订单状态" align="center">
            <template slot-scope="scope">
              <span class="tipSuccess">已扣费</span>
            </template>
          </el-table-column>
          <el-table-column prop="totalNum" label="累计用量（条）" align="center">
          </el-table-column>
        </el-table>
      </div>
      <div class="pager" v-if="searchArr.length!=0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="pageSizeArray" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { pageCommon } from '../../assets/js/mixin'
import NoCont from '../../base/noCont/noCont'
import lottie from '../../base/lottie/index'
export default {
  name: 'orders',
  mixins: [pageCommon],
  components: {
    NoCont,
    lottie
  },
  data () {
    return {
      currentPage: 1,
      activeIndex: 1,
      phone: '',
      msgType: '',
      month: '',
      task: false,
      // apiUrl: '/api/homepage/getMonthBillByMonth',
      searchArr: [],
      feeNumObj: {}
    }
  },
  computed: {
    apiUrl () {
      if (this.activeIndex === 1) {
        return '/api/homepage/getMonthBillByMonth'
      } else {
        return '/api/sms/getTaskListOfSpecifyMonth'
      }
    },
    params () {
      if (this.activeIndex === 1) {
        return {
          userId: this.userInfo.userId,
          month: this.month,
          pageNo: this.pageNo,
          pageSize: this.pageSize
        }
      } else {
        return {
          month: this.month + '-01',
          accountId: this.userInfo.userId,
          currPageNo: this.pageNo,
          limit: this.pageSize
        }
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    // 下载账单
    downOrder () {
      if (this.activeIndex === 1) {
        window.open(`/api/homepage/downloadMonthBill?month=${this.month}&account=${this.pageTotal}`)
      } else {
        window.open(`/api/sms/downloadMarketMonthBill?accountId=${this.userInfo.userId}&month=${this.month + '-01'}&currPageNo=1&limit=${this.pageTotal}`)
      }
    },
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
    // 切换类型
    changeIndex (index) {
      this.activeIndex = index
      this.getFeeNum()
      this.getList()
    },
    monthChange () {
      this.getList()
      this.getFeeNum()
    },
    // 获取优惠详情
    getFeeNum () {
      if (this.activeIndex === 1) {
        this.$ajax.post('/api/homepage/getCountMonthByMonth', {
          month: this.month,
          userId: this.userInfo.userId
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.feeNumObj = res.data.datas[0]
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch((error) => {
          this.$message.error(error)
        })
      } else {
        this.$ajax.post('/api/sms/getMarketSummaryOfSpecifyMonth', {
          month: this.month + '-01',
          accountId: this.userInfo.userId
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
      }
    },
    // 获取月账单
    setList (data) {
      this.searchArr = data
    }
  },
  mounted () {
    this.initTime()
    this.getFeeNum()
    this.getList()
    // this.getMarketList()
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
  .changeBar
    margin 20px 0 10px
    span
      display inline-block
      width 88px
      height 32px
      line-height 32px
      text-align center
      background rgba(64, 182, 255, 0.2)
      font-size 14px
      color #40B6FF
      font-weight bold
      cursor pointer
      margin-right 4px
    .active
      color #ffffff
      background #40B6FF
</style>