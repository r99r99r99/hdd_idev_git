<template>
  <hd-com-grid ref="grid" :hdQuery="hdQuery" findUrl="/webresources/login/privilege/AuthPrivilege/role/find" notInit>
    <div class="filter-container" slot="query">
      <el-input @keyup.enter.native="doQuery" style="width: 120px;" class="filter-item" :placeholder="$t('名称')"
                v-model="hdQuery.query.name">
      </el-input>
      <orgnselect style="width:150px;display: inline-block" :txtVal.sync="hdQuery.query.orgnName"
                  :idVal.sync="hdQuery.query.orgnId" class="filter-item" :placeholder="$t('选择部门')"></orgnselect>
      <el-button @click="doQuery" keyType="query" class="filter-item">{{$t('搜索')}}</el-button>
    </div>
    <el-table-column width="120px" align="left" header-align="center" label="名称" prop="name" sortable>
    </el-table-column>
    <el-table-column width="170px" align="left" header-align="center" label="所属部门" prop="orgnStr" noEdit>
    </el-table-column>
    <el-table-column width="150px" align="left" header-align="center" label="描述" prop="description">
    </el-table-column>
    <el-table-column width="100px" align="center" label="管理员" prop="isAdmin" input="el-switch"
                     v-if="$store.state.user.isAdmin"
                     :inputProp='{activeValue:"1", inactiveValue:"0"}' :inputFormat='$ckFt' sortable>
    </el-table-column>
  </hd-com-grid>
</template>
<script>
  import orgnselect from '../orgDept/orgnselect'
  export default {
    name: 'rolelist',
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
