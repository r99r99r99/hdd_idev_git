<template>
  <el-container style="height: 100%; ">
    <el-aside width="35%"  title="表名">
      <hd-com-grid :hdQuery="hdQuery" ref="gridleft" url="webresources/login/com/TableDictionary" @row-click="doClickQuery" >
        <div class="filter-container" slot="query">
          <el-input @keyup.enter.native="$refs.gridleft.doQuery()" suffix-icon="el-icon-search"  style="width: 200px;float:right;" class="filter-item" placeholder="表名、名称" v-model="hdQuery.query.anyQuery">
          </el-input>
          <el-button class="filter-item" @click="$refs.gridleft.doEdit('')" type="primary" >新增</el-button>
          <el-button class="filter-item" @click="$refs.gridleft.doRemoveAll()" type="danger">删除</el-button>
        </div>
        <el-table-column width="60px" align="center" label="操作" fixed="right">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="$refs.gridleft.doEdit(scope.row)" v-if="!scope.row.isEdit">编辑</hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.gridleft.doRemove(scope.row)" v-if="!scope.row.isEdit">删除</hd-btn>
            <hd-btn icon="el-icon-check" hint="保存" @click.stop="$refs.gridleft.doSave(scope.row)" v-if="scope.row.isEdit">保存</hd-btn>
            <hd-btn hint="撤销" @click.stop="$refs.gridleft.doCancel(scope.row,scope.$index)" v-if="scope.row.isEdit"><svg-icon icon-class="undo"/></hd-btn>
          </template>
        </el-table-column>
        <el-table-column width="170px" align="left" header-align="center" label="表名" prop="tableCode" sortable></el-table-column>
        <el-table-column width="180px" align="left" header-align="center" label="名称" prop="tableName" sortable></el-table-column>

      </hd-com-grid>
    </el-aside>
    <el-main  title="数据">
      <hd-com-grid :hdQuery="formathdQuery" ref="gridright" url="/webresources/login/code/SbcCargoFormat" notInit>
        <div class="filter-container" slot="query">
          <el-button class="filter-item" @click="formatEdit('')" type="primary" >新增</el-button>
          <el-button class="filter-item" @click="$refs.gridright.doRemoveAll()" type="danger">删除</el-button>
          <tlifend :ifend.sync="formathdQuery.query.ifendFlag" @ifendFlag="formatQuery"></tlifend>
        </div>
      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        hdQuery: new HdQuery(this),
        formathdQuery: new HdQuery(this),
        scargoId:''
      }
    },
    methods: {
      doClickQuery(row) {
/*        // 显示loading框
        if (row){
          this.scargoId = row.scargoId
        }
        this.formatQuery();*/
      },
      formatQuery(){
        if (!this.scargoId) {
          this.$message({ type: 'error', message: '请先选择货名！'})
          return
        }
        this.formathdQuery.query.scargoId=this.scargoId;
        this.$refs['gridright'].doQuery();
      },
      formatEdit(row) {
        if (!this.scargoId) {
          this.$message({ type: 'error',message: '请先选择货名！'})
          return
        }
        this.formathdQuery.query.scargoId=this.scargoId;
        this.$refs.gridright.doEdit(row);
      }
    }
  }
</script>

