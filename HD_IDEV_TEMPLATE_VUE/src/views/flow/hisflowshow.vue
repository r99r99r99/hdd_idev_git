<template>
  <div style="height:70vh">
    <hd-com-grid :hdQuery="hdQuery" findUrl="/webresources/login/workflow/WorkFlow/findHisFlow" pageHide recHide
                 ref="grid">
      <el-table-column align="left" header-align="center" label="任务名" prop="taskName"
                       width="80px"></el-table-column>
      <el-table-column align="left" header-align="center" label="传来时间" prop="createTime"
                       width="160px"></el-table-column>
      <el-table-column align="left" header-align="center" label="结束时间" prop="endTime" width="160px"></el-table-column>
      <el-table-column align="left" header-align="center" label="执行人" prop="assigneeName"
                       width="80px"></el-table-column>
      <el-table-column align="left" header-align="center" label="意见" prop="comment" width="280px"></el-table-column>
    </hd-com-grid>
  </div>
</template>
<script>

  export default {
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
      }
    },
    props: {
      mtype: String
    },
    mounted() {

    },
    methods: {
      open(procInsId) {
        this.hdQuery.query.procInsId = procInsId
        this.$refs.grid.doQuery()
      }

    },
    computed: {//给外层v-model赋值

    }

  }
</script>
