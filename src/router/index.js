import { createRouter, createWebHistory } from 'vue-router'
import TasksList from '../pages/TasksList.vue'
import MyTasks from '../pages/MyTasks.vue'
import ReportsPage from '../pages/ReportsPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import RegisterPage from '../pages/auth/RegisterPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: MyTasks
    },
    {
      path: '/tasks',
      name: 'tasks',
      component: TasksList
    },
    {
      path: '/reports',
      name: 'reports',
      component: ReportsPage
    },
    {
      path: '/login',
      name: 'login',
      component: LoginPage
    },
    {
      path: '/signup',
      name: 'signup',
      component: RegisterPage
    },
    {
      path: '/register',
      name: 'register',
      component: RegisterPage
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../pages/NotFound.vue')
    }
  ]
})

const token = localStorage.getItem('token')
var isAuthenticated = false

if (token) {
  isAuthenticated = true
}

router.beforeEach((to, from, next) => {
  if (to.name !== 'login' && to.name !== 'register' && to.name !== 'signup') {
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next()
    }
  } else {
    next()
  }
})

export default router
