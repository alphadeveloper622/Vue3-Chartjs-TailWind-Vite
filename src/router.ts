import { createRouter, createWebHistory } from 'vue-router'

export default createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      component: () => import('./components/DrilldownChart.vue'),
      //component: () => import('./components/Test.vue'),
    },
    {
      path: '/statisticCard',
      component: () => import('./components/StatisticCard.vue'),
      //component: () => import('./components/Test.vue'),
      //component: () => import('./components/DrilldownChart.vue'),
    },
    {
      path: '/tableData',
      component: () => import('./components/TableData.vue'),
    },
    {
      path: '/404',
      name: 'NotFound',
      component: () => import('./components/NotFound.vue'),
  },
  {
      path: '/:catchAll(.*)',
      redirect:'404'
  }    
  ],
})
