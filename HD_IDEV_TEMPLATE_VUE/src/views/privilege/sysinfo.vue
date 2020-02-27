<style>
  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 110px;
  }
  .el-input.is-disabled .el-input__inner {
    background-color:white;
  }
</style>`
<template>
  <el-container style="height: 100%; ">
    <el-main>
      <hd-com-grid :hdQuery="hdQueryInfo" ref="grid" url="/webresources/login/priviledge/SysInfo" :defaultSort="{prop: 'seqNo', order: 'ascending'}">
        <div class="filter-container" slot="query">
          <el-button class="filter-item" @click="$refs.grid.doEdit('')"  type="primary" :keyMap="['alt','a']">新增</el-button>
          <el-button class="filter-item" @click="$refs.grid.doRemoveAll()"  type="danger" :keyMap="['alt','d']">删除</el-button>
          <el-input placeholder="代码、名称" suffix-icon="el-icon-search" class="filter-item"
                    style="width: 120px;float:right;"
                    v-model="hdQueryInfo.query.anyQuery" @keyup.enter.native="$refs.grid.doQuery()"></el-input>
          <!--<tlifend :ifend.sync="hdQueryInfo.query.ifendFlag" @ifendFlag="$refs.grid.doQuery()"></tlifend>-->
        </div>
        <el-table-column width="60px" align="center" label="操作" fixed="right" :aria-disabled="true">
          <template slot-scope="scope">
            <hd-btn icon="el-icon-edit" hint="编辑" @click.stop="$refs.grid.doEdit(scope.row)" v-if="!scope.row.isEdit">编辑</hd-btn>
            <hd-btn icon="el-icon-check" hint="保存" @click.stop="$refs.grid.doSave(scope.row)" v-if="scope.row.isEdit">保存</hd-btn>
            <hd-btn hint="撤销" @click.stop="$refs.grid.doCancel(scope.row,scope.$index)" v-if="scope.row.isEdit">
              <svg-icon icon-class="undo"/></hd-btn>
            <hd-btn icon="el-icon-delete" hint="删除" @click.stop="$refs.grid.doRemove(scope.row)" v-if="!scope.row.isEdit">删除</hd-btn>
          </template>
        </el-table-column>
        <!--<el-table-column width="40px" header-align="center" align="center" label="状态">
          <template slot-scope="scope">
            <span>
              <i v-if="scope.row.ifendFlag =='1'" class="el-icon-star-on" style="color: red;"></i>
               <i v-else="scope.row.ifendFlag =='0'" class="el-icon-star-on" style="color: black;"></i>
            </span>
          </template>
        </el-table-column>-->
        <el-table-column width="65px" header-align="center" align="left" label="序号" prop="seqNo" sortable :rules="$r('',0,9)"></el-table-column>
        <!--<el-table-column width="100px" header-align="center" align="left" label="注册日期" prop="useDat" sortable :rules="$r('',0,50)"></el-table-column>-->
        <el-table-column width="120px" header-align="center" align="center" label="注册日期" prop="useDat"
                         input="el-date-picker" :inputProp="$simtime" :inputFormat="$simtimeshow"></el-table-column>
        <!--<el-table-column width="120px" header-align="center" align="center" label="注册日期">
          <template slot-scope="scope">
            <el-date-picker :disabled="!scope.row.isEdit" width="100px;"
              v-model="scope.row.useDat"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </template>
        </el-table-column>-->
        <!--<el-table-column width="120px" header-align="center" align="center" label="使用单位">
          <template slot-scope="scope">
            <single_authorgn style="width: 100%;"  v-model="scope.row.teamOrgnId" :disabled="!scope.row.isEdit"></single_authorgn>
          </template>
        </el-table-column>-->
        <el-table-column width="100px" align="left" header-align="center" label="使用单位" prop="teamOrgnId"
                         :input="require('@/views/comgctos/singleSel/single_authorgn').default" txtVal="shortNam"
                         idVal="teamOrgnId" >
        </el-table-column>

        <el-table-column width="120px" header-align="center" align="left" label="单位标识符" prop="orgnMark" sortable :rules="$r(1,0,50)"></el-table-column>
        <!--<el-table-column width="100px" header-align="center" align="left" label="港口编码" prop="sportId" sortable noEdit></el-table-column>-->
        <!--<el-table-column width="120px" header-align="center" align="center" label="港口编码">
          <template slot-scope="scope">
            <selsbcport style="width: 100%" :txtVal.sync="scope.row.portName"  :disabled="!scope.row.isEdit"
                         :idVal.sync="scope.row.sportId" ></selsbcport>
          </template>
        </el-table-column>-->

        <el-table-column width="100px" align="left" header-align="center" label="港口编码" prop="sportId"
                         :input="require('@/views/comgctos/sel_sbcport').default" txtVal="portName"
                         idVal="sportId" >
        </el-table-column>


        <el-table-column width="100px" header-align="center" align="left" label="产品名称" prop="prodKind" sortable ></el-table-column>
        <el-table-column width="125px" header-align="center" align="left" label="组织英文名称" prop="enOrgnName" sortable ></el-table-column>
        <el-table-column width="200px" header-align="center" align="left" label="备注" prop="description" sortable :rules="$r('',0,255)"></el-table-column>

      </hd-com-grid>
    </el-main>
  </el-container>
</template>
<script>
  import selsbcport from '@/views/comgctos/sel_sbcport'
  import single_authorgn from '@/views/comgctos/singleSel/single_authorgn'
  import tlifend from '@/views/comgctos/showTl/tl_ifend'
  export default {
    components: {single_authorgn,selsbcport,tlifend},
    data() {
      return {
        hdQueryInfo: new HdQuery(this),
      }
    },
    methods: {
    }
  }
</script>
