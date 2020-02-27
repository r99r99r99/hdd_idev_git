<template>

  <hd-grid-sel :txtVal="txtVal" :idVal="idVal"  placeholder="请选择班次"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"  url="/webresources/login/code/SbcShift/find"  :defaultSort="{}"  @rowClick="doClick" :beforeQuery="beforeQuery" ref="gridsel">
    <el-table-column width="80px"  align="left" header-align="center" label="代码" prop="shiftCode" sortable></el-table-column>
    <el-table-column  width="120px"   align="left" header-align="center" label="名称" prop="shiftName" sortable></el-table-column>
    <!--<el-table-column width="100px" align="left" header-align="center" label="汉字提示" prop="hzts" sortable></el-table-column>-->
    <el-table-column width="100px" align="left" header-align="center" label="开始时间" prop="begTime" sortable></el-table-column>
    <el-table-column width="100px" align="left" header-align="center" label="结束时间" prop="endTime" sortable></el-table-column>
  </hd-grid-sel>
</template>
<script>

  export default {
    name: 'selectsbcshift',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
        curShift:{}
      }
    },
    mounted() {
      this.doQuery()
    },
    props: {
      idVal: String, txtVal: String, disabled: Boolean
    },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag','0');
        this.hdQuery.add('dayFlag','1')
      },
      doQuery() {
        this.hdQuery.add('ifendFlag','0');
        this.hdQuery.add('dayFlag','1')
        this.$refs.gridsel.$refs.grid.doQuery().then(() => {
          let result=this.$refs.gridsel.$refs.grid.hdResult;
          if(result.footer&&result.footer.length>0)
          {
            this.curShift=result.footer[0];
            if(!this.idVal&&this.curShift){
              this.$emit('update:txtVal', this.curShift.shiftName);
              this.$emit('update:idVal', this.curShift.sshiftId);
            }
          }
        })
      },
      doClick(row) {
        this.$emit('update:txtVal', row.shiftName)
        this.$emit('update:idVal', row.sshiftId)
      }
    }
  }
</script>


