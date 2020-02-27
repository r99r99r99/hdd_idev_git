<template>
  <el-dialog title="查看" :fullscreen="true" :visible.sync="visible" width='100%' custom-class="dialog">
    <iframe :src="iframeUrl" width="100%" :height="height"></iframe>
  </el-dialog>
</template>

<script>
  export default {
    data() {
      return {
        visible: false,
        iframeUrl: "",
        height:0
      }
    },
    mounted() {
      this.height = document.body.clientHeight-100
    },
    methods: {
      show(url) { // 换为本表主键
        console.log(this)
        this.iframeUrl = url
        this.visible = true;
      },
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .el-dialog {
    height: 100%;
  }
</style>
