<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选组织"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/AuthOrgnExt/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{}">
    <el-table-column width="100px"  align="left" header-align="center"  label="代码" prop="orgnCod" sortable></el-table-column>
    <el-table-column width="150px" align="left" header-align="center" label="名称" prop="name" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selauthorgn',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, deptFlag: String, disabled: Boolean,orgnTyp:String},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.query.orgnTyp = this.orgnTyp
        this.hdQuery.add('deptFlag', this.deptFlag)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortNam)
        this.$emit('update:idVal', row.orgnId)
      }
    }
  }
</script>

<style>
  .el-popper{
    z-index: 3000!important;
  }
</style>
