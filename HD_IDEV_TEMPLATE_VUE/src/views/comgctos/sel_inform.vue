<template>
  <!--开发示例:pop选择的-->
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取"
               height="50vh" :hdQuery="hdQuery"  :disabled="disabled"
               url="/webresources/login/inform/Inform/find" @rowClick="doClick" :beforeQuery="beforeQuery" ref="gridsel">
    <div class="filter-container" slot="query">
      <selshippop class="filter-item" :txtVal.sync="hdQuery.query.shipNam" :idVal.sync="hdQuery.query.shipId"  @sel-ok="$refs.gridsel.$refs.grid.doQuery()"></selshippop>
      <sbcclient class="filter-item" style="width: 150px" :txtVal.sync="hdQuery.query.cargoAgentName" :idVal.sync="hdQuery.query.cargoAgentId"  placeholder="货代"  :clientFlag="'07'" @sel-ok="$refs.grid.doQuery()"></sbcclient>
      <selsbccargo  class="filter-item" style="width: 150px;"  placeholder="货名" :txtVal.sync="hdQuery.query.cargoName" @sel-ok="$refs.grid.doQuery()" :idVal.sync="hdQuery.query.scargoId"></selsbccargo>
      <hd-drop class="filter-item" field="INFORM_TYPE"  style="width: 150px;"  placeholder="计划类型" v-model="hdQuery.query.informType"></hd-drop>
      <el-button class="filter-item" type="primary" @click="$refs.gridsel.$refs.grid.doQuery()" :keyMap="['alt','r']">搜索</el-button>
    </div>
    <el-table-column  width="120px" align="left" header-align="center" label="船名" prop="shipName"   v-if="informType!='DZ'"></el-table-column>
    <el-table-column width="120px"  align="left" header-align="center" label="航次" prop="voyage"   v-if="informType!='DZ'"></el-table-column>
    <el-table-column  width="100px"   align="left" header-align="center" label="提(运)单号" prop="billNo" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="货名" prop="cargoName" sortable show-overflow-tooltip></el-table-column>
    <el-table-column  align="left" header-align="center" label="内外贸" prop="tradeCodeStr" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="唛头" prop="cargoMark" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="包装" prop="packageName" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="货主" prop="shipperName" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="货代" prop="cargoAgentName" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="规格" prop="format" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="产地" prop="originName" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="品种" prop="mataCode" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="件数" prop="cargoNum" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="重量" prop="cargoWgt" sortable></el-table-column>
    <el-table-column  align="left" header-align="center" label="体积" prop="cargoVol" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
  import selshippop  from '@/views/comgctos/selshippop'
  import sbcclient   from '@/views/comgctos/sel_sbcclient'
  import selsbccargo from '@/views/comgctos/sel_sbccargo'
  export default {
    name: 'selInform',
    components: {selshippop,sbcclient,selsbccargo},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, disabled: Boolean, indexRow: Object},
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.query.ifendCode = "0"
      },
      doClick(row) {
        this.$emit('update:txtVal', row.informTypeStr)
        this.$emit('update:idVal',  row.informId)
        this.$emit('selItem', row) // 主页面调用弹窗时添加
      }
    }

  }
</script>

