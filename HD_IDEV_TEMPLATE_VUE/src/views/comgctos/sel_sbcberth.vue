<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选泊位" height="50vh" :hdQuery="hdQuery"  :disabled="disabled"
               url="/webresources/login/code/SbcBerth/find" @rowClick="doClick"  :beforeQuery="beforeQuery" pageHide  :defaultSort="{}">
    <el-table-column width="80px" align="left" header-align="center" label="代码" prop="berthCode" sortable></el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="名称" prop="berthName" sortable></el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="汉字提示" prop="hzts" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'selectsbcberth',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
    },
    watch: {
      // 如果 `activeName` 发生改变，这个函数就会运行
      idVal: function (newVal) {
        this.$emit('changeBerth', {data: newVal}) // 主页面调用弹窗时添加
      }
    },
    props: {idVal: String, txtVal: String, berthFlag: {type: String, default: ""}, disabled: Boolean,isEditable:Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0');
        this.hdQuery.add('berthFlag', this.berthFlag)
      },
      doClick(row) {
        //如果不相等，则触发后续的回调函数，重置对应的
        /*if(this.idVal!=row.sberthId){
          this.$emit('changeBerth', {data: row}) // 主页面调用弹窗时添加
        }*/
        this.$emit('update:txtVal', row.berthName);
        this.$emit('update:idVal', row.sberthId);
        this.$emit('onSelItem', {data: row}); // 主页面调用弹窗时添加
      },
    }
  }
</script>


