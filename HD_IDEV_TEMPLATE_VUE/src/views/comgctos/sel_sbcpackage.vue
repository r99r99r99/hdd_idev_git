<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取包装"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcPackage/find" @rowClick="doClick" :beforeQuery="beforeQuery" pageHide :defaultSort="{prop: 'packageCode', order: 'ascending'}">
    <el-table-column width="100px"  align="left" header-align="center" label="代码" prop="packageCode" sortable></el-table-column>
    <el-table-column width="120px"  align="left" header-align="center" label="名称" prop="packageName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>


  export default {
    name: 'packagecode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String,idVal :String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.packageName)
        this.$emit('update:idVal', row.spackageId)
        this.$emit('onSelItem', {data:row}) // 主页面调用弹窗时添加
      }
    }

  }
</script>


