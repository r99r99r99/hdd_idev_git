<template>
  <el-container>
    <el-main>
      <hd-com-grid :hdQuery="hdQuery" findUrl="/webresources/login/workflow/WorkFlow/myTodo" recHide ref="grid">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" placeholder="内容"
                    style="width: 180px;"
                    v-model="hdQuery.query.anyQuery"></el-input>
          <el-button @click="$refs.grid.doQuery()" type="primary">查询</el-button>
          <el-dropdown @command="doApply" type="primary">
            <ex-button type="primary">
              流程申请<i class="el-icon-arrow-down el-icon--right"></i>
            </ex-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="test">请假demo</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <hd-btn @click="taskapprove(scope.row)" hint="详情" icon="el-icon-edit"></hd-btn>
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

      </hd-com-grid>
    </el-main>
    <hisshow ref="hisshow"></hisshow>
    <taskapprove @close="$refs.grid.doQuery()" ref="approve"></taskapprove>
  </el-container>
</template>
<script>
  import hisshow from './hisshow'
  import taskapprove from './taskapprove'


  export default {
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
      hisflowshow(row) {
        this.$refs.hisflowshow.open(row)
      },
      graphShow(row) {
        let newRow = Object.assign({}, row)
        newRow.status = 'readOnly'
        this.$refs.hisshow.open(newRow)
      },
      taskapprove(row) {
        let newRow = Object.assign({}, row)
        this.$refs.approve.open(newRow)
      },
      doApply(command) {
        let leaveApply = {
          formKey: 'com/comflowdemoform',
          taskId: '',
          procInsId: '',
          taskName: '请假申请',
          taskDefKey: 'apply',//与第一环节保持一致,才能在退回时方便控制
          status: 'todo'
        }
        this.$refs.approve.open(leaveApply)
      }

    },
    computed: {//给外层v-model赋值

    }

  }
</script>
