<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取填票项目"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled" width="320px"
               url="/webresources/login/code/SbcMiscTicket/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'miscTicketCode', order: 'ascending'}">
    <el-table-column   align="left" header-align="center" label="代码" prop="miscTicketCode" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="名称" prop="miscTicketName" sortable></el-table-column>
  </hd-grid-sel>
</template>
<script>

  export default {
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String, idVal :String, smiscId: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('selFlag', '1')
        this.hdQuery.add('smiscId', this.smiscId);
      },
      doClick(row) {
        this.$emit('update:txtVal', row.miscTicketName)
        this.$emit('update:idVal', row.smticketId)
      }
    }
  }
</script>
