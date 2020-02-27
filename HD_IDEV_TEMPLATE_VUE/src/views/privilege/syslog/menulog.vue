<template>
  <div style="height: 100%;">
    <el-button class="filter-item" type="success" @click="save" size="mini">{{$t('保存')}}</el-button>
    <hd-tree :data="hdTree" v-loading="listLoading" node-key="id" ref="menuTree"
             show-checkbox style="height:calc(100% - 30px)"></hd-tree>
  </div>
</template>
<script>

export default {
  components: {},
  name: 'menuRole',
  data: function() {
    return {
      hdTree: [],
      listLoading: false
    }
  },
  mounted() { // 因为外层通过v-if控制
    this.doQuery()
  },
  methods: {
    doQuery() {
      this.listLoading = true

      this.$http.get(`/webresources/login/privilege/SysLogConfigVue/menuConfig`).then(response => {
        const data = response.data
        this.hdTree = data
        this.listLoading = false
      })
    },
    save() {
      const os = this.$refs.menuTree.getCheckedNodes()
      let privilegeIds = ''
      for (let i = 0; i < os.length; i++) {
        if (os[i].id == -1) { // 总根节点不处理
          continue
        }
        privilegeIds = privilegeIds + os[i].id + ','
      }
      this.$http.post(`/webresources/login/privilege/SysLogConfigVue/saveMenuConfig`, {privilegeIds: privilegeIds}).then(response => {
        const data = response.data
        this.$message({
          type: data.code == '-1' ? 'error' : 'success',
          message: data.message
        })
      })
    }
  },
  watch: {}
}
</script>
