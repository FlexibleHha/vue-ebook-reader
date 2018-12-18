<template>
  <div class="ebook">
		<ebook-title></ebook-title>
    <ebook-reader></ebook-reader>
		<ebook-menu></ebook-menu>
  </div>
</template>

<script>
import EbookReader from '../../components/ebook/ebookReader'
import EbookTitle from '../../components/ebook/ebookTitle'
import EbookMenu from '../../components/ebook/ebookMenu'
import { get } from 'http';
import { getReadTime, saveReadTime } from '../../utils/localStorage';
import { setInterval, clearInterval } from 'timers';
import { ebookMixin } from '../../utils/mixin';
export default {
  mixins: [ebookMixin],
  methods: {
    startLoopReadTime() {
      let readTime = getReadTime(this.fileName)
      if (!readTime) {
        readTime = 0
      }
      this.task = setInterval(() => {
        readTime++
        if (readTime % 30 === 0) {
          saveReadTime(this.fileName, readTime)
        }
      }, 1000)
    }
  },
  mounted() {
    this.startLoopReadTime()
  },
  beforeDestroy() {
    clearInterval(this.task)
  },
  components: {
    EbookReader,
		EbookTitle,
		EbookMenu
  }
 }
</script>

<style lang="scss" rel="stylesheet/scss">
</style>
