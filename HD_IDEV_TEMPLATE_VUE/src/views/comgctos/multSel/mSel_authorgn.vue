<template >
  <el-select  v-model="selVal" clearable  multiple :placeholder="placeholder?placeholder:'请选择'"   v-bind="$attrs" v-on="$listeners" >
    <el-option v-for="item in option"
      :key="item.orgnId"
      :label="item.shortNam"
      :value="item.orgnId">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    data() {
      return {
        option: [],
        hdQuery: new HdQuery(this)
      }
    },
    //props: ['impValue','placeholder'],// 设置value为props属性-必须
    props: ['value', 'field', 'placeholder', 'name'],// 设置value为props属性-必须,name.sync双向
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
/*      10	经营组织
        20	区域集团
        0	港口集团
        1	码头公司
        2	科室
        41	劳务班组
        42	理货班组
        43	调度班组
        44	劳机班组
        30	码头劳务队
        31	外部劳务队
        32	码头机械队
        33	劳务机械队
        40	司机班组*/
        this.hdQuery.query.orgnTyp='1';
        this.$http.post('/webresources/login/code/AuthOrgnExt/find',this.hdQuery).then(response => {
          const data = response.data
          this.option = data.rows
        })
      }
    },
    computed: {//给外层v-model赋值
      selVal: {
        // 动态计算selVal的值
        get: function () {
          if (this.value)
            return this.value;
        },
        set: function (val) {//v-model input
          if(val)
            this.$emit('update:value', val);
        }
      }
    }

  }
</script>
