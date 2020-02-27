<template>
  <div class="scroll-container" ref="scrollContainer" @mousewheel="handleScroll" @DOMMouseScroll="handleFoxScroll">
    <div class="scroll-wrapper" ref="scrollWrapper" :style="{left: left + 'px'}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'scrollPane',
    data() {
      return {
        left: 0,
        tmpWrapperWidth: 0
      }
    },
    updated: function () {
      if (this.tmpWrapperWidth != this.$refs.scrollWrapper.offsetWidth) {
        this.tmpWrapperWidth = this.$refs.scrollWrapper.offsetWidth;
        if (this.$refs.scrollContainer.offsetWidth - this.$refs.scrollWrapper.offsetWidth < 100) {
          this.left = this.$refs.scrollContainer.offsetWidth - this.$refs.scrollWrapper.offsetWidth - 100;
        }
      }
    },
    methods: {
      handleScroll(e) {
        e.preventDefault()
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperWidth = $wrapper.offsetWidth
        if (e.wheelDelta > 0) {
          this.left = Math.min(0, this.left + e.wheelDelta)
        } else {
          if ($containerWidth - 100 < $wrapperWidth) {
            if (this.left < -($wrapperWidth - $containerWidth + 100)) {
              this.left = this.left
            } else {
              this.left = Math.max(this.left + e.wheelDelta, $containerWidth - $wrapperWidth - 100)
            }
          } else {
            this.left = 0
          }
        }
      },
      handleFoxScroll(e) {
        e.preventDefault()
        const $container = this.$refs.scrollContainer
        const $containerWidth = $container.offsetWidth
        const $wrapper = this.$refs.scrollWrapper
        const $wrapperWidth = $wrapper.offsetWidth
        let pos = e.detail * (-10);
        if (pos > 0) {
          this.left = Math.min(0, this.left + pos)
        } else {
          if ($containerWidth - 100 < $wrapperWidth) {
            if (this.left < -($wrapperWidth - $containerWidth + 100)) {
              this.left = this.left
            } else {
              this.left = Math.max(this.left + pos, $containerWidth - $wrapperWidth - 100)
            }
          } else {
            this.left = 0
          }
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .scroll-container {
    white-space: nowrap;
    position: relative;
    overflow: hidden;
    .scroll-wrapper {
      position: absolute;
    }
  }
</style>
