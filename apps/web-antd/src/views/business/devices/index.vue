<script lang="ts" setup>
import type { EntityField } from '#/components/types';

import { useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { DeviceApi, ModelApi } from '#/api';
import QueryableTable from '#/components/QueryableTable.vue';
import { useTableAction } from '#/composables/use-table-action';
import { useViewAction } from '#/composables/use-view-action';
import { useRentForm } from '#/views/business/devices/use-rent-form';

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
    cellRender: {
      name: 'CellLink',
      props: { handler: (row, column) => viewDetail(row, column) },
    },
    range: [false, true, true, true],
  },
  {
    name: 'model_id',
    label: '型号',
    component: 'ApiSelect',
    api: ModelApi.query,
    relationship: 'model',
    optionRender: (item) => ({
      label: `${item.brand} - ${item.name}`,
      value: item.id,
    }),
    rules: 'selectRequired',
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
  {
    name: '_divider',
    component: 'Divider',
    range: [false, false, true, false],
  },
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
    name: 'video_link',
    label: '视频链接',
    component: 'Input',
    range: [false, false, true, true],
  },
  {
    name: 'web_link',
    label: '网页链接',
    component: 'Input',
    range: [false, false, true, true],
  },
  {
    name: 'remark',
    label: '备注',
    component: 'Textarea',
    range: [false, false, true, true],
  },
  {
    name: 'updated_at',
    label: '更新时间',
    component: 'Input',
    range: [false, true, false, true],
  },
];

const [DrawerDetail, viewDetail] = useViewAction(fields);
const mainTable =
  useTemplateRef<InstanceType<typeof QueryableTable>>('mainTable');
const { tableActions, rowActions, DrawerForm, reloadTable } = useTableAction({
  tableRef: mainTable,
  httpApis: DeviceApi,
  fields,
  createAction: {
    label: '添加设备',
  },
});

// 出租操作
const [RentDrawer, rentAction] = useRentForm({
  tableRef: mainTable,
  httpApis: DeviceApi,
});
rowActions.unshift(rentAction);
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
    <DrawerDetail class="w-2/3" />
    <RentDrawer />
  </Page>
</template>
