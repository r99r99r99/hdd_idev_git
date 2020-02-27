<template>
 <div class="filter-item">
    <el-button type="text"  :class="a"  @click="doclick('2')" :style="styleA"  checked="true">全部</el-button>
    <el-button type="text"  :class="b"  @click="doclick('0')" :style="styleB">正常</el-button>
    <el-button type="text"  :class="c"  @click="doclick('1')" :style="styleC" >作废</el-button>
  </div>
</template>

<script>

  export default {
    props: {ifend: String},
    data() {
      return {
        styleA:'color: orange;padding: 0px;',
        styleB:'color: #000;padding: 0px;',
        styleC:'color: red;padding: 0px;',
        a:'el-icon-star-off',
        b:'el-icon-star-off',
        c:'el-icon-star-off'
      }
    },
    methods: {
      doclick(flag){
        if(flag=='2'){
          this.styleA='color: orange;padding: 0px;background: #E0E0E0;'
          this.styleB='color: #000;padding: 0px;'
          this.styleC='color: red;padding: 0px;'
          this.a='el-icon-star-on'
          this.b='el-icon-star-off'
          this.c='el-icon-star-off'
        }else if(flag=='0'){
          this.styleA='color: orange;padding: 0px;'
          this.styleB='color: #000;padding: 0px;background: #E0E0E0;'
          this.styleC='color: red;padding: 0px;'
          this.a='el-icon-star-off'
          this.b='el-icon-star-on'
          this.c='el-icon-star-off'
        }else{
          this.styleA='color: orange;padding: 0px;'
          this.styleB='color: #000;padding: 0px;'
          this.styleC='color: red;padding: 0px;background: #E0E0E0;'
          this.a='el-icon-star-off'
          this.b='el-icon-star-off'
          this.c='el-icon-star-on'
        }
          this.$emit('update:ifend',flag)
          this.$emit('ifendFlag');
      }
    }

  }
</script>

