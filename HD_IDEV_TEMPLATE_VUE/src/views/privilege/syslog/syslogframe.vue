<template>
  <el-container>
    <el-aside width="70%" title="实体">
      <syslogconfig></syslogconfig>
    </el-aside>
    <el-main>
      <menulog></menulog>
    </el-main>

  </el-container>
</template>
<script>
import syslogconfig from './syslogconfig'
import menulog from './menulog'

export default {
  components: {
    syslogconfig, menulog
  },
  data() {
    return {}
  },
  methods: {}
}

</script>
