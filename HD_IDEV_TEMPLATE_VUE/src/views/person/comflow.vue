<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/tech/ComFlow">
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
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.flowId)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>

              <el-table-column width="100px" align="center" label="工作流表主键" prop="flowId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="业务主键" prop="busiId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="业务类型" prop="busiType" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="当前状态,每传递一次都要变更" prop="curType" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="用户ID" prop="userId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="业务描述" prop="content" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="orgnId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="" prop="teamOrgnId" sortable>
              </el-table-column>
              <el-table-column width="100px" align="center" label="备注信息" prop="description" sortable>
              </el-table-column>


      </hd-com-grid>
    </el-main>
    <comflowform ref="comflowform" @save-ok="$refs.grid.doQuery()"></comflowform>
  </el-container>
</template>
<script>
  import comflowform from './comflowform'
  export default {
    name: 'comflow',
    components: {  comflowform },
    data() {
      return {
        hdQuery: new HdQuery(this),
       }
    },

    mounted() {

    },
    methods: {

      doEdit(flowId) { // 增加或编辑
        this.$refs['comflowform'].show(flowId)
      },
    }
  }
</script>
