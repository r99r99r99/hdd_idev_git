<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/tech/ComExField" not-init>
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" style="width: 200px;" class="filter-item" placeholder="名称"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()"  keyType="query">搜索</el-button>
          <el-button class="filter-item"  @click="doEdit(null)" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger"  keyType="del">删除
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="center" label="编码" prop="gridCode" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="是否使用" prop="useFlg" :inputFormat='$ckFt' sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="表达宽度" prop="formXs" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="表单高度" prop="formSpan" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="列表默认宽度" prop="gridWidth" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="默认值" prop="defaultValue" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="描述" prop="placeHolder" sortable>
        </el-table-column>
        <el-table-column width="100px" align="center" label="规则" prop="rules" sortable>
        </el-table-column>
 <!--       <el-table-column width="100px" align="center" label="对应列" prop="columnId" sortable>
        </el-table-column>-->


      </hd-com-grid>
    </el-main>
    <comexfieldform ref="comexfieldform" @save-ok="$refs.grid.doQuery()"></comexfieldform>
  </el-container>
</template>
<script>
    import comexfieldform from './comexfieldform'
    export default {
        name: 'comexfieldsub',
        components: {  comexfieldform },
        data() {
            return {
                hdQuery: new HdQuery(this),
            }
        },

        mounted() {

        },
        methods: {

            doEdit(row) { // 增加或编辑
                this.$refs['comexfieldform'].show(row)
            },
            query(exColumnId) {
                this.hdQuery.query.exColumnId = exColumnId;
                this.$refs.grid.doQuery();
            }
        }
    }
</script>
