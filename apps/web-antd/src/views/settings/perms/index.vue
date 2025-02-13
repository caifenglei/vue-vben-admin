<script setup lang="ts">
import type { EntityField } from '#/components/types';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { PermissionApi } from '#/api';
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
    name: 'label',
    label: '权限名称',
    range: [false, true, true, false],
    component: 'Input',
    treeNode: true,
  },
  {
    name: 'name',
    label: '权限编码',
    range: [false, true, true, false],
    component: 'Input',
  },
  {
    name: 'type',
    label: '权限类型',
    range: [false, true, true, false],
    component: 'Select',
    props: {
      allowClear: true,
      options: [
        {
          label: '菜单',
          value: '1',
        },
        {
          label: '页面',
          value: '2',
        },
      ],
    },
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
const createDict = () => {
  formDrawerApi.setData({
    fields,
    title: '新增菜单权限',
  });
  formDrawerApi.open();
};
</script>

<template>
  <Page auto-content-height>
    <QueryableTable :fields="fields" :http-query="PermissionApi.query">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="createDict">
          新增菜单权限
        </Button>
      </template>
    </QueryableTable>
    <DrawerForm />
  </Page>
</template>
