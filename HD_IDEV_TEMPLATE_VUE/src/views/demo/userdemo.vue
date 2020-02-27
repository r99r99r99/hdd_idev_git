<template>
  <el-container>
    <el-main>
      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/demo/UserDemo">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()" keyType="query">搜索
          </el-button>
          <el-button class="filter-item" @click="doEdit(null)" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">删除
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="作业公司" prop="orgnId" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="账户" prop="account" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="姓名" prop="name" sortable>
        </el-table-column>
      </hd-com-grid>
    </el-main>
    <userdemoform ref="userdemoform" @save-ok="$refs.grid.doQuery()"></userdemoform>
  </el-container>
</template>
<script>
  import userdemoform from './userdemoform'

  export default {
    name: 'userdemo',
    components: { userdemoform },
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },

    mounted() {

    },
    methods: {

      doEdit(row) { // 增加或编辑
        this.$refs['userdemoform'].show(row)
      }
    }
  }
</script>
