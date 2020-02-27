<template>
  <el-container>
    <el-aside width="50%">
      <hd-com-grid :hdQuery="hdUserQuery" @row-click="rowClick" ckHide
                   ref="pergrid" url="/webresources/login/privilege/AuthUser">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.pergrid.doQuery()" class="filter-item" :placeholder="$t('姓名、账号')"
                    style="width: 180px;" v-model="hdUserQuery.query.name"></el-input>
          <orgnselect :idVal.sync="hdUserQuery.query.orgnId" :txtVal.sync="hdUserQuery.query.orgnName"
                      class="filter-item" :placeholder="$t('选择部门')" style="width:150px;display: inline-block"></orgnselect>
          <roleselect :txtVal.sync="hdUserQuery.query.roleIdStr" :idVal.sync="hdUserQuery.query.roleId"
                      class="filter-item" :placeholder="$t('选择角色')" style="width:150px;display: inline-block"></roleselect>
          <el-button @click="$refs.pergrid.doQuery()" class="filter-item" keyType="query">{{$t('搜索')}}</el-button>
        </div>
        <el-table-column align="center" label="姓名" prop="name" sortable width="120px">
        </el-table-column>
        <el-table-column align="center" label="账号" prop="account" sortable width="120px">
        </el-table-column>
        <el-table-column :input="require('../orgDept/orgnselect').default" :inputFormat="(result, row)=>row.orgnName"
                         align="center" label="部门名称"
                         prop="orgnId" sortable
                         width="120px">
        </el-table-column>
      </hd-com-grid>
    </el-aside>
    <el-main>
      <hd-com-grid :hdQuery="hdRoleQuery" ckHide findUrl="/webresources/login/privilege/AuthRole/findRoleByUserId"
                   notInit ref="rolegrid" url="/webresources/login/privilege/AuthRole/">
        <el-table-column align="center" fixed="right" label="授权" width="90">
          <template slot-scope="scope">
            <el-switch :active-value=true :inactive-value=false @change="updateUserRole(scope.row)"
                       v-model="scope.row.checked"></el-switch>
          </template>
        </el-table-column>
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.rolegrid.doQuery()" class="filter-item" :placeholder="$t('角色')"
                    style="width: 180px;" v-model="hdRoleQuery.query.anyQuery"></el-input>
          <el-radio-group size="mini" class="filter-item" v-model="hdRoleQuery.query.alreadyAuth" @change="$refs.rolegrid.doQuery()">
            <el-radio-button label="1">{{$t('已授权')}}</el-radio-button>
            <el-radio-button label="0" >{{$t('全部')}}</el-radio-button>
          </el-radio-group>
          <el-button @click="$refs.rolegrid.doQuery()" class="filter-item" keyType="query">搜索</el-button>

          {{$t('该账号已授权')}}<span style="color:red;font-size: 18px">{{roleAuthNum}}</span>{{$t('个角色')}}
        </div>
        <el-table-column align="center" label="角色" prop="name" sortable width="120px"></el-table-column>
        <el-table-column align="center" label="描述" prop="description" sortable width="120px"></el-table-column>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>
  import orgnselect from '../orgDept/orgnselect'
  import roleselect from '../role/roleselect'

  export default {
    components: {
      orgnselect,roleselect
    },
    data() {
      return {
        hdUserQuery: new HdQuery(this),
        hdRoleQuery: new HdQuery(this, 100),
        userId: '',
        roleFindUrl: '',
        roleAuthNum: 0//已授权角色数
      }
    },
    mounted() {
    },
    methods: {
      rowClick(row) {
        // 显示loading框
        this.userId = row.userId
        this.hdRoleQuery.add('userId', row.userId)
        this.findRoleAuthNum()
        this.$refs.rolegrid.doQuery()
      },
      findRoleAuthNum() {
        this.$http.post('/webresources/login/privilege/AuthRole/findRoleAuthNum', this.hdRoleQuery).then(response => {
          this.roleAuthNum = response.data
        })
      },
      updateUserRole(row) {
        if (row.checked) {
          this.$http.get(`/webresources/login/privilege/AuthRole/addRoleUser/${row.roleId}/${this.userId}`).then(response => {
            this.roleAuthNum = this.roleAuthNum + 1
          })
        } else {
          this.$http.get(`/webresources/login/privilege/AuthRole/removeRoleUser/${row.roleId}/${this.userId}`).then(response => {
            this.roleAuthNum = this.roleAuthNum - 1
          })
        }
      }
    }
  }

</script>
