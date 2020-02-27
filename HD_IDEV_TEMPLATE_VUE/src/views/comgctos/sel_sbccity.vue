<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选城市"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcCity/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'cityCode', order: 'ascending'}">
    <el-table-column  width="80px" align="left" header-align="center" label="代码" prop="cityCode" sortable></el-table-column>
    <el-table-column  width="120px"  align="left" header-align="center" label="名称" prop="cityName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selectsbccity',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, provinceId:String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('selFlag', '1')
        this.hdQuery.add('sprovinceId',this.provinceId)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.scityId)
      }
    }
  }
</script>


