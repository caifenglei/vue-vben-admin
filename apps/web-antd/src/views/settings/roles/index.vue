<script lang="ts" setup>
import type { EntityField, TableRowAction } from '#/components/types';

import { useTemplateRef } from 'vue';

import { Page, useVbenDrawer } from '@vben/common-ui';
import { MdiDelete, MdiEdit } from '@vben/icons';

import { RoleApi } from '#/api';
import DrawableForm from '#/components/DrawableForm.vue';
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

const [DrawerForm, formDrawerApi] = useVbenDrawer({
  connectedComponent: DrawableForm,
});
const editRow = (row: any, action: TableRowAction) => {
  formDrawerApi.setData({
    api: RoleApi.update,
    row,
    fields,
    title: action.text,
  });
  formDrawerApi.open();
};

const rowActions: TableRowAction[] = [
  {
    icon: MdiEdit,
    text: '编辑',
    handle: editRow,
  },
  {
    icon: MdiDelete,
    text: '删除',
  },
];

const queryableTable =
  useTemplateRef<InstanceType<typeof QueryableTable>>('queryableTable');
const reloadTable = function () {
  queryableTable.value?.reloadTable();
};
</script>

<template>
  <Page auto-content-height>
    <QueryableTable
      ref="queryableTable"
      :fields="fields"
      :http-query="RoleApi.query"
      :row-actions="rowActions"
    />
    <DrawerForm @update="reloadTable" />
  </Page>
</template>
