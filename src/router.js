import Vue from 'vue'
import Router from 'vue-router'
import Store from '@/store/store'
import HomePage from '@/views/pages/HomePage'
import UserRoutes from '@/routes/user.routes'
import TodosRoutes from '@/routes/todos.routes'
import CategoriesRoutes from '@/routes/categories.routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home.page',
      component: HomePage,
      meta: {
        title: 'Welcome'
      }
    },
    ...UserRoutes,
    ...TodosRoutes,
    ...CategoriesRoutes
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!Store.getters.isAuth()) {
      Store.commit('createNotifier', {
        type: 'warning',
        message: 'Not authorized, please login.'
      })
      next({ name: 'user.logout' })
    }
  }
  next()
})

router.afterEach((to, from) => {
  // Sets the title of the page to the router meta title.
  document.title = to.meta.title + ' - ' + process.env.VUE_APP_BASE_TITLE
})

export default router
