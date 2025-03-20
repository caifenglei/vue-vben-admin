import type { EntityField } from '#/components/types';

import { useVbenDrawer } from '@vben/common-ui';

import DrawableDetail from '#/components/DrawableDetail.vue';

const [DrawerDetail, drawerDetailApi] = useVbenDrawer({
  connectedComponent: DrawableDetail,
});

export function useViewAction(fields: EntityField[], title = '查看详情') {
  const viewDetail = (
    row: Record<string, any>,
    _column: Record<string, any>,
  ) => {
    // console.log(row, column, 'row ... column');
    drawerDetailApi
      .setData({ fields, row, title })
      .setState({ contentClass: 'p-4', placement: 'right', footer: false })
      .open();
  };

  return [DrawerDetail, viewDetail] as const;
}
