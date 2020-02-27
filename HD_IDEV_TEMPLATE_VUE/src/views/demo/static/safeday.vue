<template>
  <div class="boxBg">
    <el-row>
      <div style="font-size: 30px;color:#ff6497; text-align: center;padding-top: 10px;">
        安全生产
      </div>
    </el-row>
    <el-row>
      <div style="font-size: 72px;color:#cfc400; text-align: center">
        {{total}}  <span style="font-size: 24px;">天</span>
      </div>
    </el-row>

  </div>
</template>
<script>
  export default {
    data() {
      return {
        hdQuery: new HdQuery(this),
        total: 3641
      }
    },
    mounted() {
      this.hdQuery.sort = 'planDte';
      this.hdQuery.rows = 1;
      this.$http.post('/webresources/login/ship/ShipTopStatic/msckb1/find', this.hdQuery).then(response => {
        const data = response.data.rows[0];
        this.total = data.anquanDays;
      })
    },
  }
</script>
<style>
  .static-ship-box {
    border-radius: 4px;
    padding: 5px;
    margin: 5px 0;
    height: 20px;
    box-sizing: border-box;
    color: #ffffff;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 100%;
    font-size: 15px;
    text-align: center;
  }

</style>
