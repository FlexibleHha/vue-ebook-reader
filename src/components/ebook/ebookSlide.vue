<template>
  <transition name="fade">
    <div class="slide-content-wrapper" v-show="menuVisible && settingVisible === 3">
      <!-- 目录表 -->
      <transition name="slide-right">
        <div class="content" v-if="settingVisible === 3">
          <div class="content-page-wrapper">
            <div class="content-page">
              <component :is="currentTab === 1 ? content : bookMark"></component>
            </div>
            <div class="content-page-tab">
              <div class="content-page-tab-item" :class="{'selected':currentTab === 1}" @click="selectTab(1)">{{$t('book.navigation')}}</div>
              <div class="content-page-tab-item" :class="{'selected':currentTab === 2}" @click="selectTab(2)">{{$t('book.bookmark')}}</div>
            </div>
          </div>
        </div>
      </transition>
      <!-- 遮罩 -->
      <div class="content-bg" @click="hideTitleAndMenu()"></div>
    </div>
  </transition>
</template>

<script type="text/ecmascript-6">
  import { ebookMixin } from '../../utils/mixin'
  import EbookSlideContents from './ebookSlideContents'
  export default {
    mixins: [ebookMixin],
    data() {
      return {
        currentTab: 1,
        content: EbookSlideContents,
        bookMark: null
      }
    },
    methods: {
     selectTab(tab) {
       this.currentTab = tab
     }
    },
    components: {
      EbookSlideContents
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss">
  @import "../../assets/styles/global";
  .slide-content-wrapper{
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    display: flex;
    width: 100%;
    height: 100%;
    z-index: 300;
    .content{
      flex: 0 0 85%;
      width: 85%;
      height: 100%;
      .content-page-wrapper{
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 100%;
        .content-page{
          flex: 1;
          width: 100%;
          overflow: hidden;
        }
        .content-page-tab{
          display: flex;
          flex: 0 0 px2rem(48);
          width: 100%;
          height: px2rem(48);
          .content-page-tab-item{
            flex: 1;
            font-size: px2rem(12);
            @include center;
          }
        }
      }
    }
    .content-bg{
      flex: 0 0 15%;
      width: 15%;
      height: 100%;

    }
  }
</style>