import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';

const settings: RouteRecordRaw[] = [
  {
    name: 'Business',
    path: '/business',
    component: BasicLayout,
    meta: {
      icon: 'ic:baseline-view-in-ar',
      title: '业务管理',
    },
    children: [
      {
        name: 'Device',
        path: '/business/devices',
        component: () => import('#/views/business/devices/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '设备清单',
        },
      },
      {
        name: 'Rents',
        path: '/settings/dicts',
        component: () => import('#/views/settings/dicts/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '已租赁设备',
        },
      },
      {
        name: 'Maintain',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '租赁设备维护',
        },
      },
      {
        name: 'Repair',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '设备维修服务',
        },
      },
      {
        name: 'SaleIn',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '销售入库服务',
        },
      },
      {
        name: 'SaleOut',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '销售出库服务',
        },
      },
      {
        name: 'Models',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '打印机型号管理',
        },
      },
      {
        name: 'FeeRules',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '租赁计费规则管理',
        },
      },
      {
        name: 'MiniCodes',
        path: '/settings/perms',
        component: () => import('#/views/settings/perms/index.vue'),
        meta: {
          icon: 'ion:layers-outline',
          title: '小程序码',
        },
      },
    ],
  },
];

export default settings;
