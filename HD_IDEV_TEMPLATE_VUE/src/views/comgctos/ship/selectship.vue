<template>
    <el-menu style="height:100%"  class="el-menu-vertical-demo fullheight">
      <el-submenu index="1">
        <template slot="title">
          <i class="fa fa-ship" style="color: #b3450e"></i>
          <span>预报{{"("+treeData.Esign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Esign"  @click="clickShip(item)">
            {{item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title">
          <i class="fa fa-ship" style="color: #4AB7BD"> </i>
          <span>锚地{{"("+treeData.Msign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Msign" @click="clickShip(item)">
            {{item.shipVoyage.lastSberthIdStr+"-"+ item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")+'-'+item.shipVoyage.rtm}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="fa fa-ship"  style="color: #003eff"></i>
          <span>在港{{"("+treeData.Bsign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Ysign" @click="clickShip(item)">
            {{item.shipVoyage.lastSberthIdStr+"-"+item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")+'-'+item.shipVoyage.rtb}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="fa fa-ship" style="color: #5f3f3f"></i>
          <span>离泊{{"("+treeData.Bsign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Bsign" @click="clickShip(item)">
            {{item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="5">
        <template slot="title">
          <i class="fa fa-ship"></i>
          <span>离港{{"("+treeData.Lsign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Lsign" @click="clickShip(item)">
            {{item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")+'-'+item.shipVoyage.rtd}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="6">
        <template slot="title">
          <i class="fa fa-ship" style="color: #C03639"></i>
          <span>改航{{"("+treeData.Dsign.length+")"}}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item :index="item.shipId" :key="item.shipId" v-for="item in treeData.Dsign" @click="clickShip(item)">
            {{item.shipName+(item.voyage?"-"+item.voyage+"-":'')+(item.tradeCodeStr?item.tradeCodeStr+"-":'')+(item.ieCode=="I"?"进口":"出口")+'-'+item.shipVoyage.shipStatTime}}
          </el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        listLoading: true,
        visiable: false,
        treeData:{}
      }
    },
    mounted() {
      this.findTree()
    },
    methods: {
      clickShip(item){
        this.$emit("onSelShip",item)
      },
      findTree(){
        this.$http.post('/webresources/login/ship/Ship/findShipTree').then(response => {
          const data = response.data.data;
          if(data) {
            this.treeData=data;
          }
        })
      }
    }
  }
</script>

<style>
  .el-menu-item, .el-submenu__title {
    height: 46px;
    line-height: 46px;
    padding: 0 20px;
    position: relative;
    -webkit-box-sizing: border-box;
    cursor: pointer;
    white-space: nowrap;
  }
  .el-menu-item-group__title {
    padding: 0px;
    line-height: normal;
    font-size: 12px;
    color: #909399;
  }
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 45px;
    min-width: 200px;
  }


</style>
