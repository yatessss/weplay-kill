/**
 * Created by miaoyicheng on 2017/9/3.
 */

import axios from 'axios'
// import router from './router'
import CONSTANT from '../../constant'
// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = CONSTANT.URL
axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.Authorization
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log('已经接收到请求')

    return config
  },
  err => {
    console.log('失败')

    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log('已经接收到请求', response)
    return response
  },
  error => {
    console.log('失败')
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CONSTANT.APPID + '&redirect_uri=' + encodeURIComponent(CONSTANT.URL + '/static/index.html') + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
