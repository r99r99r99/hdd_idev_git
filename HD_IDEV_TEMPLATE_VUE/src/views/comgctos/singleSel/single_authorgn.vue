<template >
  <el-select  v-model="selVal" clearable  :placeholder="placeholder?placeholder:'请选择'"   v-bind="$attrs" v-on="$listeners" >
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
        hdQuery: { query:{}},
        multiple:true
      }
    },
    props: {value: String, placeholder: String},// 设置value为props属性-必须
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
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
          if (this.value) return this.value;
        },
        set: function (val) {//v-model input
          if(val){
            this.$emit('input',val);
            for (let i = 0; i < this.option.length; i++) {
              if (this.option[i].orgnId == val) {
                let obj = this.option[i]
                this.$emit('update:txtVal', obj.shortNam)
              }
            }
          }
        }
      }
    }

  }
</script>
