<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取货位"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcSublocation/find" @rowClick="doClick" :beforeQuery="beforeQuery">
    <el-table-column width="80px"  align="left" header-align="center" label="代码" prop="sublocationCode" ></el-table-column>
    <el-table-column width="150px"  align="left" header-align="center" label="汉字提示" prop="hzts" ></el-table-column>
  </hd-grid-sel>
</template>

<script>
  export default {
    name: 'sublocationcode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String,idVal :String,slocationId: String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('selFlag','1')
        this.hdQuery.add('slocationId',this.slocationId)
      },
      doClick(row) {
        this.$emit('update:txtVal', row.sublocationCode)
        this.$emit('update:idVal', row.sublocationCode)
      }
    }

  }
</script>


