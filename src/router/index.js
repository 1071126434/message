import Vue from 'vue'
import Router from 'vue-router'
import login from './login/login'
import home from './home/home'

Vue.use(Router)

const defaultRouter = [{
  path: '/',
  redirect: 'login'
}]
let router = new Router({
  routes: [...defaultRouter, ...login, ...home],
  mode: 'history'
})

router.beforeEach((to, from, next) => {
  if (to.meta.title || to.params.message) {
    document.title = to.meta.title || to.params.message.title
  } else {
    document.title = 'SD项目'
  }
  next()
})

export default router
