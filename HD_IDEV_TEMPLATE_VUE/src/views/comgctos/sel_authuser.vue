<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请选择"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/privilege/AuthUserExt/find" @rowClick="doClick" :beforeQuery="beforeQuery">
    <el-table-column width="100px"  align="left" header-align="center"  label="账号" prop="account" sortable></el-table-column>
    <el-table-column width="150px" align="left" header-align="center" label="姓名" prop="name" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selauthuser',
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
        this.$emit('update:txtVal', row.account)
        this.$emit('update:idVal', row.userId)
      }
    }
  }
</script>
