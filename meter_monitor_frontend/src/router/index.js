import { createRouter, createWebHistory } from 'vue-router'
import RegisterPage from '../components/RegisterPages.vue'
import VerifyPage from '../components/ImageVerify.vue'
import UpdateProfile from '../views/UpdateProfile.vue'


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
    },
    {
      path: '/updateprofile',
      name: 'updateprofile',
      component: UpdateProfile
    }
  ]
})

export default router
