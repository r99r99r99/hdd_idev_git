<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选国家"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcCountry/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'countryCode', order: 'ascending'}">
    <el-table-column width="100px" align="left" header-align="center" label="代码" prop="countryCode" sortable></el-table-column>
    <el-table-column width="200px" align="left" header-align="center" label="名称" prop="countryName" sortable></el-table-column>
    <el-table-column width="150px"  align="left" header-align="center" label="简称" prop="shortName" sortable></el-table-column>
  </hd-grid-sel>
</template>
<script>

  export default {
    name: 'selectcountry',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, areaCode: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0')
        this.hdQuery.add('areaCode', this.areaCode)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.scountryId)
        this.$emit('onSelItem', {data:row}) // 主页面调用弹窗时添加
      }
    },
    watch: {
      areaCode: function () {
        this.beforeQuery()
      }
    },
  }
</script>


