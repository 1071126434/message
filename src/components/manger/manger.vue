<template>
  <div class="manger">
    <h2>签名管理
      <span>注：一个企业最多申请
        <strong>5个</strong>签名
      </span>
    </h2>
    <div class="cont">
      <div class="add">
        <span class="btn" @click="$router.push({name: 'addSign'})">添加签名</span>
      </div>
      <div class="table">
        <el-table :data="modelArr">
          <el-table-column prop="signName" label="签名名称" align="center">
          </el-table-column>
          <el-table-column prop="signType" label="签名类型" align="center">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status===0">待审核</span>
              <span v-if="scope.row.status===1">审核通过</span>
              <el-tooltip v-if="scope.row.status===2" class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.remarks" placement="bottom">
                <span class="tooltipOverflow">不通过</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #36A5FF" v-show="scope.row.status===2">修改</el-button>
              <el-button type="text" size="small" style="color: #93A2BA" @click="detel(scope.row)" v-show="scope.row.status===2||scope.row.status===1">删除</el-button>
              <el-button type="text" size="small" style="color: #93A2BA" @click="detel(scope.row)" v-show="scope.row.status===0" disabled>--</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <noCont v-show="this.modelArr.length===0"></noCont>
      <div class="pager" v-show="this.modelArr.length!==0">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[10, 15, 20,25]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="pageTotal">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
import { pageCommon } from '../../assets/js/mixin'
import { mapGetters } from 'vuex'
import noCont from '../../base/noCont/noCont'
export default {
  name: 'manger',
  mixins: [pageCommon],
  components: {
    noCont
  },
  data () {
    return {
      currentPage: 1,
      modelArr: [],
      apiUrl: '/api/homepage/getSignList',
      pageTotal: 0,
      pageSize5: 10
    }
  },
  computed: {
    params () {
      return {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        userId: this.userInfo.userId
      }
    },
    ...mapGetters([
      'userToken',
      'userInfo'
    ])
  },
  methods: {
    setList (data) {
      let arr = []
      for (let word of data) {
        let goods = {
          signName: word.sign || '暂无数据',
          signType: word.type === 3 ? '营销短信' : '系统短信' || '暂无数据',
          status: word.status,
          id: word.id,
          remarks: word.remarks
        }
        arr.push(goods)
      }
      this.modelArr = arr
    },
    // 签名删除的接口
    detel (modelArr) {
      console.log(modelArr)
      this.$ajax.post('/api/sign/deleteSign', {
        id: modelArr.id,
        accountId: this.userInfo.userId
      }).then(data => {
        console.log(data)
        if (data.data.code === '200') {
          this.$message({
            message: '删除成功',
            type: 'success'
          })
          this.getList()
        } else {
          this.$message({
            message: data.data.message,
            type: 'warning'
          })
        }
      }).catch(() => {
        this.$message.error('服务器错误！')
      })
    },
    // 签名修改的接口
    handleClick (val) {
      console.log(val)
      this.$router.push({ name: 'updata', query: { id: val.id } })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.manger
  margin 16px
  min-height 600px
  background #ffffff
  h2
    font-size 16px
    line-height 40px
    color #525F75
    font-weight bold
    padding 0 20px
    box-shadow 0 1px 0 #E8EBF0
    span
      float right
      font-size 12px
      color #4A566D
      strong
        color #FB203A
  .cont
    padding 16px 20px
    .table
      margin-top 20px
      border 1px solid #E8EBF0
</style>