<template>
  <div class="menu-bar" >
    <transition name="slide-up">
    	<div class="menu-wrapper" v-show="menuVisible" :class="{'hide-box-shadow' : !menuVisible || settingVisible >= 0}">
			  <div class="icon-wrapper">
					<span class="icon-menu" @click="showSetting(3)"></span>
			  </div>
			  <div class="icon-wrapper">
					<span class="icon-progress" @click="showSetting(2)"></span>
			  </div>
			  <div class="icon-wrapper">
					<span class="icon-bright" @click="showSetting(1)"></span>
			  </div>
			  <div class="icon-wrapper">
					<span class="icon-a" @click="showSetting(0)">A</span>
			  </div>
			</div>
    </transition>
		<ebook-setting-font></ebook-setting-font>
		<ebook-setting-font-popup></ebook-setting-font-popup>
    <ebook-setting-theme></ebook-setting-theme>
    <ebook-setting-progress></ebook-setting-progress>
    <ebook-slide></ebook-slide>
  </div>
</template>

<script>
import EbookSettingFont from './ebookSettingFont'
import EbookSettingFontPopup from './ebookSettingFontPopup.vue'
import EbookSettingTheme from './ebookSettingTheme'
import EbookSettingProgress from './ebookSettingProgress'
import EbookSlide from './ebookSlide'
import { ebookMixin } from '../../utils/mixin'
export default {
  mixins: [ebookMixin],
  methods: {
	// 显示设置面板
    showSetting(key) {
		this.setSettingVisible(key)
    }
  },
  components: {
    EbookSettingFont,
    EbookSettingFontPopup,
    EbookSettingTheme,
    EbookSettingProgress,
    EbookSlide,
  }
 }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../assets/styles/global.scss';
  .menu-bar{
    .menu-wrapper{
      position: absolute;
      left: 0;
      bottom: 0;
      z-index: 102;
      display: flex;
      width: 100%;
      height: px2rem(48);
      background: #ffffff;
      box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, .15);
	  font-size: px2rem(20);
      &.hide-box-shadow{
        box-shadow: none;
      }
      .icon-wrapper{
        flex: 1;
      @include center;
        .icon-progress {
          font-size: px2rem(28);
        }
        .icon-bright {
          font-size: px2rem(24);
        }
      }
    }
    .content-mask{
      position: absolute;
      top: 0;
      left: 0;
      z-index: 105;
      display: flex;
      width: 100%;
      height: 100%;
      background: rgba(51, 51, 51, .8);
    }
  }
</style>