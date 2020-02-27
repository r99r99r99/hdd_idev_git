<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" :placeholder="$t('货名')"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcCargo/find" @rowClick="doClick" :beforeQuery="beforeQuery"  :defaultSort="{prop: 'cargoCode', order: 'ascending'}">
    <el-table-column width="130px"  align="left" header-align="center" label="代码" prop="cargoCode" sortable></el-table-column>
    <el-table-column width="290px" align="left" header-align="center" label="名称" prop="cargoName" sortable></el-table-column>
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
    },
    props: { txtVal: String,idVal :String,placeholder: String, disabled: Boolean },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.cargoShort)
        this.$emit('update:idVal', row.scargoId)
        this.$emit('sel-ok',row)
      }
    }
  }
</script>


