<template>
  <el-dialog  :title="formTitile" :visible.sync="visible" width="60%"  top="1vh" style="z-index: 1100;">
    <div  style="height:45vh">
        <hd-grid :hdQuery="hdQuery" ref="grid" :hdResult="hdResult" ckHide noSets notInit pageHide recHide  @row-click="doSelect" >
          <el-table-column width="110" align="left" header-align="center" label="船名" prop="shipName" ></el-table-column>
          <el-table-column width="110" align="left" header-align="center" label="英文船名" prop="enShipName" ></el-table-column>
          <el-table-column width="100px" align="left" header-align="center" label="国籍" prop="scountryIdStr" sortable></el-table-column>
          <el-table-column width="110" align="left" header-align="center" label="呼号" prop="callSign" sortable></el-table-column>
          <el-table-column width="80px" align="left" header-align="center" label="IMO" prop="imo" sortable></el-table-column>
          <el-table-column width="100px" align="left" header-align="center" label="MMSI号" prop="mmsi" sortable></el-table-column>
          <el-table-column width="100px" align="right" header-align="center" label="船长" prop="shipLength" sortable></el-table-column>
          <el-table-column width="100px" align="right" header-align="center" label="船宽" prop="shipWidth" sortable></el-table-column>
          <el-table-column width="100px" align="right" header-align="center" label="船高" prop="shipHeight" sortable></el-table-column>
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
      doSelect(row)
      {
        this.visible=false;
        this.$emit("onSelectShip",row);

      }
    },
    computed: {
    }
  }
</script>
