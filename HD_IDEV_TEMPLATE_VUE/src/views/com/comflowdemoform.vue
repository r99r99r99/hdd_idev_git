<template>
  <div v-loading="loading">
    <el-form :model="hdform" label-width="100px" ref="hdform">
      <el-row>
        <el-col :span="11" :xs="22">
          <el-form-item :rules="$r(0,0,10)" label="请假天数(<1,<3,>3)" prop="demoText">
            <el-input type="number" v-model="hdform.demoText"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="11" :xs="22">
          <el-form-item :rules="$r(0,0,255)" label="请假类型" prop="demoText4">
            <el-input type="text" v-model="hdform.demoText4"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="22" :xs="22">
          <el-form-item :rules="$r(0,0,255)" label="备注" prop="demoText2">
            <el-input :rows="4" type="textarea" v-model="hdform.demoText2"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <!--需要审批的任务-->
    <template v-if="task.status=='todo'||task.status=='claim'">
      <!--申请(未启动流程)或者在第一个环节时"apply"-->
      <div style="height: 30px" v-if="task.taskDefKey=='apply'">
        <div style="float:right">
          <el-button @click="submit" type="primary">提交申请</el-button>
        </div>
      </div>
      <!--审批环节-->
      <div v-else>
        <el-divider content-position="left">审批</el-divider>
        <el-input type="textarea" v-model="task.comment"></el-input>
        <div style="height: 30px;margin-top: 10px">
          <div style="float:right">
            <template v-if="task.status=='todo'">
              <el-button @click="claim" key="todo" type="primary">确认办理</el-button>
            </template>
            <template v-if="task.status=='claim'">
              <el-button @click="unclaim" type="primary">取消办理</el-button>
              <el-button @click="rejectToLast" type="primary">驳回到上一级</el-button>
              <el-button @click="reject" type="primary">驳回到申请人</el-button>
              <el-button @click="agree" type="primary">同意</el-button>
              <el-button @click="disAgree" type="primary">不同意(结束流程)</el-button>
            </template>
          </div>
        </div>
      </div>
    </template>
    <template v-if="task.status=='tempcomplete'">
      <div style="height: 30px;margin-top: 10px">
        <div style="float:right">
          <el-button @click="retract" key="retract" type="warning">抽回</el-button>
        </div>
      </div>
    </template>
  </div>

</template>

<script>
  export default {
    name: 'comflowdemoform',
    data() {
      return {
        hdform: {},
        loading: false,
        task: {}//从待办任务或者已办任务传来的对象

      }
    },
    methods: {
      flowOpen(task) { // 换为本表主键
        task.comment = ""
        this.task = task
        //弹窗重复使用时,清除校验项目
        if (this.$refs['hdform'])
          this.$refs['hdform'].resetFields()
        this.visible = true
        this.loading = true
        this.$http.get(`/webresources/login/com/ComFlowDemo/findone?taskId=${task.taskId}&procInsId=${task.procInsId}`).then(response => {
          const data = response.data
          this.hdform = data
          //将业务数据赋给task,审批时如可以获取到业务对象
          this.task.busiEntity = this.form
          this.loading = false
        }).catch(() => {
          this.loading = false
        })
      },

      submit() {
        // console.debug(this.hdform)
        this.$refs['hdform'].validate((valid) => {
          if (!valid) {
            return false;
          }
          this.loading = true
          this.$http.post('/webresources/login/com/ComFlowDemo/startProc?taskId=' + this.task.taskId, this.hdform).then(response => {
            this.loading = false
            const data = response.data
            this.$message({
              type: data.code == '-1' ? 'error' : 'success',
              message: data.message
            })
            if (data.code == '-1') {
              return
            }
            this.task.status = 'tempcomplete'
          }).catch(() => {
            this.loading = false
          })
        })
      },
      agree() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/agree', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          this.task.status = 'complete'
        }).catch(() => {
          this.loading = false
        })
      },
      reject() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/reject', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          this.task.status = 'complete'
        }).catch(() => {
          this.loading = false
        })
      },
      disAgree() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/disAgree', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          this.task.status = 'complete'
        }).catch(() => {
          this.loading = false
        })
      },
      rejectToLast() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/rejectToLast', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
        }).catch(() => {
          this.loading = false
        })
      },
      retract() {
        this.$http.post('/webresources/login/com/ComFlowDemo/retract', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
        }).catch(() => {
          this.loading = false
        })
      },
      claim() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/claim', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          this.task.status = 'claim'
        }).catch(() => {
          this.loading = false
        })
      },
      unclaim() {
        this.loading = true
        this.$http.post('/webresources/login/com/ComFlowDemo/unclaim', this.task).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message
          })
          this.task.status = 'todo'
        }).catch(() => {
          this.loading = false
        })
      }
    }
  }
</script>

