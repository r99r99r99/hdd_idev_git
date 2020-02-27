<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" :placeholder="placeholder?placeholder:'请点击选取'"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcProtocol/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'portCode', order: 'ascending'}">
    <el-table-column width="120px" align="left" header-align="center" label="代码" prop="proCode" sortable></el-table-column>
    <el-table-column widhth="280px" align="left" header-align="center" label="名称" prop="proName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
    export default {
      name: "sel_sbcprotocol",
      data() {
        return {
          hdQuery: new HdQuery(this)
        }
      },
      mounted() {
      },
      props: {txtVal: String, idVal: String, disabled: Boolean, placeholder: String},// 设置value为props属�??-必须
      methods: {
        beforeQuery(val) {
          this.hdQuery.query.anyQuery = val
          this.hdQuery.add('ifendFlag', '0');
        },
        doClick(row) {
          this.$emit('update:txtVal', row.proName)
          this.$emit('update:idVal', row.sprotocolId)
        }
      }
    }
</script>

<style scoped>

</style>
