<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal"  :placeholder="placeholder"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled" 
               url="/webresources/login/code/SbcClient/find" @rowClick="doClick" :beforeQuery="beforeQuery"  :defaultSort="{prop: 'clientCode', order: 'ascending'}">
    <el-table-column  width="200px"  align="left" header-align="center" label="名称" prop="clientName" sortable></el-table-column>
    <el-table-column  width="100px" align="left" header-align="center" label="英文名称" prop="enClientName" sortable></el-table-column>
    <el-table-column  width="180px" align="left" header-align="center" label="简称" prop="shortName" sortable></el-table-column>
    <el-table-column  width="100px"  align="left" header-align="center" label="代码" prop="clientCode" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selectsbcclient',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, clientFlag: String, placeholder: String,disabled:Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0')
        this.hdQuery.add('clientFlag', this.clientFlag)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.sclientId)
        this.$emit('sel-ok',row)
      }
    }
  }
</script>


