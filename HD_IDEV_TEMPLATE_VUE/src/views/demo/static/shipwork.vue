<!-- 作业船舶艘次 -->
<template>
  <div class="boxBg">
    <el-col :span="12">
      <div class="static-ship-font-orange">
        <countTo :startVal='0' :endVal='total' :duration='3000'></countTo>
      </div>
    </el-col>
    <el-col :span="12">
      <el-row>
        <div class="static-ship-box">
          <el-col :span="18" style="text-align: right">{{data[0].name}}：
          </el-col>
          <el-col :span="6">{{data[0].value}}
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="static-ship-box">
          <el-col :span="18" style="text-align: right">{{data[1].name}}：
          </el-col>
          <el-col :span="6">{{data[1].value}}
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="static-ship-box">
          <el-col :span="18" style="text-align: right">{{data[2].name}}：
          </el-col>
          <el-col :span="6">{{data[2].value}}
          </el-col>
        </div>
      </el-row>
      <el-row>
        <div class="static-ship-box">
          <el-col :span="18" style="text-align: right">{{data[3].name}}：
          </el-col>
          <el-col :span="6">{{data[3].value}}
          </el-col>
        </div>
      </el-row>
    </el-col>
  </div>
</template>
<script>
  import countTo from 'vue-count-to';
  export default {
    components: { countTo },
    data() {
      return {
        data: [{name: '液体散货', value: '18'},
          {name: '件杂货', value: '8'},
          {name: '干散货', value: '21'},
          {name: '集装箱', value: '17'}]
      }
    },
    computed: {
      total: function() {
        let count=0;
        for (let key of this.data) {
          count += parseInt(key.value);
        }
        return count;
      }
    }
  }
</script>
