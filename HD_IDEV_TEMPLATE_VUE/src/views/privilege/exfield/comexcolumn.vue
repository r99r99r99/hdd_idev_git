<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/tech/ComExColumn" @row-click="rowClick">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()" keyType="query">搜索
          </el-button>
          <el-button class="filter-item" @click="doEdit('')" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">删除
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row.exColumnId)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="表名" prop="tableName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="字段名" prop="columnName" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="字段注解" prop="columnComment" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="字段类型" prop="columnTypeStr" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="是否必填" prop="columnRequire" sortable :inputFormat='$ckFt'>
        </el-table-column>
        <el-table-column width="100px" align="center" label="长度" prop="columnLen" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="比例" prop="columnScale" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="默认值" prop="defaultValue" sortable>
        </el-table-column>


      </hd-com-grid>
    </el-main>
    <comexcolumnform ref="comexcolumnform" @save-ok="$refs.grid.doQuery()"></comexcolumnform>
  </el-container>
</template>
<script>
    import comexcolumnform from './comexcolumnform'

    export default {
        name: 'comexcolumn',
        components: {comexcolumnform},
        data() {
            return {
                hdQuery: new HdQuery(this),
            }
        },

        mounted() {

        },
        methods: {

            doEdit(exColumnId) { // 增加或编辑
                this.$refs['comexcolumnform'].show(exColumnId)
            },
            rowClick(row) {
                this.$emit('rowClick', row);
            }
        }
    }
</script>
