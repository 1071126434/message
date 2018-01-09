<template>
  <div class="search">
    <h2>短信查询</h2>
    <div class="cont">
      <div class="inputs">
        <span>接受号码</span>
        <el-input v-model="phone" placeholder="填写手机号" class="inp" style="width:150px"></el-input>
        <span>短信类型</span>
        <el-select v-model="msgType" placeholder="请选择" class="inp">
          <el-option label="通知" value="1">
          </el-option>
          <el-option label="验证码" value="2">
          </el-option>
          <el-option label="营销短信" value="3">
          </el-option>
        </el-select>
        <span>活动时间</span>
        <el-date-picker v-model="time" type="date" placeholder="选择日期" class="inp" format="yyyy-MM-dd" value-format='yyyy-MM-dd'>
        </el-date-picker>
        <span class="btn" @click="search">查询</span>
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
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[5, 10, 15, 20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="totalCount">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
export default {
  name: 'search',
  data () {
    return {
      currentPage: 1,
      phone: '',
      msgType: '1',
      pageSize: 5,
      pageNo: 1,
      totalCount: 0,
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
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
    },
    search () {
      if (navigator.onLine) {
        console.log('online')
      } else {
        console.log('offline')
      }
      this.$ajax.post('/api/homepage/getByPhoneTypeTime', {
        phone: this.phone,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        type: this.msgType,
        userId: this.userInfo.userId,
        time: this.time
      }).then((data) => {
        let res = data.data
        this.totalCount = res.data.totalCount
        if (res.code === '200') {
          let arr = []
          // if (res.data) {
          for (let word of res.data.withdrawApplys) {
            let goods = {
              phone: word.userTelephone,
              moneyNum: word.actualAmount,
              bankNum: word.bankCardNo,
              bank: word.bankName,
              name: word.userName,
              time: word.gmtCreate,
              withdrawApplyId: word.withdrawApplyId,
              state: word.isExport === '0' ? '未导出' : '已导出',
              state1: word.isStoped,
              comment: word.comment,
              moneyType: word.withdrawType === '0' ? '本金提现' : '提前支取'
            }
            arr.push(goods)
          }
          // }
          this.tableDataBuy = arr
        } else {
          this.$message({
            message: res.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('网络错误，刷新下试试')
      })
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