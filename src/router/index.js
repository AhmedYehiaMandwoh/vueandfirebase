import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Edit from '@/views/Edit.vue'
import Signup from '@/views/Signup.vue'
import Signin from '@/views/Signin.vue'

const routes = [
  {
    path: '/',
    redirect: "/home",
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/home/signin',
    name: 'signin',
    component: Signin
  },
  {
    path: '/home/signup',
    name: 'signup',
    component: Signup
  },
  {
    path: '/home/edit/:id',
    name: 'Edit',
    component: Edit
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
