import Storage from 'web-storage-cache'

const localStorage = new Storage()
// 存储
export function setLocalStorage(key, value) {
  return localStorage.set(key, value)
}
// 获取
export function getLocalStorage(key) {
  return localStorage.get(key)
}
// 移除
export function removeLocalStorage(key) {
  return localStorage.delete(key)
}
// 清空
export function clearLocalStorage(key) {
  return localStorage.clear(key)
}
// 设置一个book对象建立localStorage空间
export function setBookObject(fileName, key, value) {
  let book = getLocalStorage(`${fileName}-info`)
  if (!book) {
    book = {}
  }
  book[key] = value
  setLocalStorage(`${fileName}-info`, book)
}
// 获取book对象中的key，value
export function getBookObject(fileName, key) {
  let book = getLocalStorage(`${fileName}-info`)
  if (book) {
    return book[key]
  } else {
    return null
  }
}
// 保存字体
export function saveFontFamily(fileName, font) {
  return setBookObject(fileName, 'fontFamily', font)
}
// 获取字体
export function getFontFamily(fileName) {
  return getBookObject(fileName, 'fontFamily')
}
// 保存字号
export function saveFontSize(fileName, fontSize) {
  return setBookObject(fileName, 'fontSize', fontSize)
}
// 获取字号
export function getFontSize(fileName) {
  return getBookObject(fileName, 'fontSize')
}
// 保存主题
export function saveTheme(fileName, theme) {
  return setBookObject(fileName, 'theme', theme)
}
// 获取主题
export function getTheme(fileName) {
  return getBookObject(fileName, 'theme')
}
// 全局存储locale
export function saveLocale(locale) {
  return setLocalStorage('locale', locale)
}
// 全局获取locale
export function getLocale() {
  return getLocalStorage('locale')
}
// 获取进度
export function getLocation(fileName) {
  return getBookObject(fileName, 'location')
}
// 保存进度
export function saveLocation(fileName, location) {
  setBookObject(fileName, 'location', location)
}
// 获取阅读时间
export function getReadTime(fileName) {
  return getBookObject(fileName, 'time')
}
// 保存saveReadTime
export function saveReadTime(fileName, theme) {
  setBookObject(fileName, 'time', theme)
}
