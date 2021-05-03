import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Account from '../views/account/Account.vue'
import CreateTodo from '../views//todos/CreateTodo.vue'
import EditTodo from '../views/todos/EditTodo.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: Account
  },
  {
    path: '/todos/create',
    name: 'CreateTodo',
    component: CreateTodo,
    meta: { requiresAuth: true }
  },
  {
    path: '/todos/edit/:id',
    name: 'EditTodo',
    component: EditTodo,
    meta: { requiresAuth: true }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
