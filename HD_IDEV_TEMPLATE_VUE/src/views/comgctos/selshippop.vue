<template>
  <div  @click="doPop">
    <el-popover placement="bottom-start" ref="popSel" v-model="visible">
      <div class="filter-container" style="width:50vw">
        <el-input @keyup.enter.native="doQuery" style="width: 110px;" class="filter-item" placeholder="名称、航次" v-model="hdQuery.query.anyQuery">
        </el-input>
        <hd-drop @keyup.enter.native="doQuery" style="width: 110px;"  class="filter-item" field="SHIP_STAT_CODE" placeholder="船舶状态" v-model="hdQuery.query.shipStatCode"></hd-drop>

        <el-date-picker class="filter-item" v-model="hdQuery.query.rtd" type="daterange" style="width: 250px;" start-placeholder="离港开始日期" end-placeholder="离港结束日期"
                        value-format="yyyy-MM-dd" v-if=" hdQuery.query.shipStatCode=='L'"  ></el-date-picker>
        <el-button  @click="doQuery"  type="primary">搜索</el-button>
        <el-button  @click="doClears"  type="primary">清空</el-button>
      <hd-com-grid :hdQuery="hdQuery"   ref="grid" url="/webresources/login/ship/Ship"  height="250px" ckHide indexHide  recHide  notInit  @row-click="doClick">
        <el-table-column width="70px" align="left" header-align="center" label="状态" prop="shipVoyage.shipStatCodeStr" fixed="right"></el-table-column>
        <el-table-column width="120px" align="left" header-align="center" label="名称" prop="shipName" fixed="left" sortable></el-table-column>
        <el-table-column width="80px" align="left" header-align="center" label="泊位" prop="shipVoyage.lastSberthIdStr"  ></el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="英文名称" prop="enShipName"  sortable>
        </el-table-column>
        <el-table-column width="70px" align="center" label="+/-" prop="ieCode" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.ieCode=="I"?'-':'+' }}</span>
          </template>
        </el-table-column>
        <el-table-column width="80px" align="left" header-align="center" label="航次" prop="voyage">
        </el-table-column>
        <el-table-column width="80px" align="center" header-align="center" label="内外贸" prop="tradeCode" sortable>
          <template slot-scope="scope">
            <span>{{scope.row.tradeCode=="1"?'内贸':'外贸'}}</span>
          </template>
        </el-table-column>
        <el-table-column width="80px" align="right" header-align="center" label="载货量" prop="cargoWgt" sortable></el-table-column>
        <el-table-column width="130px" align="center" label="抵锚时间" prop="shipVoyage.rtm"></el-table-column>
        <el-table-column width="130px" align="center" label="靠泊时间" prop="shipVoyage.rtb"></el-table-column>
        <el-table-column width="130px" align="center" label="离港时间" prop="shipVoyage.rtd"></el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="国籍" prop="shipVoyage.scountryIdStr"></el-table-column>
        <el-table-column width="100px" align="left" header-align="center" label="汉字提示" prop="hzts" sortable></el-table-column>
      </hd-com-grid>
      </div>
    </el-popover>
    <hd-pop-sel :txtVal="txtVal" :idVal="idVal" v-popover:popSel @clear="doClear" placeholder="请点击选船" >
    </hd-pop-sel>
  </div>
</template>
<script>
  export default {
    name: 'selship',
    components: {},
    data() {
      return {
        isFirst: true,//第一次显示查询,以后不查询
        visible: false,
        hdQuery: new HdQuery(this)
      }
    },
    mounted() {
    },
    props: {idVal: String, txtVal: String, ieCode:String },// 设置value为props属性-必须
    methods: {
      doQuery() {
        if(this.hdQuery.query.shipStatCode!='L'){
          this.$set(this.hdQuery.query, 'rtd',null)
        }
        this.hdQuery.query.ieCode=this.ieCode
        this.$nextTick(() => {
          this.$refs.grid.doQuery()
        })
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


