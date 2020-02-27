<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取司机"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled" width="350px"
               url="/webresources/login/code/SbcEmployee/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'employeeCode', order: 'ascending'}">
    <el-table-column  align="left" header-align="center" label="代码" prop="employeeCode" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="名称" prop="employeeName" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="性别" prop="sexFlag" sortable>
      <template slot-scope="scope">
        <span>{{scope.row.sexFlag=="0"?"男":"女"}}</span>
      </template>
    </el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selectsbcemployee',
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
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.employeeName)
        this.$emit('update:idVal', row.semployeeId)
      },
    }
  }
</script>


