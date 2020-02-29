<template>
  <el-container>
    <el-main>
      <div class="btn-group" role="group" aria-label="...">

      </div>
      <div class="example">
        <div class=" hidden-xs" id="cClientToolbar" role="group">
          <!--<el-input
                    v-model="ces">
          </el-input>-->
          <input  type="text" name="batch" id="batch"/>
          <el-button class="filter-item" type="primary" icon="search" @click="$refs.grid.doQuery()" keyType="query">搜索
          </el-button>
          <el-button class="filter-item" @click="cesss()" type="primary" icon="edit" keyType="add">新增
          </el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()" type="danger" keyType="del">删除
          </el-button>
        </div>
        <table id="gBatchTable" data-mobile-responsive="true" class="table table-bordered table-striped">
        </table>
      </div>
    </el-main>
  </el-container>
</template>
<script>


  export default {
    name: 'userdemo',
    components: {  },
    data() {
      return {
        rows:[],
        ces:'',
        message: [],
        columns: [
          {
            checkbox: true
          },
          {
            class: 'table-overflow',
            field: 'line_nam',
            title: '线路名称',
            align: 'left',
            halign: 'center',
            width: '120',
          },

          {
            class: 'table-overflow',
            field: 'str_place_nam',
            title: '线路开始地点',
            align: 'left',
            halign: 'center',
            width: '120',
          },
          {
            class: 'table-overflow',
            field: 'end_place_nam',
            title: '线路结束地点',
            align: 'left',
            halign: 'center',
            width: '120',
          },
          {
            class: 'table-overflow',
            field: 'remark',
            title: '线路备注',
            align: 'left',
            halign: 'center',
            width: '120',
          },

          {
            class: 'table-overflow',
            field: 'record_nam',
            title: '录入人姓名',
            align: 'left',
            halign: 'center',
            width: '120',
          },
          {
            class: 'table-overflow',
            field: 'record_tim',
            title: '录入时间',
            align: 'left',
            halign: 'center',
            width: '120',
          },

        ]
      }
    },

    mounted() {
      let _this=this;
      setTimeout(function()  {

        $('#gBatchTable').bootstrapTable({
          columns: _this.columns,
          pagination: true,
          toolbar: '#cClientToolbar',
          pageList: [10, 20],
          pageSize: 10,
          pageNumber: 1,
          striped: true,
          sortable: true,
          contentType: "application/x-www-form-urlencoded",
          sidePagination: 'client',
          showColumns: true,
          showRefresh: true,
          minimumCountColumns: 2,
          singleSelect: true,
          clickToSelect: true,
          showExport: true,//工具栏上显示导出按钮
          exportDataType: "all",//显示导出范围
          exportTypes: ['csv', 'txt', 'sql', 'doc', 'excel'],//导出格式
          exportOptions: {//导出设置
            fileName: '下达物流计划',//下载文件名称
            ignoreColumn: [0],//忽略第一列复选框
          },
          smartDisplay: true,
          onClickRow: function (row, t) {
          }
        });

      }, 40);

    },
    methods: {
      cesss() { // 增加或编辑
      }
    }
  }
</script>
