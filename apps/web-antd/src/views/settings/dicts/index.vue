<script setup lang="ts">
import type { EntityField } from '#/components/types';

import { Page, useVbenDrawer } from '@vben/common-ui';

import { Button } from 'ant-design-vue';

import { query } from '#/api';
import DrawableForm from '#/components/DrawableForm.vue';
import QueryableTable from '#/components/QueryableTable.vue';

// interface DataItem {
//   label: string;
//   value: string;
//   children: DataItem[];
// }

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

const [DrawerForm, formDrawerApi] = useVbenDrawer({
  connectedComponent: DrawableForm,
});
const createDict = () => {
  formDrawerApi.setData({
    fields,
    title: '新增字典',
  });
  formDrawerApi.open();
};
</script>

<template>
  <Page auto-content-height>
    <QueryableTable :fields="fields" :http-query="query">
      <template #toolbar-tools>
        <Button class="mr-2" type="primary" @click="createDict">
          新增字典
        </Button>
      </template>
    </QueryableTable>
    <DrawerForm />
  </Page>
</template>
