<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" :placeholder="placeholder"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcCargoKind/find" @rowClick="doClick" :beforeQuery="beforeQuery">
    <el-table-column  align="left" width="120px" header-align="center"  label="代码" prop="cargoKindCode" sortable></el-table-column>
    <el-table-column  align="left" width="300px" header-align="center" label="名称" prop="cargoKindName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selsbccargokind',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {
      idVal: String, txtVal: String, disabled: Boolean, kindSetCod: String,
      placeholder: {type: String, default: "请点击货类"}
    },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.query.scksetCode = this.kindSetCod
        this.hdQuery.query.sel = "1"
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.cargoKindName)
        this.$emit('update:idVal', row.sckindId)
        this.$emit('onSelItem', {data:row}) // 主页面调用弹窗时添加
      }
    }
  }
</script>

