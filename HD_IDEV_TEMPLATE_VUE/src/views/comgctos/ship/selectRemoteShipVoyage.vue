<template>
  <el-dialog  :title="formTitile" :visible.sync="visible" width="70%" top="15vh">
    <div  style="height:45vh">
        <hd-grid :hdQuery="hdQuery" ref="grid" :hdResult="hdResult" ckHide noSets notInit pageHide recHide >
          <div class="filter-container" slot="query">

            <el-button class="filter-item" @click="doSelect('1')" type="primary" >合并</el-button>
            <el-button class="filter-item" @click="doSelect('0')" type="danger" >不合并</el-button>
          </div>
          <el-table-column width="110" align="left" header-align="center" label="船名" prop="shipVoyage.shipName" ></el-table-column>
          <el-table-column width="110" align="left" header-align="center" label="英文船名" prop="shipVoyage.enShipName" ></el-table-column>
          <el-table-column width="80px" align="left" header-align="center" label="呼号" prop="shipVoyage.callSign" ></el-table-column>
          <el-table-column width="80px" align="left" header-align="center" label="IMO" prop="shipVoyage.imo" ></el-table-column>
          <el-table-column width="100px" align="left" header-align="center" label="国籍" prop="shipVoyage.scountryIdStr" sortable></el-table-column>
          <el-table-column width="100px" align="left" header-align="center" label="MMSI" prop="shipVoyage.mmsi" ></el-table-column>
          <el-table-column width="70px" align="right" header-align="center" label="船长" prop="shipVoyage.shipLength" sortable></el-table-column>
          <el-table-column width="70px" align="right" header-align="center" label="船宽" prop="shipVoyage.shipWidth" sortable></el-table-column>
          <el-table-column width="120px" align="left"  header-align="center" label="预抵时间" prop="shipVoyage.eta" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="预离日期" prop="shipVoyage.etd" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="船代" prop="shipAgentStr" sortable></el-table-column>
          <el-table-column width="50px" align="center" label="+/-" prop="unloadCode" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="货名" prop="sckindName" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="起运港" prop="shipVoyage.fromSportIdStr" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center"  label="上一港" prop="shipVoyage.lastSportIdStr" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="下一港" prop="shipVoyage.nextSportIdStr" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="预报日期" prop="shipVoyage.billDate" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="货主" prop="shipperStr" sortable></el-table-column>
          <el-table-column width="100px" align="left"  header-align="center" label="货代" prop="cargoAgentStr" sortable></el-table-column>
        </hd-grid>
    </div>
  </el-dialog>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        formTitile:"选择船舶资料",
        visible:false,
        hdResult:{},
        hdQuery:{sort:''}
      }
    },
    props: {},
    methods: {
      show(shipData) { // 换为本表主键
        this.visible = true;
        this.$nextTick(() => {
          this.hdResult = shipData;
        });
      },
      doSelect(state)
      {
        if(state=="1"&&(!this.hdQuery.selRow||!this.hdQuery.selRow.shipId)) {
          this.$message({type: 'error', message: "请选择申报船舶信息！"});
        }else {
          this.visible = false;
          this.$emit("onSelectShipVoyage", state, this.hdQuery.selRow);
          this.hdQuery.selRow={};
        }
      }
    },
    computed: {
    }
  }
</script>
