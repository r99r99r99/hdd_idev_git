<template>
  <div style="height: 100%;">
    <el-button @click="saveOrgnTree" class="filter-item" size="mini" type="success">{{$t('保存')}}</el-button>
    <hd-tree :data="hdTree" height="100%" node-key="id" ref="orgnTree" show-checkbox
             style="height: 100%" v-loading="listLoading"></hd-tree>
  </div>
</template>
<script>

  export default {
    name: 'orgnRole',
    data: function () {
      return {
        hdTree: [],
        listLoading: false
      }
    },
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
        this.listLoading = true
        this.$http.get(`../webresources/login/privilege/AuthRole/findOrgnByRoleAndPrivilege?roleId=${this.roleId}&privilegeId=${this.menuId}`).then(response => {
          const data = response.data
          this.hdTree = data
          this.listLoading = false
        })
      },
      saveOrgnTree() {
        const os = this.$refs.orgnTree.getCheckedNodes(false)
        let orgIds = ''
        for (let i = 0; i < os.length; i++) {
          orgIds = orgIds + os[i].id + ','
        }
        this.$http.post(`../webresources/login/privilege/AuthRole/vue/updateRoleOrgn/${this.roleId}/${this.menuId}`, {ids: orgIds}).then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
        })
      }
    },
    props: ['roleId', 'menuId'],
    watch: {
      // 都有值才适合查询
      roleId: function (newVal) {
        this.doQuery()
      },
      menuId: function (newVal) {
        this.doQuery()
      }
    }
  }
</script>
