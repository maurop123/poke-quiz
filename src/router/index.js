import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SecondTab from '../views/SecondTab.vue'
import ThirdTab from '../views/ThirdTab.vue'

const router = createRouter({
  // Using hash mode. Not good for SEO
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/tab2',
      name: 'SecondTab',
      component: SecondTab
    },
    {
      path: '/tab3',
      name: 'ThirdTab',
      component: ThirdTab
    }
  ]
})

export default router
