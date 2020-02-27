<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选择"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcTruck/find" @rowClick="doClick" :beforeQuery="beforeQuery">
    <el-table-column width="180px"  align="left" header-align="center" label="车号" prop="truckNo" sortable></el-table-column>
    <el-table-column  width="180px"   align="left" header-align="center" label="卡号" prop="icCode" sortable></el-table-column>
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
      },
      doClick(row) {
        this.$emit('update:txtVal', row.truckNo)
        this.$emit('update:idVal', row.struckId)
        this.$emit('selItem', row)
      }
    }
  }
</script>


