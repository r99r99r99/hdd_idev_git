<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="停时原因"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcShipStat/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'shipStatCode', order: 'ascending'}">
    <el-table-column width="140px"  align="left" header-align="center"  label="代码" prop="shipStatCode" sortable></el-table-column>
    <el-table-column  width="200px" align="left" header-align="center" label="名称" prop="shipStatName" sortable></el-table-column>

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
    props: { txtVal: String,idVal :String,disabled: Boolean,filter: String},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('selFlag', '1');
        this.hdQuery.add('filter',this.filter)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shipStatName)
        this.$emit('update:idVal', row.ssstatId)
      }
    }

  }
</script>


