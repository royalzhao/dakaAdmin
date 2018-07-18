import Vue from 'vue'
import Router from 'vue-router'
import {post,fetch,patch,put} from '@/util/http'
import {delCookie,getCookie} from '@/util/util'

import Home from '@/components/common/Home'
import DashBoard from '@/components/page/DashBoard'
import index from '@/components/page/index'
import userList from '@/components/page/userList'
import activitySetting from '@/components/page/activitySetting'
import tradingRecord from '@/components/page/tradingRecord'
import messageList from '@/components/page/messageList'

Vue.use(Router)


const routes = [
  {
    path: '/index',
    name:'登录',
    component:index
  },
  {
    path: '/',
    component: Home,
    redirect: '/DashBoard',
    children:[
      {
        path:'/DashBoard',
        component:DashBoard
      },
      {
        path:'/userList',
        component:userList
      },
      {
        path:'/activitySetting',
        component:activitySetting
      },
      {
        path:'/tradingRecord',
        component:tradingRecord
      },
      {
        path:'/messageList',
        component:messageList
      },
      
    ]
  }
];
const router = new Router({
mode: 'history',
routes
});
//这个是请求页面路由的时候会验证cookie存不存在，不存在的话会到登录页
router.beforeEach((to, from, next) => {
  if (to.path.startsWith('/index')) {
    //delCookie('username');
    next()
  } else {
    let user = getCookie('username');
    if (!user) {
      next({path: '/index'})
    } else {
      next()
    }
  }

});
export default router;


