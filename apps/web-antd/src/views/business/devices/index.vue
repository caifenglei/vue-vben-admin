<script lang="ts" setup>
import type { EntityField } from '#/components/types';

import { useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { DeviceApi } from '#/api';
import QueryableTable from '#/components/QueryableTable.vue';
import { useTableAction } from '#/composables/use-table-action';

const fields: EntityField[] = [
  {
    name: 'keyword',
    label: '关键字',
    component: 'Input',
    props: {
      placeholder: '请输入机号、品牌或型号关键字',
    },
    range: [true, false, false, false],
  },
  {
    name: 'photos',
    label: '图片',
    component: 'Upload',
    rules: 'required',
    range: [false, false, true, true],
  },
  {
    name: 'serial_no',
    label: '机号',
    component: 'Input',
    rules: 'required',
    range: [false, true, true, true],
  },
  {
    name: 'condition',
    label: '成色',
    component: 'Select',
    dictName: 'device_quality',
    rules: 'required',
    range: [false, true, true, true],
  },
  {
    name: 'waterproof',
    label: '喷墨防水',
    component: 'RadioGroup',
    dictName: 'yes_or_no',
    rules: 'required',
    range: [false, true, true, true],
  },
  // model
  {
    name: 'area',
    label: '区域',
    component: 'Select',
    dictName: 'simple_areas',
    rules: 'required',
    range: [true, true, true, true],
  },
  {
    name: 'status',
    label: '状态',
    component: 'Select',
    dictName: 'device_status',
    rules: 'required',
    range: [true, true, true, true],
  },
  {
    name: 'updated_at',
    label: '更新时间',
    component: 'Input',
    range: [false, true, false, true],
  },
];

const { tableActions, rowActions, DrawerForm, reloadTable } = useTableAction({
  tableRef: useTemplateRef<InstanceType<typeof QueryableTable>>('mainTable'),
  httpApis: DeviceApi,
  fields,
  createAction: {
    label: '添加设备',
  },
});

// 角色分配操作
// const [AllocationDrawer, allocationDrawerApi] = useVbenDrawer({
//   connectedComponent: RoleAllocation,
// });
// const allocateRow: TableRowAction = {
//   icon: MdiCreate,
//   text: '分配',
//   handle: (row: any, _action: TableRowAction) => {
//     allocationDrawerApi
//       .setState({ class: 'w-full', placement: 'right' })
//       .setData({
//         httpApis: RoleApi,
//         row,
//       })
//       .open();
//   },
// };
// rowActions.unshift(allocateRow);
</script>

<template>
  <Page auto-content-height>
    <QueryableTable
      ref="mainTable"
      :fields="fields"
      :http-query="DeviceApi.query"
      :table-actions="tableActions"
      :row-actions="rowActions"
    />
    <DrawerForm @update="reloadTable" />
  </Page>
</template>
