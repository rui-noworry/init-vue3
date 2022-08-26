import { ElMessage } from 'element-plus'
export let namelimit = function (name, maxLength, str) { // 名称最短验证
  var sign = true
  var newName = ''
  // var lang = store.getters.locale
  if (name) {
    // var minLength = length
    var temp = ''
    var icount = 0
    var patrn = /[^x00-xff]/   // 汉字正则dsaa

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
          //if (lang === 'en') {
            //ElMessage({message: str + ' can only be ' + maxLength + ' characters!', type: 'error'})
          //} else {
          ElMessage({message: str + '最长' + maxLength + '个字符或' + maxLength / 2 + '个汉字!', type: 'error'})
          //}
          sign = false
        }
      }
      if (maxLength === 128 || maxLength === 256) {
        newName = sign
      }
      return newName
  }
}

export const dateToMsel = function (m) { // 转毫秒值
  let currDate;
  if (typeof m === undefined) return
  if (m instanceof Object) {
    currDate = new Date(m)
  } else {
    currDate = new Date(m.replace('-', '/').replace('-', '/'))
  }
  return currDate.getTime()
}

export const mselToDate = function (m, type) { // 转时间
  // const msel = new Date(parseInt(m))
  let currDate;
  if (m instanceof Object) {
    currDate = new Date(m)
  } else if (m instanceof String) {
    currDate = new Date(m.replace('-', '/').replace('-', '/'))
  } else {
    currDate = new Date(m)
  }
  const year = currDate.getFullYear()
  const month = currDate.getMonth() + 1 > 9 ? currDate.getMonth() + 1 : '0' + (currDate.getMonth()+1)
  const monthDate = currDate.getMonth()
  const day = currDate.getDate() > 9 ? currDate.getDate() : '0' + currDate.getDate()
  const hour = currDate.getHours()
  const minute = currDate.getMinutes()
  const second = currDate.getSeconds()
  switch (type) {
    case 'yyyy-mm-dd':
      return year + '-' + month + '-' + day
    case 'yyyy-mm-dd h:m:s':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    case 'yyyy-mm-dd h:m':
      return year + '-' + month + '-' + day + ' ' + hour + ':' + minute
    case 'h:m:s':
      return hour + ':' + minute + ':' + second
    case 'date':
      return new Date(year, monthDate, day)
    case 'dateTime':
      return new Date(year, monthDate, day, hour, minute)
    default:
      return year + '-' + month + '-' + day
  }
}


export const getBeforTime = function (min, max, n) {
  var minMsel = dateToMsel(min)
  var maxMsel = dateToMsel(max)
  var nMsel = minMsel + n * 24 * 60 * 60 * 1000
  if (nMsel > maxMsel) {
    return maxMsel
  } else {
    return nMsel
  }
}
export const getDayAfter = function (min, dayNum, curTime) { //min 后dayNum天的日期时间
  var minMsel = dateToMsel(min)
  var curMsel = dateToMsel(curTime)
  var msel = minMsel + 60 * 60 * 24 * 1000 * dayNum
  var maxDay = ''
  if (msel > curMsel) {
      maxDay = mselToDate(curMsel, 'yyyy-mm-dd h:m:s')
  } else {
      maxDay = mselToDate(msel, 'yyyy-mm-dd h:m:s')
  }
  return maxDay
}
export const getDayBefore = function (max, dayNum, curTime) { //max 前dayNum天的日期时间
  var maxMsel = dateToMsel(max)
  var curMsel = dateToMsel(curTime)
  var msel = maxMsel - 60 * 60 * 24 * 1000 * dayNum
  var minDay = ''
  if (msel < curMsel) {
      minDay = mselToDate(curMsel, 'yyyy-mm-dd h:m:s')
  } else {
      minDay = mselToDate(msel, 'yyyy-mm-dd h:m:s')
  }
  return minDay
}


export const getDateBefore = function (date, num, type) {
    let nowMillisecond = dateToMsel(date)
    let msel = nowMillisecond - 60*60*24*1000*num
    if (type) { // 有类型，传相应类型
        return mselToDate(msel, type)
    } else { // 无类型，传毫秒值
        return msel
    }
}

export const getDateAfter = function (date, num, type) {
    let nowMillisecond = dateToMsel(date)
    let msel = nowMillisecond + 60*60*24*1000*num
    if (type) { // 有类型，传相应类型
        return mselToDate(msel, type)
    } else { // 无类型，传毫秒值
        return msel
    }
}
