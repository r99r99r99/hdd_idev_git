<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取"
               height="50vh" width="300px" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcPort/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'portCode', order: 'ascending'}">
    <el-table-column width="120px" align="left" header-align="center" label="代码" prop="portCode" sortable></el-table-column>
    <el-table-column widhth="180px" align="left" header-align="center" label="名称" prop="portName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'portcode',
    components: {},
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
        this.$emit('update:txtVal', row.portName)
        this.$emit('update:idVal', row.sportId)
      }
    }
  }
</script>


