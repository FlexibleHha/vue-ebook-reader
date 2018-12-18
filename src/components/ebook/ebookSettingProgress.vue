<template>
  <transition name="slide-up">
    <div class="setting-wrapper" v-show="menuVisible && settingVisible === 2">
      <div class="setting-progress">
        <div class="read-time-wrapper">
          <span class="read-time-text">{{getReadTimeText()}}</span>
          <span class="icon-forward"></span>
        </div>
        <div class="progress-wrapper">
          <div class="progress-icon-wrapper">
            <span class="icon-back" @click="prevSection()"></span>
          </div>
          <input type="range" class="progress"
          min="0"
          max="100"
          step="1"
          :value="progress"
          :disabled="!bookAvailable"
          @change="onProgressChange($event.target.value)"
          @input="onProgressInput($event.target.value)"
          ref="progress" />
          <div class="progress-icon-wrapper">
            <span class="icon-forward" @click="nextSection()"></span>
          </div>
        </div>
        <div class="text-wrapper">
          <span class="progress-section-text">{{getSectionName}}</span>
          <span>{{bookAvailable ? progress + '%' : '加载中...'}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script type="text/ecmascript-6">
import { ebookMixin } from "../../utils/mixin"
import { getReadTimeText } from "../../utils/book"
export default {
  mixins: [ebookMixin],
  computed: {
    getSectionName() {
      if (this.section) {
        const sectionInfo = this.currentBook.section(this.section)
        if (sectionInfo && sectionInfo.href && this.currentBook && this.currentBook.navigation) {
          return this.currentBook.navigation.get(sectionInfo.href).label
        }
      }
    }
  },
  methods: {
    // 下一章
    nextSection() {
      if (this.section < this.currentBook.spine.length - 1 && this.bookAvailable) {
        this.setSection(this.section + 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 上一章
    prevSection() {
      if (this.section > 0 && this.bookAvailable) {
        this.setSection(this.section - 1).then(() => {
          this.displaySection()
        })
      }
    },
    // 显示第几章
    displaySection() {
      const sectionInfo = this.currentBook.section(this.section)
      if (sectionInfo && sectionInfo.href) {
        this.display(sectionInfo.href)
      }
    },
    // 进度条改变
    onProgressChange(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
      })
      this.updateProgressBg()
    },
    // 根据进度条显示内容
    displayProgress() {
      const cfi = this.currentBook.locations.cfiFromPercentage(this.progress / 100)
      this.display(cfi)
    },
    // 更改进度条的颜色
    updateProgressBg() {
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 进度条在拖动过程中的变化
    onProgressInput(progress) {
      this.setProgress(progress).then(() => {
        this.displayProgress()
        this.updateProgressBg()
      })
    }
  },
  // 钩子函数
  updated() {
    this.updateProgressBg()
  }
 }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/styles/global";
  .setting-wrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    z-index: 190;
    width: 100%;
    height: px2rem(90);
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
    .setting-progress {
      position: relative;
      width: 100%;
      height: 100%;
      .read-time-wrapper {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: px2rem(40);
        @include center;
        font-size: px2rem(12);
      }
      .progress-wrapper {
        width: 100%;
        height: 100%;
        @include center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        .progress {
          flex: 1;
          width: 100%;
          -webkit-appearance: none;
          height: px2rem(2);
          background: -webkit-linear-gradient(#5d6268, #5d6268) no-repeat, #b4b5b7;
          margin: 0 px2rem(10);
          &:focus {
            outline: none;
          }
          &::-webkit-slider-thumb {
            -webkit-appearance: none;
            height: px2rem(20);
            width: px2rem(20);
            border-radius: 50%;
            background: #ceced0;
            box-shadow: 0 px2rem(4) px2rem(6) 0 rgba(0, 0, 0, .15);
            border: none;
          }
        }
        .progress-icon-wrapper {
          flex: 0 0 px2rem(22);
          font-size: px2rem(22);
          @include center;
        }
      }
      .text-wrapper {
        position: absolute;
        left: 0;
        bottom: px2rem(5);
        width: 100%;
        font-size: px2rem(12);
        text-align: center;
        padding: 0 px2rem(15);
        box-sizing: border-box;
        @include center;
        .progress-section-text {
          line-height: px2rem(15);
          @include ellipsis;
        }
      }
    }
  }
</style>