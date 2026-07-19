import type { RouteRecordRaw } from '@/router/types';

export const PlacementTestRoutes: RouteRecordRaw[] = [
  {
    path: 'placement-test',
    name: 'Placement Test',
    component: () => import('@/views/PlacementTest/IndexPlacementTest.vue'),
    meta: {
      breadcrumb: 'Placement Test',
    },
  },
  {
    path: 'placement-test/:id',
    name: 'Show Placement Test',
    component: () => import('@/views/PlacementTest/ShowPlacementTest.vue'),
    meta: {
      breadcrumb: 'Show Placement Test',
    },
  },
];
