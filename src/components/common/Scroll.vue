<template>
  <div class="scroll-wrapper" ref="scrollWrapper">
    <slot></slot>
  </div>
</template>
<script type="text/ecmascript-6">
export default {
  props: {
    top: {
      type: Number,
      default: 0
    },
    bottom: {
      type: Number,
      default: 0
    },
    ifNoScroll: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    handleScroll(e) {
      const offSetY = e.target.scrollTop || window.pageYOffset || document.body.scrollTop
      this.$emit('onScroll', offSetY)
    },
    scrollTo(x, y) {
      this.$refs.scrollWrapper.scrollTo(x, y)
    },
    refresh() {
      if (this.$refs.scrollWrapper) {
        this.$refs.scrollWrapper.style.height = window.innerHeight - realPx(this.top) - realPx(this.bottom) + 'px'
        this.$refs.scrollWrapper.addEventListener('scroll', this.handleScroll)
      }
    },
    mounted() {
      this.refresh()
    },
  },

 }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import '../../assets/styles/global.scss';
  .scroll-wrapper{          
    position: relative;
    width: 100%;
    z-index: 100;
    overflow-x: hidden;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar{
      display: none;
    }
    &.no-scroll{
      overflow: hidden;
    }
  }
</style>