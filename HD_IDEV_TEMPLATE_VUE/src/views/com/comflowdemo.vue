<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/com/ComFlowDemo">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()"  keyType="query">搜索</el-button>
          <el-button class="filter-item"  @click="doEdit('')" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger"  keyType="del">删除
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.demoId)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>

              <el-table-column width="100px" align="center" label="" prop="demoState" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="procInsId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="demoText2" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="demoText4" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="demoText3" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="demoId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="demoText" sortable>
              </el-table-column>


      </hd-com-grid>
    </el-main>
    <comflowdemoform ref="comflowdemoform" @save-ok="$refs.grid.doQuery()"></comflowdemoform>
  </el-container>
</template>
<script>
  import comflowdemoform from './comflowdemoform'
  export default {
    name: 'comflowdemo',
    components: {  comflowdemoform },
    data() {
      return {
        hdQuery: new HdQuery(this),
       }
    },

    mounted() {

    },
    methods: {

      doEdit(demoId) { // 增加或编辑
        this.$refs['comflowdemoform'].show(demoId)
      },
    }
  }
</script>
