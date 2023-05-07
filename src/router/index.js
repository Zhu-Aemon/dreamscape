import { createRouter, createWebHistory } from 'vue-router'
import BasicPanel from "../components/BasicPanel.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BasicPanel,
    },
  ],
})

export default router
