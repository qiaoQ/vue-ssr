import Vue from 'vue';
import Router from 'vue-router';

import Index from '../components/Index';
import Detail from '../components/Detail';

Vue.use(Router)
// 每个用户每次请求都需要创建独立的路由实例
export default function createRouter() {
  return new Router({
    mode: 'history',
    routes: [
      {
        path: '/',
        component: Index,
      },
      {
        path: '/detail',
        component: Detail,
      }
    ]
  })
}