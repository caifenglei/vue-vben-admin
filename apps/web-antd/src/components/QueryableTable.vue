<script lang="ts" setup>
import type { VbenFormProps, VbenFormSchema } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { QueryableTableProps as Props } from '#/components/types';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import TableRowAction from '#/components/TableRowAction.vue';
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
  const col = {
    field: field.name,
    title: field.label,
    treeNode: field.treeNode || false,
  };
  if (field.component === 'Select') {
    col.cellRender = { name: 'DictLabel', props: { dictName: field.dictName } };
  }
  return col;
});

interface RowType {
  // label: string;
  // code: string;
  // type: string;
  // updated_at: string;
  [key: string]: any;
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

const columns = [
  { align: 'left', title: '', type: 'checkbox', width: 50 },
  { title: '序号', type: 'seq', width: 80 },
  ...tableColumns,
];

if (props.rowActions?.length > 0) {
  columns.push({
    slots: { default: 'actions' },
    title: '操作',
  });
}

const gridOptions: VxeGridProps<RowType> = {
  checkboxConfig: {
    highlight: true,
    // labelField: 'name',
  },
  columns,
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    response: {
      total: 'total',
      list: 'data',
      result: 'data', // 默认为 result, 取数据的key
    },
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

const [Grid, gridApi] = useVbenVxeGrid({ formOptions, gridOptions });

const reloadTable = function () {
  gridApi.reload();
};
defineExpose({
  reloadTable,
});
</script>

<template>
  <Grid>
    <template #toolbar-tools>
      <slot name="toolbar-tools"></slot>
    </template>
    <template #actions="{ row }">
      <TableRowAction :actions="props.rowActions" :row="row" />
    </template>
  </Grid>
</template>
