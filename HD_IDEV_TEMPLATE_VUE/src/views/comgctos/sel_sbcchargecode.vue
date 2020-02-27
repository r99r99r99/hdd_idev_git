<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcChargeCode/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'chargeCode', order: 'ascending'}">
    <el-table-column width="120px" align="left" header-align="center" label="代码" prop="chargeCode" sortable></el-table-column>
    <el-table-column widhth="280px" align="left" header-align="center" label="名称" prop="chargeName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
    export default {
        name: "sel_sbcchargecode",
        data() {
          return {
            hdQuery: new HdQuery(this)
          }
        },
        mounted() {
        },
        props: {txtVal: String, idVal: String, disabled: Boolean},// 设置value为props属�??-必须
        methods: {
          beforeQuery(val) {
            this.hdQuery.query.anyQuery = val
            this.hdQuery.add('ifendFlag', '0');
          },
          doClick(row) {
            this.$emit('update:txtVal', row.chargeName)
            this.$emit('update:idVal', row.sccodeId)
          }
        }
    }
</script>

<style scoped>

</style>
