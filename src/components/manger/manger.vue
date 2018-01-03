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
          <el-table-column prop="status" label="状态" align="center" v-if="1">
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center" v-if="0">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.status" placement="bottom">
                <span class="tooltipOverflow">不通过∨</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作" align="center">
            <template slot-scope="scope">
              <el-button @click="handleClick(scope.row)" type="text" size="small" style="color: #36A5FF">修改</el-button>
              <el-button type="text" size="small" style="color: #93A2BA">删除</el-button>
            </template>
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
  name: 'manger',
  data () {
    return {
      currentPage: 1,
      modelArr: [{
        signName: '注册验证码',
        signType: '验证码',
        status: '已通过'
      }]
    }
  },
  methods: {
    handleClick (row) {
      console.log(row)
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