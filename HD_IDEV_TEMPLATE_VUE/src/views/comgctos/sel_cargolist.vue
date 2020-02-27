<template>
  <!--开发示例:pop选择的-->
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取"
               height="50vh" :hdQuery="hdQuery"  :disabled="disabled"
               url="/webresources/login/com/sel/findCargoList" @rowClick="doClick" :beforeQuery="beforeQuery">
    <el-table-column width="100px" align="left" header-align="center" label="件号" prop="piecesNo" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="包装" prop="packageName" sortable></el-table-column>
    <el-table-column width="100px" align="right" header-align="center" label="件重" prop="piecesWgt" sortable></el-table-column>
    <el-table-column width="100px" align="right" header-align="center" label="件积" prop="piecesVol" sortable></el-table-column>
    <el-table-column width="100px" align="right" header-align="center" label="件数" prop="cargoNum" sortable></el-table-column>
    <el-table-column width="100px" align="right" header-align="center" label="重量" prop="cargoWgt" sortable></el-table-column>
    <el-table-column width="100px" align="right" header-align="center" label="体积" prop="cargoVol" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="规格" prop="format" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="产地" prop="originName" sortable></el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="品种" prop="mataCodeStr" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="残损" prop="ortCodeStr" sortable></el-table-column>
    <el-table-column width="150px" align="left" header-align="center" label="备注" prop="description" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
  export default {
    name: 'selcargolist',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, disabled: Boolean, indexRow: Object, cargoId: String},
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.query.cargoId = this.cargoId
      },
      doClick(row) {
        this.$emit('update:txtVal', row.cargoNo)
        this.$emit('update:idVal', row.clistId)
        this.$emit('selItem', row) // 主页面调用弹窗时添加
      }
    }

  }
</script>
