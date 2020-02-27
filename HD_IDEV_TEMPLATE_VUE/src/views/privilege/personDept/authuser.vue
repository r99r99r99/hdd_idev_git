<template>
  <el-container>
    <el-main>
      <hd-com-grid :hdQuery="hdQuery" :removeUrl="removeUrl" imExcel notInit
                   ref="grid" url="/webresources/login/privilege/AuthUser" visualScroll :exField="exField"
                   :excelFormatter="doExcelFormatter">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" class="filter-item" :placeholder="$t('姓名、账号')"
                    style="width: 200px;"
                    v-model="hdQuery.query.name">
          </el-input>
          <el-button @click="$refs.grid.doQuery()" class="filter-item" keyType="query">
            {{$t('搜索')}}
          </el-button>
          <el-button @click="doEdit('')" class="filter-item" keyType="add" type="primary" vid="add">{{$t('新增')}}
          </el-button>
          <el-button @click="$refs.grid.doRemoveAll()" class="filter-item" keyType="remove" type="danger">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="110px">
          <template slot-scope="scope">
            <hd-btn @click.stop="doResetPsw(scope.row)" class="fa fa-asterisk" hint="重置密码" vid="resetpassword"></hd-btn>
            <hd-btn @click.stop="doEdit(scope.row.userId)" hint="编辑" icon="el-icon-edit"></hd-btn>
            <hd-btn @click.stop="doRemove(scope.row)" hint="删除" icon="el-icon-delete"></hd-btn>
            <hd-btn @click.stop="doFaceRec(scope.row)" class="fa fa-vcard-o" hint="人脸识别">
            </hd-btn>
          </template>
        </el-table-column>
        <el-table-column align="left" header-align="center" label="姓名" prop="name" sortable width="100px">
        </el-table-column>
        <el-table-column align="left" header-align="center" label="账号" prop="account" sortable width="100px">
        </el-table-column>
        <el-table-column :input="require('../orgDept/orgnselect').default" :inputFormat="(result, row)=>row.orgnName"
                         align="left" header-align="center" label="部门" prop="orgnId"
                         sortable width="180px">
        </el-table-column>
        <el-table-column align="center" label="账号过期日期" prop="accountPassDate" sortable width="auto">
        </el-table-column>
        <el-table-column align="center" label="密码修改时间" prop="pwModifyTim" sortable width="auto">
        </el-table-column>
      </hd-com-grid>
    </el-main>
    <authuserform @save-ok="$refs.grid.doQuery()" ref="authuserform" :exFieldCode="exField.gridCode"></authuserform>
    <facerec ref="facerec"></facerec>
  </el-container>
</template>
<script>
  import authuserform from './authuserform'
  import facerec from './facerec'

  export default {
    name: 'authuser',
    components: {authuserform, facerec},
    data() {
      return {
        removeUrl: '',
        hdQuery: new HdQuery(this),
        orgnName: '',
        orgnId: '',
        exField: {
          open: true,
          table: 'AUTH_USER',
          columnList: ['EX_FIELD1', 'EX_FIELD2', 'EX_FIELD3', 'EX_FIELD4', 'EX_FIELD5'],
          gridCode: 'authUserGrid'
        },
      }
    },
    mounted() {
      if (this.$route.query.q) {
        this.$set(this.hdQuery.query, 'name', this.$route.query.q);
      }
    },
    methods: {
      queryUser(orgnId, orgnName) {
        this.orgnId = orgnId
        this.hdQuery.query.orgnId = orgnId
        this.orgnName = orgnName
        this.$refs.grid.doQuery()
      },
      doResetPsw(row) { // 增加或编辑
        this.$confirm(this.$t('此操作将重置密码为888888, 是否继续?'), this.$t('提示'), {
          confirmButtonText: this.$t('确定'),
          cancelButtonText: this.$t('取消'),
          type: 'warning'
        }).then(() => {
          this.$http.post('/webresources/login/privilege/AuthUser/resetPassword?userId=' + row.userId).then(response => {
            const data = response.data
            this.$message({
              type: data.code === '-1' ? 'error' : 'success',
              message: data.message
            })
            if (data.code === '-1') {
              return
            }
            this.$refs.grid.doQuery()
          })
        }).catch(() => {
        })
      },
      doEdit(userId) { // 增加或编辑
        this.$refs['authuserform'].show(userId, this.orgnId, this.orgnName)
      },
      doRemove(row) {
        this.removeUrl = '/webresources/login/privilege/AuthUser/remove?userId=' + row.userId
        this.$refs.grid.doRemove(row)
      },
      doFaceRec(row) {
        this.$refs.facerec.show(row)
      },
      doExcelFormatter(excelData) {
        let r = {
          multiHeader : [['用户管理', '', '', '', '', '', '', '', '']],
          header : excelData.merdata[0],
          data : excelData.merdata.slice(1),
          filename : excelData.title,
          merges : ['A1:I1']
        }
        console.log(r)
        return r;
      }
    }
  }
</script>
