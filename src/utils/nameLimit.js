import {Message} from 'element-ui'
// import store from '@/store'
const vueNameLimit = {}

// var lang = store.getters.locale
vueNameLimit.install = (Vue, options) => {
  Vue.prototype.namelimit = function (name, length, str) {
    var newName = ''
    var sign = true
    if (name) {
      var maxLength = length
      var temp = ''
      var icount = 0
      var patrn = /[^\x00-\xff]/   // 汉字正则dsaa

      for (var i = 0; i < name.length; i++) {
        temp = name.substr(i, 1)
        if (patrn.exec(temp) == null) {    // 不是汉字
          icount = icount + 1
        } else {    // 是汉字
          icount = icount + 2
        }
        if (icount <= maxLength) {
          newName += temp
          sign = true
        } else {
            Message({message: str + '最长' + maxLength + '个字符或' + maxLength / 2 + '个汉字!', type: 'error'})
            sign = false
        }
      }
      if (maxLength === 128 || maxLength === 256) {
        newName = sign
      }
      return newName
    }
  }
}
export default vueNameLimit
