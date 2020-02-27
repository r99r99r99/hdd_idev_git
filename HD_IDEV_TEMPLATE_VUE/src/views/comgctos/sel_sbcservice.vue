<template>
  <!--开发示例:pop选择的-->
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选航线" height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcService/find" @rowClick="doClick" :beforeQuery="beforeQuery" pageHide :defaultSort="{prop: 'serviceCode', order: 'ascending'}">
    <el-table-column width="80px" align="left" header-align="center" label="代码" prop="serviceCode" sortable></el-table-column>
    <el-table-column width="180px" align="left" header-align="center" label="名称" prop="serviceName" sortable></el-table-column>
  </hd-grid-sel>

</template>

<script>

  export default {
    name: 'selectsbcservice',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: {idVal: String, txtVal: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0')
      },
      doClick(row) {
        this.$emit('update:txtVal', row.serviceName)
        this.$emit('update:idVal', row.sserviceId)
      }
    }
  }
</script>


