<template>
  <el-select v-model="selVal"  clearable  multiple :placeholder="placeholder?placeholder:'请选择'" style="width:100%" v-bind="$attrs" v-on="$listeners">
    <el-option v-for="item in options" :key="item.code" :label="item.name+'('+item.code+')'" :value="item.code">
    </el-option>
  </el-select>
</template>

<script>
  export default {
    name: 'HdDropmulsel',
    data() {
      return {
        myts: 'name',
        options: []
      }
    },
    props: ['value', 'field', 'placeholder', 'name', 'txtVal'],// 设置value为props属性-必须,name.sync双向
    mounted() {
      this.doQuery()
    },
    methods: {
      doQuery() {
        let url = '/webresources/login/privilege/SysCode/findAll?fieldCod=' + this.field
        this.$http.get(url).then(response => {
          this.options = response.data
        })
      }
    },
    computed: {//给外层v-model赋值
      selVal: {
        // 动态计算selVal的值
        get: function () {
          console.log("get:"+this.value);
          if(this.value){
            return this.value;
          }

        },
        set: function (val) {//v-model input
          console.log("set:"+val);
          if(val){
            this.$emit('input', val);
            if(val.length==0){
              this.$emit('onSelItem', {})
              return ;
            }
            let returnCode =[];
            let returnName ="";
            for(let i=0;i < this.options.length; i++){
              for(let j=0;j < val.length; j++){
                if(this.options[i].code == val[j]){
                  returnCode.push(this.options[i].code);
                  returnName+=","+this.options[i].name;
                }
              }
            }
            this.$emit('onSelItem', {returnCode: returnCode,returnName:returnName.substr(1)})
          }

        }
      }
    }
  }
</script>
