<template>
  <el-container>
    <el-main>
      <hd-com-grid ref="grid" :hdQuery="hdQuery"
                   url="/webresources/login/privilege/SysField/vue"
                   @row-click="rowClick" 　recHide :defaultSort="{}">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" suffix-icon="el-icon-search"
                    style="width: 200px;float:right;"
                    class="filter-item" :placeholder="$t('名称、代码')" v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" @click="$refs.grid.doEdit('')" type="primary" keyType="add">{{$t('新增')}}</el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">{{$t('删除')}}</el-button>
        </div>
        <el-table-column width="60px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="$refs.grid.doEdit(scope.row)" v-if="!scope.row.isEdit">
              {{$t('编辑')}}
            </hd-btn>
            <hd-btn hint="撤销" @click.stop="$refs.grid.doCancel(scope.row,scope.$index)" v-if="scope.row.isEdit">
              <svg-icon icon-class="undo"/>
            </hd-btn>
            <hd-btn icon="el-icon-check" hint="保存" @click.stop="$refs.grid.doSave(scope.row)" v-if="scope.row.isEdit">
              {{$t('保存')}}
            </hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"
                    v-if="!scope.row.isEdit">
              {{$t('删除')}}
            </hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="名称" prop="fieldName" sortable
                         :rules="$r(1,0,36)">
        </el-table-column>
        <el-table-column width="150px" align="left" header-align="center" label="代码" prop="fieldCod" sortable
                         :rules="$r(1,0,50)">
        </el-table-column>

      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>

  export default {
    name:'sysfield',
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    props: {},
    mounted() {

    },
    methods: {
      rowClick(row) {
        this.$emit('row-click', row)
      }
    },
    computed: {// 给外层v-model赋值

    }
  }
</script>
