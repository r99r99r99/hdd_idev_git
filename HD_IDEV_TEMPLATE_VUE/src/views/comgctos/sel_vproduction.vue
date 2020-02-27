<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选产地"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/VproductionInfo/find" @rowClick="doClick" :beforeQuery="beforeQuery" >
    <el-table-column width="100px"  align="left" header-align="center"  label="代码" prop="code" sortable></el-table-column>
    <el-table-column width="150px" align="left" header-align="center" label="名称" prop="name" sortable></el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="简称" prop="shortName" sortable></el-table-column>
  </hd-grid-sel>
</template>
<script>
  export default {
    name: 'cargocode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      this.hdQuery.sort=''
    },
    props: { txtVal: String,idVal :String,disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.id)
      }
    }
  }
</script>


