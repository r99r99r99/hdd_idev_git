<template>

  <el-dialog :loading="loading" :visible.sync="visible" title="跳转任务" top="5vh" width='550px'>
    <div style="height:70vh">
      <hd-com-grid :hdQuery="hdQuery" ckHide
                   findUrl="/webresources/login/workflow/WorkFlowDefine/findProcAllUserTask" noSets notInit recHide
                   ref="grid">
        <el-table-column align="left" header-align="center" label="名称" prop="name" sortable width="200px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="id" prop="id" sortable width="200px">
        </el-table-column>
      </hd-com-grid>
    </div>
    <div class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button @click="jumptask" type="primary"> 确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  export default {
    name: 'jumptask',
    components: {},
    data() {
      return {
        loading: false,
        hdQuery: new HdQuery(this),
        selRow: null,
        visible: false
      }
    },
    mounted() {

    },
    props: {},// 设置value为props属性-必须
    methods: {
      open(selRow) {
        this.selRow = selRow
        this.visible = true
        this.loading = false
        this.hdQuery.query.procDefId = selRow.procDefId
        this.$nextTick(() => {
          this.$refs.grid.doQuery()
        })
      },
      jumptask() {
        if (!this.hdQuery.selRow) {
          this.$message({
            type: 'error',
            message: '未选择需要跳转的节点'
          })
          return false
        }
        let selTaskKey = this.hdQuery.selRow.id
        this.$http.post(`/webresources/login/workflow/WorkFlow/jumpTask?procInsId=${this.selRow.procInsId}&targetTaskDefKey=${selTaskKey}`).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code === '-1' ? 'error' : 'success',
            message: data.message
          })
          if (data.code === '-1') {
            return
          }
          this.$emit('operok')
          this.visible = false
        }).catch(() => {
          this.loading = false
        })
      }
    },
    watch: {}
  }
</script>


