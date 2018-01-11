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
        <span class="btn" @click="getList">查询</span>
      </div>
      <div class="tables">
        <el-table :data="searchArr" style="width: 100%">
          <el-table-column prop="telephone" label="接收号码" align="center">
          </el-table-column>
          <el-table-column prop="type" label="短信类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type==1 ? '通知短信' : scope.row.type==2 ? '验证码短信' : scope.row.type==3 ? '推广短信' : '其他' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="内容" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.content" placement="bottom">
                <span class="tooltipOverflow">{{ scope.row.content }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="receiveTime" label="日期" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.receiveTime || scope.row.responseTime }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.status == 1 ? '成功' : '失败' }}</span>
            </template>
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
  name: 'search',
  mixins: [pageCommon],
  data () {
    return {
      phone: '',
      msgType: '2',
      time: '',
      searchArr: [],
      apiUrl: '/api/homepage/getByPhoneTypeTime'
    }
  },
  computed: {
    params () {
      return {
        phone: this.phone,
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        type: this.msgType,
        userId: this.userInfo.userId,
        time: this.time
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    setList (data) {
      console.log(data)
      this.searchArr = data
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