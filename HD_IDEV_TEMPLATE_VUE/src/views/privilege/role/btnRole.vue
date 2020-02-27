<template>
  <el-container style="padding-top: 5px">
    <el-main>
      <hd-com-grid ref="grid" :hdQuery="hdQuery" :findUrl="findUrl"
                   removeAllUrl="/webresources/login/privilege/AuthResource/removeBtn"
                   findoneUrl="/webresources/login/privilege/AuthResource/findone"
                   :saveoneUrl="saveoneUrl"
                   noSets pageHide recHide notInit>
        <div class="filter-container" slot="query">
          <el-button class="filter-item" @click="$refs.grid.doEdit('')" type="primary" keyType="add">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">{{$t('删除')}}
          </el-button>
          <el-button class="filter-item" @click="doInit()" type="danger">{{$t('按钮扫描')}}
          </el-button>
        </div>
        <el-table-column width="90" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="$refs.grid.doEdit(scope.row)" v-if="!scope.row.isEdit">{{$t('编辑')}}
            </hd-btn>
            <hd-btn hint="撤销" @click.stop="$refs.grid.doCancel(scope.row,scope.$index)" v-if="scope.row.isEdit">
              <svg-icon icon-class="undo"/>
            </hd-btn>
            <hd-btn icon="el-icon-check" hint="保存" @click.stop="doSave(scope.row)" v-if="scope.row.isEdit">
            </hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="90" align="center" label="使用">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.useFlg" active-value="1" inactive-value="0"
                       @change="updateBtn(scope.row)"></el-switch>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="center" label="名称" prop="name" sortable>
        </el-table-column>
        <el-table-column width="220px" align="center" label="区分标识" prop="permissions" sortable>
        </el-table-column>

      </hd-com-grid>
      <component :is="menuUrl" v-show="false" ref="compurl"></component>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    components: {},
    name: 'btnRole',
    data() {
      return {
        hdQuery: new HdQuery(this),
        findUrl: '',
        saveoneUrl: '',
        menuUrl: ''
      }
    },
    props: ['menu', 'roleId', 'imFromPro'], // imFromPro:import不能来自node_module,需要项目传入
    mounted() {
      this.initCom()
    },
    methods: {
      doQuery() {
        this.findUrl = `/webresources/login/privilege/AuthResource/showBtn?menuId=${this.menu.id}&roleId=${this.roleId}`
        this.$refs.grid.doQuery()
      },
      doSave(row) {
        this.saveoneUrl = `/webresources/login/privilege/AuthResource/saveBtn?menuId=${this.menu.id}`
        this.$refs.grid.doSave(row)
      },
      initCom() {
        this.doQuery()// 这里列表展示
        this.$route.meta.btnRole = []
        this.menuUrl = () => this.imFromPro(this.menu.url)
      },
      doInit() {
        this.listLoading = true
        this.$http.post(`/webresources/login/privilege/AuthResource/initBtn?menuId=${this.menu.id}`, this.$route.meta.btnRole).then(response => {
          this.listLoading = false
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            showClose: true,
            duration: 1500,
            message: data.message
          })
          if (data.code == '-1') {
            return
          }
          this.doQuery()
        })
      },
      updateBtn(row) {
        this.$set(row, 'checked', row.checked)
        row.menuId = this.menu.id
        row.roleId = this.roleId
        this.$http.post(`/webresources/login/privilege/AuthResource/setBtn?menuId=${this.menu.id}&roleId=${this.roleId}&resourceId=${row.resourceId}&useFlg=${row.useFlg}`).then(response => {
          const data = response.data
          this.$message({
            type: data.code == '-1' ? 'error' : 'success',
            message: data.message,
            showClose: true,
            duration: 1500
          })
        })
      }
    },
    watch: {// 初始化时,不会执行watch,所以需要在mounted
      'menu.id': function () {
        this.initCom()
      },
      roleId: function () {
        this.initCom()
      }
    }

  }

</script>
