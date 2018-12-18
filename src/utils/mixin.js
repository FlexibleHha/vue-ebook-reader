import { mapGetters, mapActions } from 'vuex'
import { themeList, addCss, removeAllCss, getReadTimeByMinute } from "./book"
import { saveLocation } from "./localStorage";
export const ebookMixin = {
	computed: {
		...mapGetters([
			'fileName',
			'menuVisible',
			'settingVisible',
			'defaultFontSize',
			'currentBook',
			'defaultFontFamily',
			'fontFamilyVisible',
			'defaultTheme',
			'progress',
			'bookAvailable',
			'section',
			'cover',
			'metadata',
		]),
		themeList() {
			return themeList(this)
			
    }
	},
	methods: {
		...mapActions([
			'setmenuVisible',
			'setFileName',
			'setSettingVisible',
			'setDefaultFontSize',
			'setCurrentBook',
			'setDefaultFontFamily',
			'setFontFamilyVisible',
			'setDefaultTheme',
			'setProgress',
			'setBookAvailable',
			'setSection',
			'setCover',
			'setMetadata',
		]),
		// 隐藏menu
		hideTitleAndMenu() {
			this.setmenuVisible()
			this.setSettingVisible(-1)
			this.setFontFamilyVisible(false)
		},
		// 阅读时间文本
    getReadTimeText() {
      return this.$t('book.haveRead').replace('$1', getReadTimeByMinute(this.fileName))
    },
		// 初始化css
		initGlobalStyle() {
			removeAllCss() // 初始化之前移除所有的css
			switch (this.defaultTheme) {
				case 'Default':
					addCss(`${process.env.VUE_APP_RES_URL}/resourse/theme/theme_default.css`)
					break;
				case 'Eye':
					addCss(`${process.env.VUE_APP_RES_URL}/resourse/theme/theme_eye.css`)
					break;
				case 'Gold':
					addCss(`${process.env.VUE_APP_RES_URL}/resourse/theme/theme_gold.css`)
					break;
				case 'Night':
					addCss(`${process.env.VUE_APP_RES_URL}/resourse/theme/theme_night.css`)
					break;
				default:
					addCss(`${process.env.VUE_APP_RES_URL}/resourse/theme/theme_default.css`)
					break;
			}
		},
		// 刷新进度
    refreshLocation() {
      const currentLocation = this.currentBook.rendition.currentLocation()
			const startCfi = currentLocation.start.cfi
      const progress = this.currentBook.locations.percentageFromCfi(startCfi)
			this.setProgress(Math.floor(progress * 100))
			this.setSection(currentLocation.start.index)
      saveLocation(this.fileName, startCfi)
		},
		// 对rendition对象的封装
		display(target, cb) {
			if (target) {
					this.currentBook.rendition.display(target).then(() => {
						this.refreshLocation()
						if (cb) cb()
					})
			} else {
				this.rendition.display().then(() => {
					this.refreshLocation()
					if (cb) cb()
				})
			}
		},
	}
}