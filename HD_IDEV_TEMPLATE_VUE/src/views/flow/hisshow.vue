<template xmlns="http://www.w3.org/1999/html">
  <el-dialog :visible.sync="visible" style="overflow: auto" title="流程图" top="2vh" width="75%">

    <component :is="comUrl" ref="approve"></component>
    <img :src="picUrl"/>
    <hisflowshow ref="hisflowshow"></hisflowshow>

  </el-dialog>
</template>
<script>
  import hisflowshow from './hisflowshow'

  export default {
    components: {hisflowshow},
    data() {
      return {
        procInsId: null,
        visible: false,
        comUrl: ''
      }
    },
    props: {},
    methods: {
      open(row) {
        this.visible = true
        this.procInsId = row.procInsId;
        this.$nextTick(() => {
          this.$refs.hisflowshow.open(row.procInsId)
        })
        this.comUrl = require('@/views/' + row.formKey + '.vue').default
        this.$nextTick(() => {
          this.$set(row, 'readOnly', true)
          this.$refs.approve.flowOpen(row)
        })
      }
    },
    computed: {//给外层v-model赋值
      picUrl() {
        return './webresources/login/workflow/WorkFlow/graph?processId=' + this.procInsId
      }
    },
    watch: {}
  }
</script>

