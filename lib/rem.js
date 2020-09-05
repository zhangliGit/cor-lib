;
(function () {
  var screenW = document.documentElement.clientWidth || document.body.clientWidth
  var hDom = document.getElementsByTagName('html')[0]
  if (screenW > 640) screenW = 640
  hDom.style.fontSize = screenW / 18.75 + 'px'
}())