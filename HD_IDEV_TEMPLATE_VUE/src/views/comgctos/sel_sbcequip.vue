<template>
  <!--开发示例:pop选择的-->
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取机械"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcEquip/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'equipCode', order: 'ascending'}" >
    <el-table-column width="100px"  align="left" header-align="center" label="代码" prop="equipCode"></el-table-column>
    <el-table-column width="100px"  align="left" header-align="center" label="名称" prop="equipName"></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selectsbcequip',
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
        this.hdQuery.add('selFlag', '1');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.equipName)
        this.$emit('update:idVal', row.sequipId)
      }
    }
  }
</script>


