<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选择"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcChargeProcess/find" @rowClick="doClick" :beforeQuery="beforeQuery" >
    <el-table-column width="130px" header-align="center" align="left" label="代码" prop="processCode" sortable></el-table-column>
    <el-table-column width="200px" header-align="center" align="left" label="名称" prop="processName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
    export default {
        name: "sel_sbcchargeprocess",
        components: {},
        data() {
          return {
            hdQuery: new HdQuery(this)
          }
        },
        mounted() {},
        props: {txtVal: String, idVal: String, disabled: Boolean},// 设置value为props属�??-必须
        methods: {
          beforeQuery(val) {
            this.hdQuery.query.anyQuery = val
            this.hdQuery.add('ifendFlag', '0');
          },
          doClick(row) {
            this.$emit('update:txtVal', row.processName)
            this.$emit('update:idVal', row.sfprocessId)
          }
        }
    }
</script>

<style scoped>

</style>
