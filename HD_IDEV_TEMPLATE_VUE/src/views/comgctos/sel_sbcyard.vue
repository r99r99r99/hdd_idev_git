<!--代码表用popsel-->
<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="场地"  height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcYard/find" @rowClick="doClick" :beforeQuery="beforeQuery" :defaultSort="{}">
    <el-table-column   align="left" header-align="center" label="代码" prop="yardCode" ></el-table-column>
    <el-table-column   align="left" header-align="center" label="名称" prop="yardName" ></el-table-column>
  </hd-grid-sel>
</template>


<script>
  export default {
    name: 'yardcode',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
      //this.doQuery()
    },
    props: { txtVal: String,idVal :String, disabled: Boolean,parentId:String,
      containtParent:{
        type:String,
        default:"1"
      }
    },// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val;
        //查询是否包含父节点
        this.hdQuery.query.containtParent=this.containtParent;
        //父节点ID
        this.hdQuery.query.parentId=this.parentId;
        this.hdQuery.add('ifendFlag', '0');
      },
      doClick(row) {
        this.$emit('update:txtVal', row.yardName);
        this.$emit('update:idVal', row.syardId);
        this.$emit('onSelYard', row);
      }
    }

  }
</script>


