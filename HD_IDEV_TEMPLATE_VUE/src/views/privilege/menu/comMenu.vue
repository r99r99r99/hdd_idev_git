<template>

  <hd-tree :data="hdTree" v-loading="listLoading" node-key="id" ref="menuTree" style="height: 100%"
           @node-click="selMenu"></hd-tree>

</template>
<script>

import btnRole from '../role/btnRole'
import rolelist from '../role/rolelist'

export default {
  components: {
    rolelist, btnRole
  },
  name: 'comMenu',
  data: function() {
    return {
      hdTree: [],
      listLoading: false
    }
  },
  mounted() {
    this.doQuery()
  },
  methods: {
    doQuery() { // 有权限的菜单树
      this.listLoading = true

      this.$http.get(`../webresources/login/privilege/AuthRole/findtreeforrole`).then(response => {
        const data = response.data
        this.hdTree = data
        this.listLoading = false
      })
    },
    selMenu(node) {
      this.$emit('selMenu', node)
    }
  }
}
</script>
