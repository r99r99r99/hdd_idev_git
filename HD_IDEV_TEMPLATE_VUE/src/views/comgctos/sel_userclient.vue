<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal"  :placeholder="placeholder" height="50vh" :hdQuery="hdQuery" :disabled="disabled"  url="webresources/login/privilege/UserClient/findByUser" @rowClick="doClick" :beforeQuery="beforeQuery" ref="gridsel">
    <el-table-column width="110px"  align="left" header-align="center" label="代码" prop="clientCode" sortable></el-table-column>
    <el-table-column width="250px"  align="left" header-align="center" label="名称" prop="clientName" sortable></el-table-column>
    <el-table-column width="150px"  align="left" header-align="center" label="简称" prop="shortName" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'seluserclient',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
        obj:{}
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: {idVal: String, txtVal: String,disabled: Boolean,placeholder: String },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');

      },
      // doQuery() {
      //   this.hdQuery.add('ifendFlag','0')
      //   this.$refs.gridsel.$refs.grid.doQuery().then(() => {
      //     let result=this.$refs.gridsel.$refs.grid.hdResult;
      //     if(result.footer&&result.footer.length>0)
      //     {
      //       this.obj=result.footer[0]
      //       if(!this.idVal){
      //         this.$emit('update:txtVal', result.footer[0].shortName);
      //         this.$emit('update:idVal',  result.footer[0].sclientId);
      //       }
      //     }
      //
      //   })
      // },
      doClick(row) {
        this.$emit('update:txtVal', row.shortName)
        this.$emit('update:idVal', row.sclientId)
      }
    }
  }
</script>


