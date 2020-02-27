<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取作业项目"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcMisc/find" @rowClick="doClick" :beforeQuery="beforeQuery" pageHide :defaultSort="{}">
    <el-table-column width="100px" align="left" header-align="center" label="代码" prop="miscCode" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="名称" prop="miscName" sortable></el-table-column>
  </hd-grid-sel>

</template>

<script>


  export default {
    name: 'misccode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: {txtVal: String, idVal: String, disabled: Boolean
    },
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.miscName)
        this.$emit('update:idVal', row.smiscId)
      }
    }
  }
</script>


