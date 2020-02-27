<template>
  <!--开发示例:pop选择的-->
  <hd-grid-sel :txtVal="txtVal" :idVal="idVal" placeholder="请点击选取"  height="50vh" width="50vw"  :hdQuery="hdQuery"  :disabled="disabled"  ref="gridsel"
               url="/webresources/login/cargo/Cargo/find" @rowClick="doClick" :beforeQuery="beforeQuery">
    <div class="filter-container" slot="query">
      <selshippop class="filter-item" :txtVal.sync="hdQuery.query.shipNam" :idVal.sync="hdQuery.query.shipId"  @sel-ok="$refs.gridsel.$refs.grid.doQuery()"></selshippop>
      <sbcclient  class="filter-item" style="width: 150px" :txtVal.sync="hdQuery.query.forwarderName" :idVal.sync="hdQuery.query.cargoAgentId"  :placeholder="$t('货代')"  :clientFlag="'07'" @sel-ok="$refs.gridsel.$refs.grid.doQuery()"></sbcclient>
      <cargocode  class="filter-item" style="width: 150px;"  :txtVal.sync="hdQuery.query.cargoName" @sel-ok="$refs.gridsel.$refs.grid.doQuery()" :idVal.sync="hdQuery.query.scargoId"></cargocode>
      <el-button  class="filter-item" @click="$refs.gridsel.$refs.grid.doQuery()" type="primary" :keyMap="['alt','r']">搜索</el-button>
    </div>
    <el-table-column   width="120px" align="left" header-align="center" label="船名" prop="shipName"   v-if="informType!='DZ'"></el-table-column>
    <el-table-column   width="120px" align="left" header-align="center" label="航次" prop="voyage"   v-if="informType!='DZ'"></el-table-column>
    <el-table-column  width="100px" align="left" header-align="center" label="提(运)单号" prop="billNo" sortable></el-table-column>
    <el-table-column  width="120px" align="left" header-align="center" label="货号" prop="cargoNo" sortable></el-table-column>
    <el-table-column  width="120px" align="left" header-align="center" label="货名" prop="cargoName" sortable  show-overflow-tooltip></el-table-column>
    <el-table-column  width="75px" align="left" header-align="center" label="内外贸" prop="tradeCodeStr" sortable></el-table-column>
    <el-table-column  width="60px" align="left" header-align="center" label="唛头" prop="cargoMark" sortable></el-table-column>
    <el-table-column width="60px"  align="left" header-align="center" label="包装" prop="packageName" sortable></el-table-column>
    <el-table-column width="120px" align="left" header-align="center" label="货主" prop="shipperName" sortable></el-table-column>
    <el-table-column width="120px"  align="left" header-align="center" label="货代" prop="cargoAgentName" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="规格" prop="format" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="产地" prop="originName" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="品种" prop="mataCode" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="件数" prop="cargoNum" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="重量" prop="cargoWgt" sortable></el-table-column>
    <el-table-column width="60px" align="left" header-align="center" label="体积" prop="cargoVol" sortable></el-table-column>
  </hd-grid-sel>
</template>

<script>
  import selshippop from "../comgctos/selshippop"
  import sbcclient from "../comgctos/sel_sbcclient"
  import cargocode from "../comgctos/sel_sbccargo"
  export default {
    name: 'selcargo',
    components: {selshippop,sbcclient,cargocode},
    data() {
      return {
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {

    },
    props: {idVal: String, txtVal: String, disabled: Boolean, indexRow: Object, informType: String, shipId: String},
    methods: {
      beforeQuery(val) {
        this.hdQuery.query.anyQuery = val
        this.hdQuery.query.mtype = this.mtype
        this.hdQuery.query.shipId = this.shipId
        this.hdQuery.query.ifendCode = "0"
      },
      doClick(row) {
        this.$emit('update:txtVal', row.cargoNo)
        this.$emit('update:idVal', row.cargoId)
        this.$emit('selItem', row) // 主页面调用弹窗时添加
      }
    },
    computed:{
      mtype: function(){
        if(this.informType=='JG'){
          return 'ZC'
        }else if(this.informType=='SG'){
          return 'XC'
        }else{
          return this.informType
        }
      }
    }

  }
</script>

