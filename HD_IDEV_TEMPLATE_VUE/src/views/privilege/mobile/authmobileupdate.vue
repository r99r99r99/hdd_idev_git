<template>
  <el-container>
    <el-main>

      <hd-com-grid :defaultSort="{prop: 'versionNo', order: 'descending'}" :hdQuery="hdQuery" ref="grid"
                   url="/webresources/login/mobile/AuthMobileUpdate">
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="doQuery" class="filter-item" :placeholder="$t('名称')" style="width: 200px;"
                    v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button @click="$refs.grid.doQuery()" class="filter-item" icon="search" keyType="query"
                     type="primary">{{$t('搜索')}}
          </el-button>
          <el-button @click="doEdit('')" class="filter-item" icon="edit" keyType="add" type="primary">{{$t('新增')}}
          </el-button>
          <el-button @click="$refs.grid.doRemoveAll()" class="filter-item" keyType="del" type="danger">{{$t('删除')}}
          </el-button>
        </div>
        <el-table-column align="center" fixed="right" label="操作" width="100px">
          <template slot-scope="scope">
            <hd-btn @click.stop="doEdit(scope.row.updateId)" hint="编辑" icon="el-icon-edit"></hd-btn>
            <hd-btn @click.stop="$refs.grid.doRemove(scope.row)" hint="删除" icon="el-icon-delete"></hd-btn>
            <hd-btn @click.stop="upload(scope.row)" hint="apk管理" icon="el-icon-upload"></hd-btn>
          </template>
        </el-table-column>
        <el-table-column align="center" label="版本号" prop="versionNo" sortable width="100px">
        </el-table-column>
        <el-table-column align="center" label="更新信息" prop="updateMsg" sortable width="200px">
        </el-table-column>
        <el-table-column align="center" label="备注" prop="remark" sortable width="200px">
        </el-table-column>

        <el-table-column align="center" label="强制升级" prop="isMust" sortable width="100px">
        </el-table-column>
      </hd-com-grid>
    </el-main>
    <authmobileupdateform @save-ok="saveOk" ref="authmobileupdateform"></authmobileupdateform>
    <HdFileUpload :multiple="false" accept="apk" limit="1" ref="upload"></HdFileUpload>
  </el-container>
</template>
<script>
  import authmobileupdateform from './authmobileupdateform'

  export default {
    name: 'authmobileupdate',
    components: {authmobileupdateform},
    data() {
      return {
        hdQuery: new HdQuery(this),
      }
    },

    mounted() {

    },
    methods: {
      saveOk(row) { // 增加或编辑
        this.$refs.grid.doQuery()
        this.upload(row)
      },
      doEdit(updateId) { // 增加或编辑
        this.$refs['authmobileupdateform'].show(updateId)
      },
      upload(row) {
        this.$refs['upload'].open("AuthMobileUpdate", row.updateId, true)
      }
    }
  }
</script>
