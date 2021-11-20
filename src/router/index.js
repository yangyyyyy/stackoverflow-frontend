import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Search from "../views/Search";
import IntroPage from "../views/IntroPage";

Vue.use(VueRouter)

const routes = [
  {
    path: '/search',
    name: 'Search',
    component: Search
  },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/',
    name: 'IntroPage',
    component: IntroPage
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
