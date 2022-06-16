import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../components/RegisterPages.vue'
import VerifyPage from '../components/ImageVerify.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'registerpage',
      component:  RegisterPage
    },
    {
      path: '/verify',
      name: 'verifyPage',
      component: VerifyPage
    }

  ]
})

export default router
