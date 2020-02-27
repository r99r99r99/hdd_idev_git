<template>
  <el-dialog :title="taskName" :visible.sync="visible" @close="$emit('close')" style="overflow: auto" top="2vh"
             width="75%">
    <component :is="comUrl" ref="approve"></component>
  </el-dialog>
</template>
<script>

  export default {
    name: 'taskapprove',
    components: {},
    data() {
      return {
        visible: false,
        comUrl: null,
        taskName: ''
      }
    },

    mounted() {
    },
    methods: {
      open(row) {
        this.taskName = row.taskName
        this.visible = true
        this.comUrl = require('@/views/' + row.formKey + '.vue').default
        this.$nextTick(() => {
          this.$refs.approve.flowOpen(row)
        })

      }
    },
    watch: {},
  }
</script>
