import type { EntityField, TableRowAction } from '#/components/types';
import type { TableActionProps } from '#/composables/use-table-action';

import { useVbenDrawer } from '@vben/common-ui';

import { UserApi } from '#/api';
import DrawableForm from '#/components/DrawableForm.vue';

const fields: EntityField[] = [
  {
    name: '_divider',
    label: '客户选择',
    component: 'Divider',
    range: [false, false, true, false],
  },
  {
    label: '客户',
    name: 'phone',
    component: 'ApiSelect',
    props: {
      placeholder: '请输入姓名或手机号码搜索用户，或添加新用户',
    },
    api: UserApi.search, // TODO slot dropdownRender
    optionRender: (item) => ({
      label: `${item.brand} - ${item.name}`,
      value: item.id,
    }),
    rules: 'selectRequired',
    range: [false, false, true, false],
  },
];

const [RentDrawer, rentDrawerApi] = useVbenDrawer({
  connectedComponent: DrawableForm,
});

export const useRentForm = (props: TableActionProps) => {
  const rentAction: TableRowAction = {
    icon: 'lucide:circle-arrow-out-up-right',
    text: '出租',
    handle: (row: any, action: TableRowAction) => {
      rentDrawerApi
        .setState({ class: 'w-full', placement: 'right' })
        .setData({
          api: props.httpApis.create,
          fields,
          row,
          title: action.text,
        })
        .open();
    },
  };
  return [RentDrawer, rentAction] as const;
};
