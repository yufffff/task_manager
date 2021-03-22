import Vue from 'vue'
import VueRouter from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/auth'
import TODO from '@/components/TODO'
import Signup from '@/components/Signup'
import Signin from '@/components/Signin'

Vue.use(VueRouter)

const routes = [
  {
    // メインページ
    path: '/',
    name: 'TODO',
    component: TODO,
    meta: { requiresAuth: true }
  },
  {
    // サインアップ
    path: '/signup',
    name: 'Signup',
    component: Signup
  },
  {
    // サインイン
    path: '/signin',
    name: 'Signin',
    component: Signin
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next()
  }
})

export default router