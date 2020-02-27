<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取机类" height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcEquipKind/find" @rowClick="doClick" :beforeQuery="beforeQuery" pageHide :defaultSort="{prop: 'kindCode', order: 'ascending'}">
    <el-table-column width="100px"  align="left" header-align="center" label="代码" prop="kindCode" sortable></el-table-column>
    <el-table-column width="140px" align="left" header-align="center" label="名称" prop="kindName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selsbcequipkind',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      // this.doQuery()
    },
    props: {idVal: String, txtVal: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.kindName)
        this.$emit('update:idVal', row.sekindId)
      }
    }

  }
</script>

<style>

  .el-popper {
    z-index: 3000 !important;
  }
</style>
