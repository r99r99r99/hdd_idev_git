<template>
  <div style="height: 100%;">
    <el-button class="filter-item" type="success" @click="save" size="mini">{{$t('保存')}}</el-button>
    <hd-tree :data="hdTree" v-loading="listLoading" node-key="id" ref="menuTree"
             show-checkbox style="height: calc(100% - 30px);"></hd-tree>
  </div>
</template>
<script>

  import btnRole from './btnRole'

  import rolelist from './rolelist'

  export default {
    components: {
      rolelist, btnRole
    },
    name: 'menuRole',
    data: function () {
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

        this.$http.get(`../webresources/login/privilege/AuthRole/findtreeforrole?roleId=${this.roleId}`).then(response => {
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
        this.$http.post(`../webresources/login/privilege/AuthRole/updatePermission/${this.roleId}`, {ids: privilegeIds}).then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
        })
      }
    },
    props: ['roleId'],
    watch: {
      // 如果 `roleId` 发生改变，这个函数就会运行
      roleId: function (newVal) {
        this.doQuery()
      }
    }
  }
</script>
