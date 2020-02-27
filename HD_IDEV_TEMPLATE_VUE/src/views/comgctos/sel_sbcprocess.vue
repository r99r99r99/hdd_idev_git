<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选操作过程"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled" pageHide
               url="/webresources/login/code/SbcProcess/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'processCode', order: 'ascending'}">
    <el-table-column width="80px"  align="left" header-align="center" label="代码" prop="processCode" sortable></el-table-column>
    <el-table-column width="120px"  align="left" header-align="center" label="名称" prop="processName" sortable></el-table-column>
  </hd-grid-sel>

</template>

<script>

  export default {
    name: 'selectsbcprocess',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: {idVal: String, txtVal: String,billFlag:String,disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0')
        this.hdQuery.add('billFlag', this.billFlag)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.processName)
        this.$emit('update:idVal', row.sprocessId)
      }
    }

  }
</script>


