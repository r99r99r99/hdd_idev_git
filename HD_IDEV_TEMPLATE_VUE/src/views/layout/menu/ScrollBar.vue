<template>
  <div @DOMMouseScroll="handleFoxScroll" @mousewheel="handleScroll" class="scroll-container" ref="scrollContainer">
    <div :style="{top: top + 'px'}" class="scroll-wrapper" ref="scrollWrapper">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  const delta = 15
  export default {
    name: 'scrollBar',
    data() {
      return {
        top: 0
      }
    },
    methods: {
      handleScroll(e) {
        e.preventDefault()
        const $container = this.$refs.scrollContainer
        const $containerHeight = $container.offsetHeight
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperHeight = $wrapper.offsetHeight

        if (e.wheelDelta > 0) {
          this.top = Math.min(0, this.top + e.wheelDelta)
        } else {
          if ($containerHeight - delta < $wrapperHeight) {
            if (this.top < -($wrapperHeight - $containerHeight + delta)) {
              this.top = this.top
            } else if ($wrapperHeight - $containerHeight < ($containerHeight / 2)) {
              this.top = Math.max(this.top + e.wheelDelta, $containerHeight - $wrapperHeight - delta)
            }
          } else {
            this.top = 0
          }
        }
      },
      handleFoxScroll(e) {
        e.preventDefault()
        const $container = this.$refs.scrollContainer
        const $containerHeight = $container.offsetHeight
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperHeight = $wrapper.offsetHeight
        let pos = e.detail * (-10);
        if (pos > 0) {
          this.top = Math.min(0, this.top + pos)
        } else {
          if ($containerHeight - delta < $wrapperHeight) {
            if (this.top < -($wrapperHeight - $containerHeight + delta)) {
              this.top = this.top
            } else {
              this.top = Math.max(this.top + pos, $containerHeight - $wrapperHeight - delta)
            }
          } else {
            this.top = 0
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-container {
    position: relative;
    width: 100%;
    height: auto;
    /*  background-color: $menuBg;*/
    .scroll-wrapper {
      position: absolute;
      width: 100% !important;
    }
  }
</style>
