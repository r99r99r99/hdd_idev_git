<template>
  <el-container>
    <el-aside>
      <orgTree ref='orgTree' @org-node-click='query'></orgTree>
    </el-aside>
    <el-main>
      <authUser ref='authUser'></authUser>
    </el-main>
  </el-container>
</template>
<script>
import orgTree from '../orgDept/orgTree'
import authUser from './authuser'

export default {
  components: {
    orgTree, authUser
  },
  data() {
    return {
      orgnId: '0',
      orgnName: ''
    }
  },
  methods: {
    query: function(data) {
      this.$refs['authUser'].queryUser(data.id, data.text)
    }
  }
}
</script>
