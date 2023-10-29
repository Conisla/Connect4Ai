import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LocaleGame from "../views/LocaleGame.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/locale-game/',
      name: 'locale',
      component: LocaleGame,
      props: true,
    }
  ]
})

export default router
