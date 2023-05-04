import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import calendarView from '../views/calendarView.vue'
import RegisterView from '../views/RegisterView.vue'

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
    path: '/Register',
    component: RegisterView,
  }
]


const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
