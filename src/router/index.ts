import { createRouter, createWebHistory } from 'vue-router'
// import { organizationRoutes } from './routes/organization'
import { sharedRoutes } from './routes/shared'
import { addSuffix } from './helpers'
import { authGuard } from './guards'
import { dashboardRoutes } from './routes/modules'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
   
    {
      path: '/',
      name: 'Organization App',
      component: () => import('../App.vue'),
      children: [
        ...dashboardRoutes,
        ...addSuffix(sharedRoutes, 'Shared'),
      ],
      
    },
  ],
})

// router.beforeEach(authGuard)
export default router
