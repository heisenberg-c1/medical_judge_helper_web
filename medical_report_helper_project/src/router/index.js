import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/login.vue'
import Main from '@/views/main/main.vue'
const routes = [
  {
    path : '/login',
    name : 'login',
    component : login
  },
  {
    path: '/main', 
    name: 'main',
    component: Main 
  },
  {
    path: '/',
    redirect: '/login' 
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})



export default router
