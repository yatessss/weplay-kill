import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home'
import Join from '@/components/join'
import Room from '@/components/room'
import Check from '@/components/check'
import Ranking from '@/components/ranking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Home,
      meta: {title: 'weplay桌游协会'}
    },
    {
      path: '/join',
      name: 'join',
      component: Join,
      meta: {title: '加入游戏'}
    },
    {
      path: '/room/:roomId',
      name: 'room',
      component: Room,
      meta: {title: '游戏房间'}
    },
    {
      path: '/check',
      name: 'check',
      component: Check,
      meta: {title: '签到'}
    },
    {
      path: '/ranking',
      name: 'ranking',
      component: Ranking,
      meta: {title: '加入游戏'}
    }
  ]
})
