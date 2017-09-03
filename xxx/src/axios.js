/**
 * Created by miaoyicheng on 2017/9/3.
 */

import axios from 'axios'
import router from './router'

// axios 配置
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://xhweg6.natappfree.cc'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    console.log('已经接收到请求')

    // if (store.state.token) {
    //   config.headers.Authorization = `token ${store.state.token}`;
    // }
    return config
  },
  err => {
    console.log('失败')

    return Promise.reject(err)
  })

// http response 拦截器
axios.interceptors.response.use(
  response => {
    console.log('已经接收到请求')
    return response
  },
  error => {
    console.log('失败')
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          router.replace({
            path: 'login',
            query: {redirect: router.currentRoute.fullPath}
          })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios
