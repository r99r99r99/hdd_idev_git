<template>
  <el-container>
    <el-main>

      <hd-com-grid ref="grid" :hdQuery="hdQuery" url="/webresources/login/privilege/AuthOrgn" :removeUrl="removeUrl"
                   :defaultSort="{prop: 'sorter', order: 'ascending'}" readForm genChart>
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.grid.doQuery()" style="width: 200px;" class="filter-item"
                    :placeholder="$t('名称')"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button @click="$refs.grid.doQuery()" keyType="query">{{$t('搜索')}}</el-button>
          <el-button class="filter-item" @click="doEdit('')" type="primary" keyType="add">{{$t('新增')}}
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column width="100px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="doEdit(scope.row)"></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="doRemove(scope.row)"></hd-btn>
          </template>
        </el-table-column>

        <el-table-column width="170px" align="left" header-align="center" label="名称" prop="name" sortable>
        </el-table-column>
        <el-table-column width="170px" align="left" header-align="center" label="编码" prop="orgnCod" sortable>
        </el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="英文名" prop="enName" sortable>
        </el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="简称" prop="shortNam" sortable>
        </el-table-column>

        <el-table-column width="100px" align="left" header-align="center" label="类型" prop="orgnTyp" sortable
                         input="hd-drop" :inputProp="{field:'ORGN_TYP'}" :inputFormat="(d,row)=>row.orgnTypStr">
        </el-table-column>
        <el-table-column width="150px" align="left" header-align="center" label="描述" prop="description" sortable>
        </el-table-column>
        <el-table-column width="60px" align="left" header-align="center" label="排序" prop="sorter" chartNum sortable>
        </el-table-column>

      </hd-com-grid>
    </el-main>
    <authorgnform ref="authorgnform" @change="change" :hdQuery="hdQuery"></authorgnform>
  </el-container>
</template>
<script>
  import authorgnform from './authorgnform'

  export default {
    name: 'authOrgn',
    components: {authorgnform},
    data() {
      return {
        removeUrl: '',
        parentId: '',
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    methods: {
      queryOrg(parentId) {
        this.parentId = parentId
        this.hdQuery.query.parentId = parentId
        this.$refs.grid.doQuery()
      },

      doEdit(row) { // 增加或编辑
        if (!row && !this.parentId) { // 新增
          this.$message({
            type: 'error',
            message: this.$t('未选择数据')
          })
          return false
        }
        this.$refs['authorgnform'].show(row, this.parentId)
      },
      doRemove(row) {
        // 为了兼容easyui,不能传对象到后台删除
        this.removeUrl = '/webresources/login/privilege/AuthOrgn/remove?orgnId=' + row.orgnId
        this.$refs.grid.doRemove(row).then(() => {
          this.$emit('change', {
            type: 'remove',
            parentId: this.parentId,
            data: {id: row.orgnId}
          })
        })
      },
      change: function (data) {
        this.$emit('change', data)
      }
    }
  }
</script>
