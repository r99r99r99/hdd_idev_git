<template>

  <el-dialog :loading="loading" :visible.sync="visible" title="指派人员" top="5vh" width='550px'>
    <div style="height:70vh">
      <hd-com-grid :hdQuery="hdQuery" ckHide noSets recHide ref="grid" url="/webresources/login/privilege/AuthUser">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" placeholder="姓名、账号"
                    style="width: 200px;"
                    v-model="hdQuery.query.name">
          </el-input>
          <el-button @click="$refs.grid.doQuery()" class="filter-item" keyType="query">
            搜索
          </el-button>
        </div>
        <el-table-column align="left" header-align="center" label="姓名" prop="name" sortable width="200px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="账号" prop="account" sortable width="200px">
        </el-table-column>
      </hd-com-grid>
    </div>
    <div class="dialog-footer" slot="footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button @click="assignUser" type="primary"> 确 定</el-button>
    </div>
  </el-dialog>
</template>
<script>

  export default {
    name: 'assignuser',
    components: {},
    data() {
      return {
        isFirst: true,//第一次显示查询,以后不查询
        visible: false,
        loading: false,
        hdQuery: new HdQuery(this),
        dateDis: [],
        selRow: null
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
      },
      assignUser() {
        if (!this.hdQuery.selRow) {
          this.$message({
            type: 'error',
            message: '未选择需要指派的用户'
          })
          return false
        }
        let selUserId = this.hdQuery.selRow.userId
        this.$http.post(`/webresources/login/workflow/WorkFlow/assignUser?taskId=${this.selRow.taskId}&userId=${selUserId}`).then(response => {
          this.loading = false
          const data = response.data
          this.$message({
            type: data.code === '-1' ? 'error' : 'success',
            message: data.message
          })
          if (data.code === '-1') {
            return
          }
          this.$emit('operok') // 主页面调用弹窗时添加
          this.visible = false
        }).catch(() => {//数据同步的校验,时,会从这里触发
          this.loading = false
        })
      }
    },
    watch: {}
  }
</script>


