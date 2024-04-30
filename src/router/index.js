import { h, resolveComponent } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import authMiddleware from '../middleware/AuthCheck'


import DefaultLayout from '@/layouts/DefaultLayout'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: DefaultLayout,
    redirect: '/live_dashboard',
    children: [
      {
        path: '/live_dashboard',
        name: 'Live Dashboard',
        component: () => import('@/views/live_dashboard/LiveDashboard.vue'),
        meta: {
          requiresAuth: true,
          roles: ['admin','staff','viewer']
        },
        beforeEnter: authMiddleware,
      },
      {
        path: '/data',
        name: 'Data',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect : '/data/production',
        children : [
          {
            path : '/data/production',
            name : 'Production',
            component: () => import('@/views/production_list/MasterProduction.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path : '/data/planner',
            name : 'Production Plan',
            component: () => import('@/views/production_plan/ProductionPlan.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
        ]
      },
      {
        path: '/master',
        name: 'Master',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect : '/master/machine',
        children : [
          {
            path : '/master/kanagata',
            name : 'Kanagata',
            component: () => import('@/views/master_kanagata/MasterKanagata.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path: '/master/machine',
            name: 'Machine',
            component: () => import('@/views/master_machine/MasterMachine.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path: '/master/product',
            name: 'Product',
            component: () => import('@/views/master_product/MasterProduct.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path: '/master/pca',
            name: 'PCA',
            component: () => import('@/views/master_pca/MasterPca.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
        ]
      },
      {
        path: '/production_report',
        name: 'Production Report',
        component: {
          render() {
            return h(resolveComponent('router-view'))
          },
        },
        redirect : '/production_report/daily_weekly',
        children : [
          {
            path : '/production_report/daily_weekly',
            name : 'Daily Weekly',
            component: () => import('@/views/production_report/daily_weekly/DailyWeeklyReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path : '/production_report/monthly',
            name : 'Monthly',
            component: () => import('@/views/production_report/monthly/MonthlyReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path : '/production_report/yearly',
            name : 'Yearly',
            component: () => import('@/views/production_report/yearly/YearlyReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path : '/production_report/performance',
            name : 'Performance',
            component: () => import('@/views/production_report/performance/PerformanceReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          {
            path : '/production_report/summary',
            name : 'Summary',
            component: () => import('@/views/production_report/summary/SummaryReport.vue'),
            meta: {
              requiresAuth: true,
              roles: ['admin','staff','viewer']
            },
            beforeEnter: authMiddleware,
          },
          
        ]
      },
    ],
  },
  {
    path: '/pages',
    redirect: '/pages/404',
    name: 'Pages',
    component: {
      render() {
        return h(resolveComponent('router-view'))
      },
    },
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/pages/Page404'),
      },
      {
        path: '500',
        name: 'Page500',
        component: () => import('@/views/pages/Page500'),
      },
      {
        path: 'register',
        name: 'Register',
        component: () => import('@/views/pages/Register'),
      },
    ],
  },
  {
    path: '/forbidden',
    name: 'Forbidden',
    component: () => import('@/views/pages/Page403'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/pages/Login'),
  },
]

const router = createRouter({
  // eslint-disable-next-line no-undef
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

// router.beforeEach(authMiddleware)

export default router
