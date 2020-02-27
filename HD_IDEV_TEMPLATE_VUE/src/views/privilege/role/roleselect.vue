<template>
  <!--开发示例:pop选择的-->
  <div>
    <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选角色" height="50vh" :hdQuery="hdQuery"
                 url="/webresources/login/privilege/AuthRole/find" @rowClick="doClick"
                 :beforeQuery="beforeQuery" visualScroll>
      <el-table-column width="130px" align="left" header-align="center" label="角色名称" prop="name" sortable>
      </el-table-column>
      <el-table-column width="130px" align="left" header-align="center" label="创建部门" prop="orgnStr" sortable>
      </el-table-column>
    </hd-grid-sel>
  </div>
</template>

<script>

export default {
  name: 'selship',
  components: {},
  data() {
    return {

      hdQuery: new HdQuery(this)
    }
  },
  mounted() {

  },
  props: { idVal: String, txtVal: String }, // 设置value为props属性-必须
  //    watch: {
  //      popAnyQuery: function () {
  //        clearTimeout(this.timeout);
  //        this.timeout = setTimeout(() => {
  //          //doQuery
  //        }, 500);
  //      }
  //    },
  methods: {
    beforeQuery(val) {
      this.hdQuery.query.anyQuery = val
    },
    doClick(row) {
      this.$emit('update:txtVal', row.name)
      this.$emit('update:idVal', row.roleId)
      this.$emit('onSelItem', { data: row }) // 主页面调用弹窗时添加
    }
  },
  watch: {}
}
</script>

<style>

  .el-popper {
    z-index: 3000 !important;
  }
</style>
