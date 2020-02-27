<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选省份"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcProvince/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{prop: 'provinceCode', order: 'ascending'}">

    <el-table-column width="280px"  align="left" header-align="center" label="名称" prop="provinceName" sortable></el-table-column>
    <el-table-column width="120" align="left" header-align="center"label="代码" prop="provinceCode" sortable></el-table-column>
    <el-table-column width="180px" align="left" header-align="center" label="简称" prop="shortName" sortable></el-table-column>

  </hd-grid-sel>

</template>

<script>

  export default {
    name: 'selectprovince',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: {idVal: String, txtVal: String,countryId:String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('selFlag','1')
        this.hdQuery.add('scountryId',this.countryId)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.sprovinceId)
      }
    },
    watch: {
      countryId: function (newVal) {
        if(newVal) this.beforeQuery()
      }
    },
  }
</script>


