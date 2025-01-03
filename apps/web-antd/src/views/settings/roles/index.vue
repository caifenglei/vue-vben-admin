<script lang="ts" setup>
import type { EntityField } from '#/components/types';

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
    name: 'type',
    label: '类型',
    range: [false, true, true, true],
    component: 'Select',
    componentProps: {
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
];
</script>

<template>
  <QueryableTable :fields="fields" />
</template>
