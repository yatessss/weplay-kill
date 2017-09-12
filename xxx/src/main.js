// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Flex from 'lib-flexible'
import NProgress from 'nprogress'
import iView from 'iview'

Vue.config.productionTip = false

Vue.use(Flex)
Vue.use(NProgress)
Vue.use(iView)

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
