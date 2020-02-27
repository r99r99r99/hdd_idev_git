<template>
  <el-container>
    <el-aside width="460px">
      <sysfield ref="sysfield" @row-click="rowClick"></sysfield>
    </el-aside>
    <el-main>
      <syscode ref="syscode"></syscode>
    </el-main>

  </el-container>
</template>
<script>
import syscode from './syscode'
import sysfield from './sysfield'

export default {
  components: {
    syscode, sysfield
  },
  data() {
    return {}
  },
  methods: {
    rowClick(row) {
      this.$refs['syscode'].querycode(row)
    }
  }
}

</script>
