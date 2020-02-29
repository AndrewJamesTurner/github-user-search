import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue' 
import UserProfile from '../views/UserProfile.vue'
import RecentActivity from '../views/RecentActivity.vue'
import UsersRepositories from '../views/UsersRepositories.vue'


Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    component: Home
  },
  {
    name: 'profile',
    path: '/profile/:githubUsername',
    component: UserProfile,
    props: true,
  },
  {
    name: 'activity',
    path: '/activity/:githubUsername',
    component: RecentActivity,
    props: true,
  },
  {
    name: 'repositories',
    path: '/repositories/:githubUsername',
    component: UsersRepositories,
    props: true,
  },
]

const router = new VueRouter({
  routes
})

export default router
