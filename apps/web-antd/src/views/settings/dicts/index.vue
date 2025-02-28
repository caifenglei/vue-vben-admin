<script setup lang="ts">
import type { EntityField } from '#/components/types';

import { useTemplateRef } from 'vue';

import { Page } from '@vben/common-ui';

import { DictApi } from '#/api';
import QueryableTable from '#/components/QueryableTable.vue';
import { useTableAction } from '#/composables/use-table-action';

const fields: EntityField[] = [
  {
    name: 'keyword',
    label: '关键字',
    range: [true, false, false, false],
    component: 'Input',
  },
  {
    name: 'label',
    label: '字典名称',
    range: [false, true, true, false],
    component: 'Input',
    treeNode: true,
  },
  {
    name: 'code',
    label: '字典编码',
    range: [false, true, true, false],
    component: 'Input',
  },
  {
    name: 'updated_at',
    label: '更新时间',
    range: [false, true, false, true],
    component: 'Input',
  },
];

const { tableActions, rowActions, DrawerForm, reloadTable } = useTableAction({
  tableRef: useTemplateRef<InstanceType<typeof QueryableTable>>('mainTable'),
  httpApis: DictApi,
  fields,
  createAction: {
    label: '新增字典',
  },
});
</script>

<template>
  <Page auto-content-height>
    <QueryableTable
      ref="mainTable"
      :fields="fields"
      :http-query="DictApi.query"
      :table-actions="tableActions"
      :row-actions="rowActions"
    />
    <DrawerForm @update="reloadTable" />
  </Page>
</template>
