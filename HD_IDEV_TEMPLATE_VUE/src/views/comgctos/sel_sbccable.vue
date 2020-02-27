<template>
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选揽桩"
               height="50vh" :hdQuery="hdQuery" :disabled="disabled"
               url="/webresources/login/code/SbcBerthCable/find" @rowClick="doClick" :beforeQuery="beforeQuery" pageHide  :defaultSort="{}">
    <el-table-column width="120px" align="left" header-align="center" label="代码" prop="sbcCable.cableCode" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>

  export default {
    name: 'sel_sbccable',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
    },
    props: {idVal: String, txtVal: String, sberthId:String, disabled: Boolean},// 设置value为props属性-必须
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.add('ifendFlag', '0')
        this.hdQuery.add("sberthId", this.sberthId)//下拉根据泊位过滤
      },
      doClick(row) {
        this.$emit('update:txtVal', row.sbcCable.cableCode)
        this.$emit('update:idVal', row.scableId)
      }
    },
    watch: {
      sberthId: function () {
        this.beforeQuery()
      }
    },
  }
</script>


