const isPhone = !!window.navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)
const isAndroid = (window.navigator.userAgent.indexOf('Android') >= 0) ? true : false
const COR_PLUGIN = {
}

module.exports = COR_PLUGIN