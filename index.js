const isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
const isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false

const corLib = {
  /*
   * android 和 ios传参校验
   * */
  checkParams(params) {
    if (isPhone) {
      return params
    } else {
      return JSON.stringify(params)
    }
  },
  /*
   * 获取当前时间 0为日期时间 1为日期 2为时间
   **/
  getDate(type) {
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
  format(format) {
    var o = {
      'M+': new Date().getMonth() + 1, //month
      'd+': new Date().getDate(), //day
      'h+': new Date().getHours(), //hour
      'm+': new Date().getMinutes(), //minute
      's+': new Date().getSeconds(), //second
      'q+': Math.floor((new Date().getMonth() + 3) / 3), //quarter
      'S': new Date().getMilliseconds() //millisecond
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
   **/
  getDayNum(strDateStart, strDateEnd) {
    var strSeparator = '-' //日期分隔符
    var oDate1
    var oDate2
    var iDays
    oDate1 = strDateStart.split(strSeparator)
    oDate2 = strDateEnd.split(strSeparator)
    var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2])
    var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2])
    iDays = parseInt(Math.abs(strDateS - strDateE) / 1000 / 60 / 60 / 24) //把相差的毫秒数转换为天数
    return iDays == 0 ? '1' : iDays
  },
  /*
   * 是否为手机号
   **/
  isTelPhone(mobile) {
    if ((/^1(3|4|5|7|8)\d{9}$/.test(mobile))) {
      return true
    } else {
      return false
    }
  },
  /*
   * 判断是否为固定电话
   **/
  isTel(mobile) {
    if (/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(mobile)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 判断是否为email
   **/
  isEmail(email) {
    var sReg = /[_a-zA-Z\d\-\.]+@[_a-zA-Z\d\-]+(\.[_a-zA-Z\d\-]+)+$/
    if (sReg.test(email)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 获取滚动条滚动距离
   **/
  getScrollTop() {
    return document.documentElement.scrollTop || document.body.scrollTop
  },
  /*
   * 滚动条回到顶部
   **/
  goScrollTop() {
    cancelAnimationFrame(timer)
    timer = requestAnimationFrame(function fn() {
      var oTop = document.body.scrollTop || document.documentElement.scrollTop
      if (oTop > 0) {
        scrollBy(0, -20)
        timer = requestAnimationFrame(fn)
      } else {
        cancelAnimationFrame(timer)
      }
    })
  },
  /*
   * 去掉字符串首尾空格
   **/
  trim(str) {
    if (String.prototype.trim) {
      return str == null ? '' : String.prototype.trim.call(str)
    } else {
      return str.replace(/(^\s*)|(\s*$)/g, '')
    }
  },
  /*
   * 去掉字符串所有空格
   **/
  trimAll(str) {
    return str.replace(/\s*/g, '')
  },
  /*
   * 是否为数组
   **/
  isArray(obj) {
    if (Array.isArray) {
      return Array.isArray(obj)
    } else {
      return obj instanceof Array
    }
  },
  /*
   * 是否为对象
   **/
  isObject(obj) {
    if (typeof (obj) == 'object' && !Array.isArray(obj)) {
      return true
    } else {
      return false
    }
  },
  /*
   * 数组中对象属性值升序排列
   **/
  sortByObj(key) {
    function sortBy(field) {
      return function (a, b) {
        return a[field] - b[field]
      }
    }
  },
  /*
   * 替换文本中所有的字符串 变量替换
   **/
  replaceAllText (str, text, val='') {
    return str.replace(new RegExp(text,'g'), val)
  }
}

const corPlugin = {
  /** 
   * 拍照，获取相册图片 
   * type  1为拍照  0为相册获取
   */
  getPhoto(type, cb) {
    let backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.status == true) {
        cb(result.data)
      }
    }
    let params = {
      maxNumber: 9,
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    if (type) {
      corNative.photoForCamera(params)
    } else {
      corNative.photoForAlbum(params)
    }
  },
  /** 
   * 获取人员
   * isCheckBox 是否多选
   * initialUsers 是否有默认值
   */
  chooseUser(isCheckBox = true, initialUsers = [], cb) {
    let backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.status == true) {
        cb(result.data)
      }
    }
    let params = {
      isCheckBox: isCheckBox,
      initialUsers: initialUsers,
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.choiceUser(params)
  },
  /** 
   * 上传附件
   * url 服务器端地址
   * imgUrl 本地路径
   * file 服务器接收标识
   */
  uploadFile (url, imgUrl, file, cb) {
    let backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if(result.data.progress==100){
        cb(result.data.file.url)
      }
      if (result.data.reqCode == 2) {
      } else if (reslut.data.reqCode == 0) {
      }
    }
    let params = {
      url: url,
      contentName: file,
      data: {
        file: {
          fPath: imgUrl,
          fType: 'png',
          fName: '',
        }
      },
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.upload(params)
  },
  /** 
   * 下载附件
   * url 服务器端地址
   * fileName 附件名称
   */
  download (url,fileName, cb) {
    let backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if(result.data.progress == 100 ){
        cb(result.data.savePath)
      }
      if (restult.status == true) {
        if (result.data.reqCode == 0) {
        } else if (result.data.reqCode == 2) {
        }
      }
    }
    let params = {
      url: url,
      filename: fileName,
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.download(params)
  },
  /** 
   * 查看附件
   * fileUrl 附件地址
   */
  openFile (fileUrl) {
    var type = fileUrl.split('.')[1].toLowerCase(),
      fileType
    if (type == 'doc' || type == 'ppt' || type == 'pptx' || type == 'xls' ||
      type == 'pdf' || type == 'xlsx' || type == 'xlt' || type == 'docx' || type == 'txt') {
      fileType = 'OFFICE'
    } else if (type == 'png' || type == 'jpg' || type == 'jpeg') {
      fileType = 'IMAGE'
    }
    var params = {
      path: fileUrl,
      suffix: type,
      type: fileType
    }
    params = corLib.checkParams(params)
    corNative.openFile(params)
  }
}
module.exports.corLib = corLib
module.exports.corPlugin = corPlugin