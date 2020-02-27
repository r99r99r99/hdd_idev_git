<template>
  <div style="width:220px;"  @click="doPop">
    <el-dialog title="选船" :visible.sync="visible" top="10vh" width='75%' append-to-body>

      <hd-com-grid :hdQuery="hdQuery"   ref="grid" url="/webresources/login/ship/Ship" height="450px" ckHide indexHide noSets recHide  notInit  @row-click="doClick">
        <div class="filter-container" slot="query" style="padding:5px;">
          <el-input @keyup.enter.native="doQuery" style="width: 110px;" class="filter-item" placeholder="名称、航次" v-model="hdQuery.query.anyQuery"></el-input>
          <HdDropCus @keyup.enter.native="doQuery" @change="setConVal" style="width: 110px;"  class="filter-item" field="SHIP_STAT_CODE" placeholder="状态" v-model="hdQuery.query.shipStatCode"></HdDropCus>
          <el-date-picker class="filter-item" v-model="hdQuery.query.rtd" type="daterange" style="width: 250px;" :start-placeholder=beginStr :end-placeholder=endStr value-format="yyyy-MM-dd" v-if=" hdQuery.query.shipStatCode=='L'||hdQuery.query.shipStatCode=='B'"  ></el-date-picker>
          <el-button  @click="doQuery"  type="primary">搜索</el-button>
          <el-button  @click="doClears"  type="primary">清空</el-button>
        </div>

        <el-table-column width="70px" align="left" header-align="center" label="状态" prop="shipVoyage.shipStatCodeStr" fixed="right"></el-table-column>
        <el-table-column width="70px" align="left" header-align="center" label="来源" prop="shipVoyage.shipSrcCode" fixed="right">
          <template slot-scope="scope">
            <span>{{(scope.row.shipVoyage&&scope.row.shipVoyage.shipSrcCode)?scope.row.shipVoyage.shipSrcCode=="0"?'集团预报': scope.row.shipVoyage.shipSrcCode=="1"?"网上受理":scope.row.shipVoyage.shipSrcCode=="2"?"公司预报":scope.row.shipVoyage.shipSrcCode=="3"?"集团接受":"":""}}</span>
          </template>
        </el-table-column>

        <el-table-column width="100px" align="left" header-align="center" label="名称" prop="shipName" fixed="left" sortable></el-table-column>
        <el-table-column width="80px" align="left" header-align="center" label="航次" prop="voyage" fixed="left"></el-table-column>
        <el-table-column width="60px" align="left" header-align="center" label="泊位" prop="shipVoyage.lastSberthIdStr"  ></el-table-column>
        <el-table-column width="70px" align="left" header-align="center" label="英文" prop="enShipName"  sortable>
        </el-table-column>
        <el-table-column width="50px" align="center" label="+/-" prop="ieCode" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.ieCode=="I"?'-':'+' }}</span>
          </template>
        </el-table-column>

        <el-table-column width="75px" align="left" header-align="center" label="内外贸" prop="tradeCode" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.tradeCode=="1"?'内贸':'外贸'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80px" align="right" header-align="center" label="载货量" prop="cargoWgt" sortable></el-table-column>
        <el-table-column width="130px" align="center" label="抵锚时间" prop="shipVoyage.rtm"></el-table-column>
        <el-table-column width="130px" align="center" label="靠泊时间" prop="shipVoyage.rtb"></el-table-column>
        <el-table-column width="130px" align="center" label="离港时间" prop="shipVoyage.rtd"></el-table-column>
        <el-table-column width="170px" align="left" label="作业公司"   prop="workComStr">
          <template slot-scope="scope">
            <span v-for="(comStr,index) in scope.row.workComStr">{{index==0?comStr:'，'+comStr}}</span>
          </template>
        </el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="国籍" prop="shipVoyage.scountryIdStr"></el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="汉字提示" prop="hzts" sortable></el-table-column>
      </hd-com-grid>
    </el-dialog>
    <hd-pop-sel :txtVal="txtVal" :idVal="idVal" @clear="doClear" :placeholder="$t('请点击选船')">
    </hd-pop-sel>
  </div>
</template>
<script>
  import HdDropCus from '@/views/comgctos/singleSel/HdDropCus'
  export default {
    name: 'selship',
    components: {HdDropCus },
    data() {
      return {
        isFirst: true,//第一次显示查询,以后不查询
        visible: false,
        hdQuery: new HdQuery(this),
        beginStr:"离港开始日期",
        endStr:"离港结束日期",
        dateDis:[]
      }
    },
    mounted() {
      let end = new Date();
      let start = new Date();
      start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
      this.dateDis=[start,end];
      this.$set(this.hdQuery.query, 'rtd',this.dateDis);
    },
    props: { idVal: String, txtVal: String, ieCode:String, shipStatCode:{type:String, default:'-1'} },// 设置value为props属性-必须
    methods: {
      doQuery() {
          this.hdQuery.query.ieCode=this.ieCode
          this.hdQuery.query.gh='1'
          this.hdQuery.sort='updTim'
          this.$nextTick(() => {
            this.$refs.grid.doQuery()
          })
      },
      setConVal(){
        if(this.hdQuery.query.shipStatCode=='L'){
          this.beginStr="离港开始日期";
          this.endStr="离港结束日期";
        }else if(this.hdQuery.query.shipStatCode=='B'){
          this.beginStr="离泊开始日期";
          this.endStr="离泊结束日期";
        }
      },
      doClears() {
        this.hdQuery = new HdQuery(this)
      },
      doClick(row) {
        let trade=row.tradeCode=='1'?'内贸':'外贸'
        this.$emit('update:txtVal', row.shipName+"  "+row.voyage+"  "+trade)
        this.$emit('update:idVal', row.shipId)
        this.$emit('sel-ok')
        this.visible = false
      },
      doClear() {
        this.$emit('update:txtVal', '')
        this.$emit('update:idVal', '')
      },
      doPop() {
        this.visible = true
      }
    },
    watch: {
      // 如果 `activeName` 发生改变，这个函数就会运行
      visible: function (newVal) {
        if (newVal && this.isFirst) {//第一次显示查询,以后不查询
          this.isFirst = false
          this.$set(this.hdQuery.query, 'shipStatCode', this.shipStatCode)//在港船
          this.doQuery()
        }
      }
    }
  }
</script>


