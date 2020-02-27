<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="计费要素代码"  height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcChargeField/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{}">
    <el-table-column width="200px" align="center" label="要素代码" prop="feildCode" sortable>
    </el-table-column>
    <el-table-column width="200px" align="center" label="要素名" prop="feildName" sortable>
    </el-table-column>
  </hd-grid-sel>
</template>


<script>
  export default {
    name: 'sel_sbcchargefield',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String,idVal :String, disabled: Boolean,
    },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val;
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.feildName);
        this.$emit('update:idVal', row.sfeildId);
      }
    }

  }
</script>


