var isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false
function checkParams (params) {
  if (isAndroid) {
    return JSON.stringify(params)
  }
  return params
}
var COR_NATIVE = {
  /* 
   * 返回门户
   * 
   */
  closeWeb () {
    corNative.closeWeb()
  },
  /* 
   * 获取用户登录信息
   * 
   */
  getLoginInfo () {
    var userInfo = window.corNative.getLoginInfo()
    if (!isPhone) {
      return JSON.parse(userInfo)
    }
    return userInfo
  },
  /* 
   * 拍照，获取相册图片 
   * type  0为拍照  1为相册获取
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
    params = checkParams(params)
    if (type) {
      corNative.photoForAlbum(params)
    } else {
      corNative.photoForCamera(params)
    }
  },
  /*
   * 获取人员
   * isCheckBox 是否多选
   * initialUsers 是否有默认值
   */
  choiceUser (param, cb) {
    var isCheckBox = param.isCheckBox || true
    var initialUsers = param.initialUsers || []
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
    params = checkParams(params)
    corNative.choiceUser(params)
  },
  /*
   * 上传附件
   * url 服务器端地址
   * fileUrl 本地路径
   * file 服务器接收标识
   */
  upload (param, cb) {
    var url = param.url
    var fileUrl = param.fileUrl
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.data.progress == 100) {
        cb(result.data.file.url)
      }
      if (result.data.reqCode == 0) {} else if (result.data.reqCode == 2) {} else if (result.data.reqC == 1) {
        var params = {
          title: '附件上传失败'
        }
        params = checkParams(params)
        corNative.toast(params)
      }
    }
    var fName = fileUrl.split('/')[fileUrl.split('/').length - 1]
    var params = {
      url: url,
      contentName: 'files',
      data: {
        file: {
          fPath: fileUrl,
          fType: 'png',
          fName: fName,
        }
      },
      __callback: backMethod
    }
    params = checkParams(params)
    corNative.upload(params)
  },
  /*
   * 下载附件
   * url 服务器端地址
   * fileName 附件名称
   */
  download (param, cb) {
    var url = param.url
    var fileName = param.fileName
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      if (result.data.progress == 100) {
        cb({
          savePath: result.data.savePath,
          totalSize: result.data.totalSize || 0
        })
      }
      if (restult.status == true) {
        if (result.data.reqCode == 0) {} else if (result.data.reqCode == 2) {} else if (result.data.reqC == 1) {
          var params = {
            title: '附件下载失败'
          }
          params = checkParams(params)
          corNative.toast(params)
        }
      }
    }
    var params = {
      url: url,
      filename: fileName,
      __callback: backMethod
    }
    params = checkParams(params)
    corNative.download(params)
  },
  /* 
   * 查看附件
   * fileUrl 附件地址
   */
  openFile (fileUrl) {
    var type = fileUrl.slice(fileUrl.lastIndexOf('.') + 1),
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
    params = checkParams(params)
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
    params = checkParams(params)
    corNative.choiceFile(params)
  },
   /*
   * 二维码扫描
   */
  goScan (cb) {
    var backMethod = 'backMethod_' + new Date().getTime()
    window[backMethod] = function (result) {
      cb(result)
    }
    var params = {
      __callback: backMethod
    }
    params = checkParams(params)
    corNative.goScan(params)
  }
}

export default COR_NATIVE
