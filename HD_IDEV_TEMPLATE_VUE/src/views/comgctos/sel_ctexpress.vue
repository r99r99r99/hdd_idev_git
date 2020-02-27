<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选表达式"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/CtExpress/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'expName', order: 'ascending'}">
    <el-table-column  align="left" header-align="center" label="名称" prop="expName" sortable></el-table-column>
    <el-table-column  width="250px"  align="left" header-align="center" label="内容" prop="expContent" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selctexpress',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
      },
      doClick(row) {
        this.$emit('update:txtVal', row.expName)
        this.$emit('update:idVal', row.expId)
      }
    }
  }
</script>


