<script lang="ts" setup>
import type { VbenFormProps, VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { QueryableTableProps as Props } from '#/components/types';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { FieldPosition, useFormField } from '#/composables/use-form-field';

const props = withDefaults(defineProps<Props>(), {});

// table query fields
const querySchema: VbenFormSchema[] = useFormField(
  props.fields,
  FieldPosition.Query,
);

// table columns
const tableFields = props.fields.filter((field) => field.range[1]);
const tableColumns = tableFields.map((field) => {
  return {
    field: field.name,
    title: field.label,
    treeNode: field.treeNode || false,
  };
});

interface RowType {
  label: string;
  code: string;
  updated_at: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: querySchema,
  // 控制表单是否显示折叠按钮
  showCollapseButton: true,
  // 按下回车时是否提交表单
  submitOnEnter: false,
};

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    labelField: 'name',
  },
  columns: [
    { align: 'left', title: '', type: 'checkbox', width: 50 },
    { title: '序号', type: 'seq', width: 50 },
    ...tableColumns,
    // { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await props.httpQuery({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
  treeConfig: {
    parentField: 'parent_id',
    // childrenField: 'children',
    rowField: 'id',
    transform: true,
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <slot name="toolbar-tools"></slot>
    </template>
  </Grid>
</template>
