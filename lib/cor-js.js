var isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false
var COR_JS = {
  // 判断设置是否是iphone
  isIos () {
    if (isPhone) {
      return true
    } else {
      return false
    }
  },
  // 判断设置是否是android
  isAndroid () {
    if (isAndroid) {
      return true
    } else {
      return false
    }
  },
  // 设置本地存储的值
  setLocVal (key, val) {
    if (window.localStorage) {
      return window.localStorage.setItem(key, val)
    } else {
      console.log("浏览器不支持localStorage")
    }
  },
  // 获取本地存储的值
  getLocVal (key){
    return window.localStorage.getItem(key)
  },
  //清除本地存储的值
  removeLocVal (key){
    if (window.localStorage) {
      window.localStorage.removeItem(key)
    } else {
      console.log("浏览器不支持localStorage")
    }
  },
  // 获取本地存储的所有键
  getLocValKey (){
    if (window.localStorage) {
      var locArry = [];
      console.log(localStorage.length);
      for (var i = 0; i < window.localStorage.length; i++) {
        locArry.push(window.localStorage.key(i))
      }
      return locArry
    } else {
      console.log("浏览器不支持localStorage")
    }
  },
  // 清除所有存储值
  clearLocVal (){
    if (window.localStorage) {
      window.localStorage.clear()
    } else {
      console.log("浏览器不支持localStorage")
    }
  },
  /*
   * 获取当前时间 0为日期时间 1为日期 2为时间
   */
  getDateTime (type) {
    var time
    switch (type) {
      case 0:
        time = this.format('yyyy-MM-dd hh:mm:ss')
        break
      case 1:
        time = this.format('yyyy-MM-dd')
        break
      case 2:
        time = this.format('hh:mm:ss')
        break
      default:
        ''
        break
    }
    return time
  },
  format (format) {
    var o = {
      'M+': new Date().getMonth() + 1, // month
      'd+': new Date().getDate(), // day
      'h+': new Date().getHours(), // hour
      'm+': new Date().getMinutes(), // minute
      's+': new Date().getSeconds(), // second
      'q+': Math.floor((new Date().getMonth() + 3) / 3), // quarter
      'S': new Date().getMilliseconds() // millisecond
    }
    if (/(y+)/.test(format)) {
      format = format.replace(RegExp.$1, (new Date().getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
        format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
      }
    }
    return format
  },
  /*
   * 获取两个日期的天数差
   */
  getDateNum (strDateStart, strDateEnd) {
    var strSeparator = '-' //日期分隔符
    var oDate1
    var oDate2
    var iDays
    oDate1 = strDateStart.split(strSeparator)
    oDate2 = strDateEnd.split(strSeparator)
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
    var dNum = iDays == 0 ? '1' : iDays
    return parseInt(dNum)
  },
  /*
   * 是否为手机号
   */
  isTelPhone (mobile) {
    if ((/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
      return true
    } else {
      return false
    }
  },
  /*
   * 判断是否为固定电话
   */
  isTel (mobile) {
    if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(mobile)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 判断是否为email
   */
  isEmail (email) {
    var sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/
    if (sReg.test(email)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 获取滚动条滚动距离
   */
  getScrollTop () {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  /*
   * 去掉字符串首尾空格
   */
  trim (str) {
    if (String.prototype.trim) {
      return str == null ? '' : String.prototype.trim.call(str)
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  /*
   * 去掉字符串所有空格
   */
  trimAll (str) {
    return str.replace(/\s*/g, '')
  },
  /*
   * 是否为数组
   */
  isArray (obj) {
    if (Array.isArray) {
      return Array.isArray(obj)
    } else {
      return obj instanceof Array
    }
  },
  /*
   * 是否为对象
   */
  isObject (obj) {
    if (typeof (obj) == 'object' && !Array.isArray(obj)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 数组中对象属性值升序排列
   */
  sortByObj (key) {
    function sortBy(field) {
      return function (a, b) {
        return a[field] - b[field]
      }
    }
  },
  /*
   * 替换文本中所有的字符串 变量替换
   */
  replaceAllText (str, text, val = '') {
    return str.replace(new RegExp(text, 'g'), val)
  },
  /*
   * 数组去重
   */
  equalArray (arry, id) {
    let mObj = {}
    let newArry = arry.reduce(function (item, next) {
      mObj[next.id] ? '' : mObj[next.id] = true && item.push(next);
      return item;
    }, []);
    return newArry
  },
   /*
    * 数组是否包含某个值
    */
  arryHasVal (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) {
        return true
      }
    }
    return false
  },
  /*
   * 元素在数组中的位置
   */
  arryIndexOf (arr, val) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === val) return i
    }
    return -1
  },
  /*
   * 移出数组中的元素
   */
  arryRemoveVal (arr, val) {
    let index = this.arryIndexOf(arr, val)
    if (index > -1) {
      arr.splice(index, 1)
    }
  },
 /*  
  * 判断身份证号 
  */
  isIDnumber (idnum) {
    let reg = /^[0-9]{15}$/
    if (reg.test(idnum)) {
      return reg.test(idnum)
    } else {
      let reg1 = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/
      return reg1.test(idnum)
    }
  },
  /* 
   * 判断是否是中国邮政编码
   */
  isPostCode (code) {
    let reg = /^[1-9]\d{5}$/g  // 起始数字不能为0，然后是5个数字  [1-9]\d{5}
    return reg.test(code)
  },
  /* 
   * 判断是否为车牌号
   */
  isCarNumber (carNum) {
    let reg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-Z0-9]{4}[A-Z0-9挂学警港澳]{1}$/
    return reg.test(carNum)
  },
  /* 
   * 比较两个日期时间的大小(2018-08-08 10:10 and 2018-08-08 12:10)
   */
  dateCompare (st, et) {
    let stdt = new Date(st.replace(/-/g,'/'))
    let etdt = new Date(et.replace(/-/g,'/'))
    if(stdt > etdt) {
      return false // st > et
    } else {
      return true // et > st
    }
  },
  /* 
   * 获取年份（2018）
   */
  getCurrYear () {
    let year = new Date()
    return year.getFullYear()
  },
  /* 
   * 获取月份（08）
   */
  getCurrMonth () {
    let month = new Date().getMonth() + 1
    return month < 10? '0' + month : month
  },
  /* 
   * 获取日数（08）
   */
  getCurrDate () {
    let day = new Date().getDate()
    return day < 10? '0'+day : day
  },
  /* 
   * 获取当前时间戳（毫秒）
   */
  getCurrTimestamp () {
    let time = new Date().getTime()
    return time
  },
  /* 
   * 日期时间转时间戳（毫秒）
   */
  dateTotime (time) {
    return new Date(time.replace(/-/g,'/')).getTime()
  },
  /* 
   *  时间戳转日期时间（2018-08-08 10:10:10）
   */
  timeTodatetime (time) {
    let date = new Date(time)
    let Y = date.getFullYear() + '-'
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-'
    let D = date.getDate() < 10 ? ('0' + date.getDate() + ' ') : date.getDate() + ' '
    let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let m = (date.getMinutes() < 10 ? '0' + date.getHours() : date.getHours()) + ':'
    let s = date.getSeconds() < 10 ? '0' + date.getHours() : date.getHours()
    return Y+M+D+h+m+s
  },
  /* 
   * 时间戳转日期（2018-08-08）
   */
  timeTodate (time) {
    let date = new Date(time)
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
    return Y+M+D;
  },
  /* 
   * 获取当前时间星期几
   */
  getCurrWeeknum () {
    let day = new Date().getDay()
    switch (day) {
      case 0: {
        return '星期日'
        break
      }
      case 1: {
        return '星期一'
        break
      }
      case 2: {
        return '星期二'
        break
      }
      case 3: {
        return '星期三'
        break
      }
      case 4: {
        return '星期四'
        break
      }
      case 5: {
        return '星期五'
        break
      }
      case 6: {
        return '星期六'
        break
      }
    }
  },
  /* 
   * 获取两个日期的天数差
   */
  twoDatediffer (st, et) {
    let stdt = new Date(st.replace(/-/g, '/'))
    let etdt = new Date(et.replace(/-/g, '/'))
    let days = stdt.getTime() - etdt.getTime()
    let time = parseInt(days / (1000 * 60 * 60 * 24))
    return time < 0 ? -time : time
  },
  /* 
   * 获取两个时间的分钟差
   */
  twoTimediffer (st, et) {
    let stdt = new Date(st.replace(/-/g, '/'))
    let etdt = new Date(et.replace(/-/g, '/'))
    let days = stdt.getTime() - etdt.getTime()
    let time = parseInt(days / (1000 * 60))
    return time < 0 ? -time : time
  }

}

module.exports = COR_JS
