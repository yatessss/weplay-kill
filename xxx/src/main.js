// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import Flex from 'lib-flexible'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.config.productionTip = false

Vue.use(Flex)
Vue.use(MintUI)
Vue.use(NProgress)

// 给每个页面不同title
router.beforeEach((to, from, next) => {
  document.title = to.meta.title
  next()
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
