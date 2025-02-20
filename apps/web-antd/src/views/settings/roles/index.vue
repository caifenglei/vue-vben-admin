<script lang="ts" setup>
import type { EntityField, TableRowAction } from '#/components/types';

import { MdiDelete, MdiEdit } from '@vben/icons';

import { RoleApi } from '#/api';
import QueryableTable from '#/components/QueryableTable.vue';

const fields: EntityField[] = [
  {
    name: 'keyword',
    label: '关键字',
    range: [true, false, false, false],
    component: 'Input',
  },
  {
    name: 'name',
    label: '编码',
    range: [false, true, true, true],
    component: 'Input',
  },
  {
    name: 'label',
    label: '名称',
    range: [false, true, true, true],
    component: 'Input',
  },
  {
    name: 'updated_at',
    label: '更新时间',
    range: [false, true, false, true],
    component: 'Input',
  },
];
const rowActions: TableRowAction[] = [
  {
    icon: MdiEdit,
    text: '编辑',
  },
  {
    icon: MdiDelete,
    text: '删除',
  },
];
</script>

<template>
  <QueryableTable
    :fields="fields"
    :http-query="RoleApi.query"
    :row-actions="rowActions"
  />
</template>
