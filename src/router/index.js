import Vue from 'vue'
import VueRouter from 'vue-router'
import City from '@/views/City.vue'
import Films from '@/views/Films.vue'
import Cinemas from '@/views/Cinemas.vue'
// import Center from '@/views/Center.vue'
import Nowplaying from '@/views/films/Nowplaying.vue'
import Comingsoon from '@/views/films/Comingsoon.vue'
import Search from '@/views/Search.vue'
import Detail from '@/views/Detail.vue'
// import Order from '@/views/Order.vue'
import Login from '@/views/Login.vue'
Vue.use(VueRouter) // 注册路由插件

const routes = [
  {
    path: '/films',
    component: Films,
    children: [
      {
        path: '/films/nowplaying',
        component: Nowplaying
      },
      {
        path: '/films/comingsoon',
        component: Comingsoon
      },
      {
        path: '/films',
        redirect: '/films/nowplaying'
      }
    ]
  },
  {
    name: 'sunmofan',
    path: '/detail/:id',
    component: Detail
  },
  {
    path: '/cinemas',
    component: Cinemas
  },
  {
    path: '/city',
    component: City
  },
  {
    path: '/cinemas/search',
    component: Search
  },
  {
    path: '/center',
    component: () => import('@/views/Center.vue'), // 懒加载
    meta: {
      isSunmofan: true
    },
    // 路由独享拦截
    beforeEach: (to, from, next) => {
      if (localStorage.getItem('token')) {
        next()
      } else {
        next('/login')
      }
    }
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/order',
    component: () => import('@/views/Order.vue'),
    meta: {
      isSunmofan: true
    }
  },
  {
    path: '*',
    redirect: '/films'
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})
// 全局拦截
// router.beforeEach((to, from, next) => {
//   console.log(to)
//   if (to.meta.isSunmofan) {
//     if (localStorage.getItem('token')) {
//       next()
//     } else {
//       next({
//         path: '/login',
//         query: { redirect: to.fullPath }
//       })
//     }
//   } else {
//     next()
//   }
// })
export default router
