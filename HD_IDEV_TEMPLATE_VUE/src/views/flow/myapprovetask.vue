<template>
  <el-container>
    <el-main>
      <hd-com-grid :hdQuery="hdQuery" findUrl="/webresources/login/workflow/WorkFlow/myApprove" recHide ref="grid">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" placeholder="内容"
                    style="width: 180px;"
                    v-model="hdQuery.query.anyQuery"></el-input>

          <el-button @click="$refs.grid.doQuery()" type="primary">查询</el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <hd-btn @click="graphShow(scope.row)" hint="历史查看" icon="el-icon-view"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column align="left" header-align="center" label="流程名" prop="procDefname"
                         width="120px"></el-table-column>
        <el-table-column align="left" header-align="center" label="任务名" prop="taskName" width="80px"></el-table-column>
        <el-table-column align="left" header-align="center" label="任务key" prop="taskDefKey"
                         width="80px"></el-table-column>
        <el-table-column align="left" header-align="center" label="发起人" prop="createUserName"
                         width="80px"></el-table-column>
        <el-table-column align="left" header-align="center" label="发起时间" prop="createTime"
                         width="140px"></el-table-column>
        <el-table-column align="left" header-align="center" label="发起内容" prop="comment" width="280px"></el-table-column>
        <el-table-column align="left" header-align="center" label="传来时间" prop="fromTime"
                         width="140px"></el-table-column>
        <el-table-column align="left" header-align="center" label="结束时间" prop="endTime" width="140px"></el-table-column>

      </hd-com-grid>
    </el-main>
    <hisshow ref="graph"></hisshow>
    <taskapprove ref="approve"></taskapprove>
  </el-container>
</template>
<script>
  import hisshow from './hisshow'
  import taskapprove from './taskapprove'


  export default {//我审批的流程
    components: {hisshow, taskapprove},
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
      graphShow(row) {
        this.$refs.graph.open(row)
      },
      retract(row) {

      }
    },
    computed: {//给外层v-model赋值

    }

  }
</script>
