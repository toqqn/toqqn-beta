import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/home/Index'
import Profile from '@/components/user/Index'
import Community from '@/components/community/Index'
import Post from '@/components/posts/Index'
import PageNotFound from '@/components/shared/PageNotFound'
import store from '../store'

Vue.use(Router)

const ifLoggedIn = (to, from, next) => {
  if (store.getters.isLoggedIn) {
    next()
    return
  }
  next('/')
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      beforeEnter: ifLoggedIn
    },
    {
      path: '/community/:id',
      name: 'Community',
      component: Community,
      props: true
    },
    {
      path: '/post/:id',
      name: 'Post',
      component: Post,
      props: true
    },
    { path: '*', component: PageNotFound }
  ]
})
