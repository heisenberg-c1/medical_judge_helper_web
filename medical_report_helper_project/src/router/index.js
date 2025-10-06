import { createRouter, createWebHistory } from 'vue-router'
import login from '@/views/login/login.vue'
import Main from '@/views/main/main.vue'
import exportPreview from '@/views/exportPreview/exportPreview.vue'

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
  },
  {
    path : '/exportPreview',
    name : 'exportPreview',
    component : exportPreview,
    props: true 
  }
]


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})



export default router
