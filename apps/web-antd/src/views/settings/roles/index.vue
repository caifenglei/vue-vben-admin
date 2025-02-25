<script lang="ts" setup>
import type {
  EntityField,
  TableAction,
  TableRowAction,
} from '#/components/types';

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
    name: 'status',
    label: '状态',
    range: [true, true, true, true],
    component: 'Select',
    dictName: 'role_status',
  },
  {
    name: 'updated_at',
    label: '更新时间',
    range: [false, true, false, true],
    component: 'Input',
  },
];

const queryableTable =
  useTemplateRef<InstanceType<typeof QueryableTable>>('queryableTable');
const reloadTable = function () {
  queryableTable.value?.reloadTable();
};

const [DrawerForm, formDrawerApi] = useVbenDrawer({
  connectedComponent: DrawableForm,
});

const createRow = (action: TableAction) => {
  formDrawerApi.setData({
    api: RoleApi.create,
    fields,
    row: { status: '1' },
    title: action.text,
  });
  formDrawerApi.open();
};

const editRow = (row: any, action: TableRowAction) => {
  formDrawerApi.setData({
    api: RoleApi.update,
    row,
    fields,
    title: action.text,
  });
  formDrawerApi.open();
};

const tableActions: TableAction[] = [
  {
    icon: MdiEdit,
    text: '创建新角色',
    handle: createRow,
  },
];

const rowActions: TableRowAction[] = [
  {
    icon: MdiEdit,
    text: '编辑',
    handle: editRow,
  },
  {
    icon: MdiDelete,
    text: '删除',
    handle: (row: any, _action: TableRowAction) => {
      RoleApi.destroy(row).then((_: any) => {
        reloadTable(); // TODO delete row length
      });
    },
    popConfirm: {
      title: '确定删除吗？',
    },
  },
];
</script>

<template>
  <Page auto-content-height>
    <QueryableTable
      ref="queryableTable"
      :fields="fields"
      :http-query="RoleApi.query"
      :table-actions="tableActions"
      :row-actions="rowActions"
    />
    <DrawerForm @update="reloadTable" />
  </Page>
</template>
