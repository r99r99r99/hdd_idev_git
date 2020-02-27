<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" :placeholder="placeholder?placeholder:'请点击选取'"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/charge/ProtocolCharge/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'seq', order: 'ascending'}">
    <el-table-column  width="60px" align="left" header-align="center" label="序号" prop="seq" sortable noEdit></el-table-column>
    <el-table-column  align="left" header-align="center" label="费目" prop="sccodeId" sortable :input="require('@/views/comgctos/sel_sbcchargecode').default" txtVal="sccodeIdStr" idVal="sccodeId"></el-table-column>
  </hd-grid-sel>
</template>

<script>
    export default {
        name: "sel_protocolcharge",
      data() {
        return {
          hdQuery: new HdQuery(this)
        }
      },
      mounted() {
      },
      props: {txtVal: String, idVal: String, disabled: Boolean, placeholder: String, sprotocolId: String},// 设置value为props属�??-必须
      methods: {
        beforeQuery(val) {
          this.hdQuery.query.anyQuery = val
          this.hdQuery.query.sprotocolId = this.sprotocolId
          this.hdQuery.add('ifendFlag', '0');
        },
        doClick(row) {
          this.$emit('update:txtVal', row.sccodeIdStr)
          this.$emit('update:idVal', row.pchargeId)
        }
      }
    }
</script>

<style scoped>

</style>
