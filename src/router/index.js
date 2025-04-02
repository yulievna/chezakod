import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/yulya',
      component: HomeView,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/quests',
      name: 'quests',
      component: () => import("@/views/QuestsView.vue")
    },
    {
      path: '/quests/:id', // Динамический маршрут для каждого квеста
      name: 'AboutQuest',
      component: () => import("@/views/AboutQuest.vue"),
      props: true, // Передаем параметры маршрута как пропсы
    },
  ],
})

export default router
