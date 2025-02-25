<script lang="ts" setup>
import type { EntityField } from '#/components/types';

import { useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { RoleApi } from '#/api';
import QueryableTable from '#/components/QueryableTable.vue';
import { useTableAction } from '#/composables/use-table-action';

const fields: EntityField[] = [
  {
    name: 'keyword',
    label: '关键字',
    component: 'Input',
    range: [true, false, false, false],
  },
  {
    name: 'name',
    label: '编码',
    component: 'Input',
    rules: 'required',
    range: [false, true, true, true],
  },
  {
    name: 'label',
    label: '名称',
    component: 'Input',
    rules: 'required',
    range: [false, true, true, true],
  },
  {
    name: 'status',
    label: '状态',
    component: 'Select',
    dictName: 'role_status',
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
  httpApis: RoleApi,
  fields,
  createAction: {
    label: '新增角色',
  },
});
</script>

<template>
  <Page auto-content-height>
    <QueryableTable
      ref="mainTable"
      :fields="fields"
      :http-query="RoleApi.query"
      :table-actions="tableActions"
      :row-actions="rowActions"
    />
    <DrawerForm @update="reloadTable" />
  </Page>
</template>
