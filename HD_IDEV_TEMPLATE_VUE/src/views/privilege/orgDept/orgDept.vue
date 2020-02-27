
<template>
  <el-container>
    <el-aside>
      <orgTree ref='orgTree' @org-node-click='query'></orgTree>
    </el-aside>
    <el-main>
      <authOrgn ref='authOrgn' @change="change"></authOrgn>
    </el-main>
  </el-container>
</template>
<script>
import orgTree from './orgTree'
import authOrgn from './authOrgn'

export default {
  name: 'orgDept',
  components: {
    orgTree, authOrgn
  },
  data() {
    return {
      parentId: '0'
    }
  },
  methods: {
    query: function(data) {
      this.$refs['authOrgn'].queryOrg(data.id)
      this.parentId = data.id
    },
    change: function(data) {
      // console.log('change', data)
      this.$refs['orgTree'].refresh(data)
    }
  }
}
</script>
