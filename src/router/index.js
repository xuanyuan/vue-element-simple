import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const RouteList = [
  {
    path: '/',
    component: resolve => require(['~/views/Layout/App.vue'], resolve),
    meta: {
      title: '首页',
      keepAlive: false,
    },
    children: [
      {
        path: '/',
        name: 'Dashboard',
        meta: {
          title: '首页',
          keepAlive: false
        },
        component: resolve => require(['~/views/Home/Index.vue'], resolve),
      },
      {
        path: '/device_monitor',
        name: 'DeviceMonitor',
        meta: {
          title: '设备监控',
          keepAlive: false
        },
        component: resolve => require(['~/views/Monitor/DeviceMonitor.vue'], resolve)
      },
      {
        path: '/push_history',
        name: 'PushHistory',
        meta: {
          title: '推送历史',
          keepAlive: false
        },
        component: resolve => require(['~/views/Monitor/PushHistory.vue'], resolve)
      }, {
        path: '/history_report',
        name: 'HistoryReport',
        meta: {
          title: '上报历史',
          keepAlive: false
        },
        component: resolve => require(['~/views/Monitor/HistoryReport.vue'], resolve)
      }
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {
      title: '登录',
      keepAlive: false
    },
    components: {
      blank: resolve => require(['~/views/Login/Login.vue'], resolve),
    }
  },

]

export default new Router({routes: RouteList})
