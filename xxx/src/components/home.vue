<template>
  <div class="home-wrap">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
      <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
      <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
      <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2 @click="handleClick">主页主页</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
  import NProgress from 'nprogress'
  import axios from '../axios'
  import util from '../util'
  import CONSTANT from '../../../constant'
//  import util from '../util'

  export default {
    name: 'hello',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    mounted () {
      NProgress.start()
      this.getCode()
    },
    methods: {
      handleClick: function () {
        this.$toast('Hello world!')
      },
      getCode () {
        console.log('获取到的code', util.getRequestParams().code)
        if (util.getRequestParams().code) {
          axios({
            method: 'get',
            url: '/api/getCode',
            params: {
              code: util.getRequestParams().code
            }
          }).then((res) => {
            console.log(res)
            console.log('发送成功/api/getCode')
            var token = res.headers.authorization
            window.localStorage.Authorization = token
            /* TODO 用正则优雅 */
            var tmpStr = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'))
            window.localStorage.userInfo = atob(tmpStr)
          })

          console.log('已经跳转回来')
        } else {
          location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + CONSTANT.APPID + '&redirect_uri=' + encodeURIComponent(CONSTANT.URL + '/static/index.html') + '&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
        }
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss" type="scss" rel="stylesheet/scss">
  .home-wrap {
    padding: 15px 5px;
  }
h1, h2 {
  font-weight: normal;
  font-size: 25px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
  a {
    font-size: 15px;
  }
}

a {
  color: #42b983;
}
</style>
