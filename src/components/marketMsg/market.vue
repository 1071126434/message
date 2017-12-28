<template>
  <div class="boxWrap">
    <div class="market">
      <h1>营销短信</h1>
      <div class="line"></div>
      <ul>
        <li>
          发送时间
          <el-date-picker v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
          </el-date-picker>
        </li>
        <li>
          任务状态
          <el-select v-model="value" placeholder="请选择">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </li>
        <li>
          关键字
          <el-input v-model="input" placeholder="请输入短信内容关键字"></el-input>
        </li>
        <li>
          <el-button type="primary">搜索</el-button>
        </li>
      </ul>
      <div class="btn">
        <el-button>导出</el-button>
        <el-button style="float:right">发送营销短信</el-button>
      </div>
      <div class="table">
        <el-table :data="tableData" style="width: 100%">
          <el-table-column prop="date" label="日期" align="center">
          </el-table-column>
          <el-table-column prop="name" label="姓名" align="center">
          </el-table-column>
          <el-table-column prop="address" label="地址" align="center">
          </el-table-column>
        </el-table>

      </div>
    </div>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  name: 'market',
  data () {
    return {
      value6: '',
      input: '',
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
        date: '2016-05-02',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1518 弄'
      }, {
        date: '2016-05-04',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1517 弄'
      }, {
        date: '2016-05-01',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1519 弄'
      }, {
        date: '2016-05-03',
        name: '王小虎',
        address: '上海市普陀区金沙江路 1516 弄'
      }]
    }
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.boxWrap
  background #FFFFFF
  margin 16px
  position relative
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
  ul
    padding 16px 0px 12px 20px
    li
      float left
      margin-right 48px
  .btn
    clear both
    padding 16px 20px 20px 20px
</style>