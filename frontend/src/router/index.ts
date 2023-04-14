import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import calendarView from '../views/calendarView.vue'
import postRegisterView from '../views/postRegisterView.vue'
import clientRegisterView from '../views/clientRegisterView.vue'

const routes = [
  {
    path: '/',
    component: HomeView,
  },
  {
    path: '/Calendar',
    component: calendarView,
  },
  {
    path: '/PostRegister',
    component: postRegisterView,
  },
  {
    path: '/ClientRegister',
    component: clientRegisterView,
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
