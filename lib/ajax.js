
import axios from 'axios'
import qs from 'qs'
function checkParams (params) {
  var isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0)
  if (isAndroid) {
    return JSON.stringify(params)
  }
  return params
}
const $ajax = (obj) => {
  return new Promise((resolve, reject) => {
    if (window.corNative) {
      var backMethod = 'backMethod_' + new Date().getTime()
      window[backMethod] = (res) => {
        if (res.status === true) {
          resolve(res.data)
        } else {
          console.log('error')
        }
      }
      var params = {
        url: obj.url,
        method: obj.type,
        data: obj.params,
        isForm: true,
        __callback: backMethod
      }
      params = checkParams(params)
      window.corNative.requestProxy(params)
    } else {
      if ( !obj.hasOwnProperty('type') || obj.type.toLowerCase() === 'get' ) {
        axios.get(obj.url, {
          params: obj.params
        }).then(function (response) {
          resolve(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      } else {
        axios.post(obj.url, qs.stringify(obj.params)).then(function (response) {
          resolve(response.data)
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
  })
}
export default $ajax
