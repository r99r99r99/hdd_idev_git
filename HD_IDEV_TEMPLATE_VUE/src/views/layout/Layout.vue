<template>

  <HdLayout @chgTheme="chgTheme">
    <HdMessage allProto="wss://gctos6.huadong.net/ws"></HdMessage>
  </HdLayout>


</template>

<script>
  import HdLayout from 'idevvuejs/HdLayout'
  export default {
    name: 'layout',
    components: {HdLayout},
    computed: {},
    watch: {},
    methods: {
      chgTheme(style) {
        console.info(style)
        if (style == 'metro-green') {
          import('src/styles/metro-green/hdMain.scss')
        } else if (style == 'metro-orange') {
          import('src/styles/metro-orange/hdMain.scss')
        } else if (style == 'metro-mauves') {
          import('src/styles/metro-mauves/hdMain.scss')
        } else {
          import('src/styles/metro-blue/hdMain.scss')
        }
      }
    }
  }
</script>


<style rel="stylesheet/scss" lang="scss">
  @import "src/styles/mixin.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
  }

</style>
