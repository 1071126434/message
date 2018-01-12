<template>
  <div class="modelManger">
    <h2>模板管理
      <span>注：一个企业最多申请
        <strong>10个</strong>模板
      </span>
    </h2>
    <div class="cont">
      <div class="add">
        <span class="btn" @click="$router.push({name: 'addModel'})">添加模板</span>
      </div>
      <div class="table">
        <el-table :data="modelArr">
          <el-table-column prop="code" label="模板CODE" align="center">
          </el-table-column>
          <el-table-column prop="name" label="模板名称" align="center">
          </el-table-column>
          <el-table-column prop="type" label="模板类型" align="center">
            <template slot-scope="scope">
              <span>{{ scope.row.type==1 ? '短信通知' : scope.row.type==2 ? '验证码' : scope.row.type==3 ? '推广短信' : '其他' }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="content" label="模板内容" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.content" placement="bottom">
                <span class="tooltipOverflow">{{ scope.row.content }}</span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="状态" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">审核中</span>
              <span v-if="scope.row.status==1">审核通过</span>
              <el-tooltip v-if="scope.row.status==2" class="item" popper-class="tooltipItem" effect="dark" :content="scope.row.errorInfo" placement="bottom">
                <span class="tooltipOverflow">不通过
                  <i class="el-icon-arrow-down"></i>
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
          <el-table-column prop="status" label="操作" align="center">
            <template slot-scope="scope">
              <span v-if="scope.row.status==0">-</span>
              <el-button v-if="scope.row.status==2" @click="handleClick(scope.row)" type="text" size="small" style="color: #36A5FF">修改</el-button>
              <el-button v-if="scope.row.status==1 || scope.row.status==2" @click="dele(scope.row)" type="text" size="small" style="color: #93A2BA">删除</el-button>
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
  name: 'modelManger',
  mixins: [pageCommon],
  data () {
    return {
      currentPage: 1,
      apiUrl: '/api/homepage/getTemplateList',
      modelArr: []
    }
  },
  computed: {
    params () {
      return {
        userId: this.userInfo.userId,
        pageNo: this.pageNo,
        pageSize: this.pageSize
      }
    },
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick (row) {
      console.log(row)
      sessionStorage.setItem('_fixModelInfo_', JSON.stringify(row))
      this.$router.push({ name: 'addModel', query: { fix: 1 } })
    },
    setList (data) {
      this.modelArr = data
    },
    // 删除模板
    dele (row) {
      this.$confirm('此操作将永久删除该模板, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$ajax.post('/api/template/deleteTemplate', {
          code: row.code
        }).then((data) => {
          let res = data.data
          if (res.code === '200') {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getList()
          } else {
            this.$message({
              message: res.message,
              type: 'warning'
            })
          }
        }).catch((error) => {
          this.$message.error(error)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.modelManger
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