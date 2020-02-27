<template>
  <el-container>
    <el-main>
      <hd-com-grid :hdQuery="hdQuery" findUrl="/webresources/login/workflow/WorkFlow/allTask" recHide ref="grid">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" placeholder="内容"
                    style="width: 180px;"
                    v-model="hdQuery.query.anyQuery"></el-input>
          <el-button @click="$refs.grid.doQuery()" type="primary">查询</el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="300px">
          <template slot-scope="scope">
            <a @click="suspend(scope.row)" v-if="scope.row.suspendFlg=='0'">挂起</a>
            <a @click="activate(scope.row)" v-else>恢复</a>
            <a @click="$refs.assignuser.open(scope.row)">指派人员</a>
            <a @click="$refs.jumptask.open(scope.row)">环节跳转</a>
            <a @click="graphShow(scope.row)">查看</a>
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
    <jumptask @operok="$refs.grid.doQuery()" ref="jumptask"></jumptask>
    <assignuser @operok="$refs.grid.doQuery()" ref="assignuser"></assignuser>
    <hisshow ref="hisshow"></hisshow>
  </el-container>
</template>
<script>
  import jumptask from './jumptask'
  import assignuser from './assignuser'
  import hisshow from './hisshow'

  export default {
    components: {jumptask, assignuser, hisshow},
    data() {
      return {
        hdQuery: new HdQuery(this),
      }
    },
    mounted() {

    },
    methods: {
      suspend(row) {
        this.$confirm(this.$t('确定挂起当前任务?'), this.$t('提示'), {}).then(() => {
          this.$http.post('/webresources/login/workflow/WorkFlow/suspend?procInsId=' + row.procInsId).then(response => {
            const data = response.data
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              showClose: true,
              message: data.message
            })
            if (data.code == '-1') {
              return
            }
            row.suspendFlg = '1'
          })
        }).catch((e) => {
        })
      },
      activate(row) {
        this.$http.post('/webresources/login/workflow/WorkFlow/activate?procInsId=' + row.procInsId).then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            showClose: true,
            message: data.message
          })
          if (data.code == '-1') {
            return
          }
          row.suspendFlg = '0'
          // this.doQuery()
        })

      },
      graphShow(row) {
        let newRow = Object.assign({}, row)
        this.$refs.hisshow.open(newRow)
      }

    },
    computed: {//给外层v-model赋值

    }

  }
</script>
