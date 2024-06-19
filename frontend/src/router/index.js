import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import Register from '../components/Register.vue'
import Profile from '../components/Profile.vue'
import AuthService from '../services/auth.service'

const routes = [
  {
    path: '/',
    redirect: '/profile'
  },
  {
    path: '/login',
    component: Login,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAuthenticated()) {
        next({ name: 'Profile' })
      } else {
        next()
      }
    }
  },
  {
    path: '/register',
    component: Register,
    beforeEnter: (to, from, next) => {
      if (AuthService.isAuthenticated()) {
        next({ name: 'Profile' })
      } else {
        next()
      }
    }
  },
  {
    path: '/profile',
    component: Profile,
    name: 'Profile',
    meta: { requiresAuth: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const publicPages = ['/login', '/register']
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    return next('/login')
  }

  next()
})

export default router
