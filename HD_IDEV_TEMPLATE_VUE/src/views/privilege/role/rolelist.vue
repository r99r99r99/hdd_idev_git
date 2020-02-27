<template>
  <hd-com-grid ref="grid" :hdQuery="hdQuery" @row-click="selRow" url="/webresources/login/privilege/AuthRole/vue">
    <div class="filter-container" slot="query">
      <el-input @keyup.enter.native="doQuery" style="width: 120px;" class="filter-item" :placeholder="$t('名称')"
                v-model="hdQuery.query.anyQuery">
      </el-input>
      <orgnselect style="width:150px;display: inline-block" :txtVal.sync="hdQuery.query.orgnName"
                  :idVal.sync="hdQuery.query.orgnId" class="filter-item" :placeholder="$t('选择部门')"></orgnselect>
      <el-button @click="doQuery" keyType="query" class="filter-item">{{$t('搜索')}}</el-button>
      <el-button class="filter-item" type="primary" @click="$refs.grid.doEdit('')" keyType="add">{{$t('增加')}}</el-button>
    </div>
    <el-table-column width="90" align="center" label="操作" fixed="right">
      <template slot-scope="scope">
        <hd-btn icon="el-icon-edit" hint="编辑" @click="$refs.grid.doEdit(scope.row)" v-if="!scope.row.isEdit">{{$t('编辑')}}</hd-btn>
        <hd-btn icon="el-icon-delete" hint="删除" @click="$refs.grid.doRemove(scope.row)" v-if="!scope.row.isEdit">{{$t('删除')}}
        </hd-btn>
        <hd-btn hint="撤销" @click.stop="$refs.grid.doCancel(scope.row)" v-if="scope.row.isEdit">
          <svg-icon icon-class="undo"/>
        </hd-btn>
        <hd-btn icon="el-icon-check" hint="保存" @click.stop="$refs.grid.doSave(scope.row)" v-if="scope.row.isEdit">
          {{$t('保存')}}
        </hd-btn>
      </template>
    </el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="名称" prop="name" sortable
                     :rules="$r(1,0,50)">
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

  import btnRole from './btnRole'
  import orgnselect from '../orgDept/orgnselect'

  export default {
    components: {
      btnRole,
      orgnselect
    },
    name: 'rolelist',
    data: function () {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    props: {},
    mounted() {

    },
    methods: {
      doQuery() {
        this.$refs.grid.doQuery()
      },
      selRow(row) {
        this.$emit('selRoleId', row.roleId)
      }
    }
  }
</script>
