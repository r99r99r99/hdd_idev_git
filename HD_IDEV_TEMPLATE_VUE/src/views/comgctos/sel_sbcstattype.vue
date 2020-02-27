<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="停时原因"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcStatType/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'shipStatCode', order: 'ascending'}">
    <el-table-column width="140px"  align="left" header-align="center"  label="代码" prop="statTypeCode" sortable></el-table-column>
    <el-table-column  width="200px" align="left" header-align="center" label="名称" prop="statTypeName" sortable></el-table-column>

  </hd-grid-sel>
</template>

<script>


  export default {
    name: 'clientCode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String,idVal :String,disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
      },
      doClick(row) {
        this.$emit('update:txtVal', row.statTypeName)
        this.$emit('update:idVal', row.sstypeId)
      }
    }

  }
</script>


