var isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false
var COR_NATIVE = {
  /* 
   * 拍照，获取相册图片 
   * type  1为拍照  0为相册获取
   */
  getPhoto (type, cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.status == true) {
        cb(result.data)
      }
    }
    var params = {
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
  /*
   * 获取人员
   * isCheckBox 是否多选
   * initialUsers 是否有默认值
   */
  choiceUser (isCheckBox = true, initialUsers = [], cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.status == true) {
        cb(result.data)
      }
    }
    var params = {
      isCheckBox: isCheckBox,
      initialUsers: initialUsers,
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.choiceUser(params)
  },
  /*
   * 上传附件
   * url 服务器端地址
   * imgUrl 本地路径
   * file 服务器接收标识
   */
  upload (url, imgUrl, file, cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.data.progress == 100) {
        cb(result.data.file.url)
      }
      if (result.data.reqCode == 2) {} else if (reslut.data.reqCode == 0) {}
    }
    var params = {
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
  /*
   * 下载附件
   * url 服务器端地址
   * fileName 附件名称
   */
  download (url, fileName, cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.data.progress == 100) {
        cb(result.data.savePath)
      }
      if (restult.status == true) {
        if (result.data.reqCode == 0) {} else if (result.data.reqCode == 2) {}
      }
    }
    var params = {
      url: url,
      filename: fileName,
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.download(params)
  },
  /* 
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
  },
  /*
   * 选择本地文件
   * fileUrl 附件地址
   */
  choiceFile (cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.status == true) {
        cb(result.data)
      }
    }
    var params = {
      __callback: backMethod
    }
    params = corLib.checkParams(params)
    corNative.choiceFile(params)
  }
}

module.exports = COR_NATIVE
