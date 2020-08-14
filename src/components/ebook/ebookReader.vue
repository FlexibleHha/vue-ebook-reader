<template>
  <div>
    <div class="ebook-reader">
      <div id="read"></div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { ebookMixin } from "../../utils/mixin";
import Epub from "epubjs";
import { flatten } from "../../utils/book";
import {
  getFontFamily,
  saveFontFamily,
  saveFontSize,
  getFontSize,
  getTheme,
  saveTheme,
  getLocation,
} from "../../utils/localStorage";
global.epub = Epub;
export default {
  mixins: [ebookMixin],
  methods: {
    ...mapActions(["setmenuVisible"]),
    // 上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev();
        this.hideTitleAndMenu();
      }
    },
    // 下一页
    nexPage() {
      if (this.rendition) {
        this.rendition.next();
        this.hideTitleAndMenu();
      }
    },
    // 显示隐藏menu
    toggleTitleAndMenu() {
      if (this.menuVisible) {
        this.setSettingVisible(-1);
      }
      this.setmenuVisible(!this.menuVisible);
      this.setFontFamilyVisible(false);
    },
    // 初始化Theme
    initTheme() {
      let defaultTheme = getTheme(this.fileName);
      if (!defaultTheme) {
        defaultTheme = this.themeList[0].name;
        saveTheme(this.fileName, defaultTheme);
      }
      this.setDefaultTheme(defaultTheme);
      this.themeList.forEach((theme) => {
        this.rendition.themes.register(theme.name, theme.style);
      });
      this.rendition.themes.select(defaultTheme);
    },
    // 初始化fontFamily
    initFontFamily() {
      let font = getFontFamily(this.fileName);
      if (!font) {
        saveFontFamily(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.font(font);
        this.setDefaultFontFamily(font);
      }
    },
    // 初始化fontSize
    initFontSize() {
      let fontSize = getFontSize(this.fileName);
      if (!fontSize) {
        saveFontSize(this.fileName, this.defaultFontFamily);
      } else {
        this.rendition.themes.fontSize(fontSize + "px");
        this.setDefaultFontSize(fontSize);
      }
    },
    initRendition() {
      // 生成rendition对象
      this.rendition = this.book.renderTo("read", {
        width: innerWidth,
        height: innerHeight,
      });
      const location = getLocation(this.fileName);
      // 通过rendition.display()渲染电子书
      this.display(location, () => {
        this.initFontFamily();
        this.initFontSize();
        this.initTheme();
        this.initGlobalStyle(); // 初始化全局样式
        this.refreshLocation(); // 刷新location保存进度
      });
      this.rendition.hooks.content.register((contents) => {
        Promise.all([
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resourse/fonts/daysOne.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resourse/fonts/cabin.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resourse/fonts/montserrat.css`
          ),
          contents.addStylesheet(
            `${process.env.VUE_APP_RES_URL}/resourse/fonts/tangerine.css`
          ),
        ]).then(() => {
          console.log("字体全部加载完");
        });
      });
    },
    initGesture() {
      this.rendition.on("touchstart", (event) => {
        this.touchstartX = event.changedTouches[0].clientX;
        this.touchStartTime = event.timeStamp;
      });
      this.rendition.on("touchend", (event) => {
        const offsetX = event.changedTouches[0].clientX - this.touchstartX;
        const time = event.timeStamp - this.touchStartTime;
        if (time < 500 && offsetX > 40) {
          this.prevPage();
        } else if (time < 500 && offsetX < -40) {
          this.nexPage();
        } else {
          this.toggleTitleAndMenu();
        }
        event.stopPropagation(); // 阻止事件向上传递
      });
    },
    // 解析电子书
    parseBook() {
      // 封面
      this.book.loaded.cover.then((cover) => {
        this.book.archive.createUrl(cover).then((url) => {
          this.setCover(url);
        });
      });
      // 作者信息和书籍信息
      this.book.loaded.metadata.then((metadata) => {
        this.setMetadata(metadata);
      });
      // 目录信息
      this.book.loaded.navigation.then((nav) => {
        // 树状结构扁平化（难点，重点）
        let navItem = flatten(nav.toc);
        function find(item, v = 0) {
          const parent = navItem.filter((it) => it.id === item.parent)[0];
          return !item.parent ? v : parent ? find(parent, ++v) : v;
        }
        navItem.forEach((item) => {
          item.leval = find(item);
        });
        // this.setNavigation(navItem);
      });
    },
    // 初始化epub
    initEpub() {
      const url =
        process.env.VUE_APP_RES_URL +
        "/resourse/epub/" +
        this.fileName +
        ".epub";
      console.log("url:", url);
      // 生成book对象
      this.book = new Epub(url);
      this.setCurrentBook(this.book);
      this.initRendition();
      this.initGesture();
      this.parseBook();
      // 分页算法
      this.book.ready.then(() => {
        return this.book.locations
          .generate(
            750 * (window.innerWidth / 375) * getFontSize(this.fileName / 16)
          )
          .then((locations) => {
            this.refreshLocation();
            this.setBookAvailable(true);
          });
      });
    },
  },
  mounted() {
    this.setFileName(this.$route.params.fileName.split("|").join("/")).then(
      () => {
        this.initEpub();
      }
    );
  },
};
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
</style>
