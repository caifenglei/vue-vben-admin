import type { RouteRecordRaw } from 'vue-router';

import { BasicLayout } from '#/layouts';
import { $t } from '#/locales';

const settings: RouteRecordRaw[] = [
  {
    name: 'Settings',
    path: '/settings',
    component: BasicLayout,
    meta: {
      icon: 'lucide:settings',
      title: $t('settings.title'),
    },
    children: [
      {
        name: 'Roles',
        path: '/settings/roles',
        component: () => import('#/views/settings/roles/index.vue'),
        meta: {
          title: $t('settings.roles'),
        },
      },
    ],
  },
];

export default settings;
