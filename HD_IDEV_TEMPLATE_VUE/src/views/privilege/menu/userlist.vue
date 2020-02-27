<template>
  <hd-com-grid ref="grid" :hdQuery="hdQuery" findUrl="/webresources/login/privilege/AuthPrivilege/user/find" notInit>
    <div class="filter-container" slot="query">
      <el-input @keyup.enter.native="doQuery" style="width: 120px;" class="filter-item" :placeholder="$t('名称')"
                v-model="hdQuery.query.name">
      </el-input>
      <orgnselect style="width:150px;display: inline-block" :txtVal.sync="hdQuery.query.orgnName"
                  :idVal.sync="hdQuery.query.orgnId" class="filter-item" :placeholder="$t('选择部门')"></orgnselect>
      <el-button @click="doQuery" keyType="query" class="filter-item">{{$t('搜索')}}</el-button>
    </div>
    <el-table-column align="left" header-align="center" label="姓名" prop="name" sortable width="100px">
    </el-table-column>
    <el-table-column align="left" header-align="center" label="账号" prop="account" sortable width="100px">
    </el-table-column>
  <!--  <el-table-column :input="require('../orgDept/orgnselect').default" :inputFormat="(result, row)=>row.orgnName" align="left" header-align="center" label="部门" prop="orgnId"
                     sortable width="180px">-->
    </el-table-column>
    <el-table-column align="center" label="账号过期日期" prop="accountPassDate" sortable width="auto">
    </el-table-column>
    <el-table-column align="center" label="密码修改时间" prop="pwModifyTim" sortable width="auto">
    </el-table-column>
  </hd-com-grid>
</template>
<script>
  import orgnselect from '../orgDept/orgnselect'

  export default {
    name: 'userlist',
    components: {
      orgnselect
    },
    data: function () {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
    },
    methods: {
      query(p) {
        this.hdQuery.query.privilegeId = p;
        this.doQuery();
      },
      doQuery() {
        this.$refs.grid.doQuery()
      },
    }
  }
</script>
