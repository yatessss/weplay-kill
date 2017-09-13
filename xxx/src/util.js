/**
 * Created by miaoyicheng on 2017/9/5.
 */
/*eslint-disable*/

const ua = navigator.userAgent
let isWX = function () {
  return (/MicroMessenger/i).test(ua)
}

let isAPP = function () {
  return (/QMMWD/i).test(ua)
}
let isIOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)

let setTitle = (title) => {
  document.title = title
  if (isIOS) {
    let iframe = document.createElement('iframe')
    iframe.style.visibility = 'hidden'
    iframe.setAttribute('src', 'https://m.baidu.com/favicon.ico')
    iframe.style.width = '1px'
    iframe.style.height = '1px'
    iframe.onload = function () {
      setTimeout(function () {
        document.body.removeChild(iframe)
      }, 0)
    }
    document.body.appendChild(iframe)
  }
}

// 获取 url 请求参数
let getRequestParams = function (url) {
  url = url || window.location.search
  url = decodeURIComponent(url)
  var Request = {}
  if (url.indexOf('?') !== -1) {
    var str = url.substr(1)
    let strs = str.split('&')
    for (var i = 0; i < strs.length; i++) {
      var _key = strs[i].split('=')[0]
      _key && (Request[_key] = strs[i].split('=')[1])
    }
  }
  return Request
}

// 检查邮箱格式
let checkEmail = function (email) {
  var correctEmail = /^([a-zA-Z0-9]+[_|\|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
  return correctEmail.test(email)
}
let Cookie = (function () {
  var get = function (key) {
    var arr = document.cookie.match(new RegExp('(^| )' + key + '=([^;]*)(;|$)'))
    if (arr !== null) {
      return decodeURIComponent(arr[2])
    } else {
      return ""
    }
  }
  var remove = function (key) {
    var d = new Date()
    if (this.get(key) !== "") {
      d.setTime(d.getTime() - (86400 * 1000 * 1))
      document.cookie = key + "=;expires=" + d.toGMTString()
    }
  }
// duration过期时间(duration单位为天)
  var set = function (key, value, duration) {
    Cookie.remove(key)
    var d = new Date()
    if (duration) {
      d.setTime(d.getTime() + 1000 * 60 * 60 * 24 * duration)
      document.cookie = key + "=" + encodeURI(value) + "; expires=" + d.toGMTString() + ";path=/"
    } else {
      document.cookie = key + "=" + encodeURI(value) + ";path=/"
    }
  }
  return {
    get: get,
    set: set,
    remove: remove
  }
})()

let filterRole = function (str) {
  switch (str) {
    case 'role_villagers':
      return '平民'
    case 'role_seer':
      return '平民'
    case 'role_idiot':
      return '预言家'
    case 'role_savior':
      return '守卫'
    case 'role_witch':
      return '女巫'
    case 'role_knight':
      return '骑士'
    case 'role_hunter':
      return '猎人'
    case 'role_werewolves':
      return '狼人'
    case 'role_white_werewolf':
      return '白狼王'
    case 'role_beauty_werewolf':
      return '狼美人'

  }
}

exports.isWX = isWX()
exports.isAPP = isAPP()
exports.getRequestParams = getRequestParams
exports.checkEmail = checkEmail
exports.Cookie = Cookie
exports.setTitle = setTitle
exports.filterRole = filterRole
