<script lang="ts" setup>
import type { ExtendedVxeGridApi } from '@vben/plugins/src/vxe-table/types';

import type { VbenFormProps } from '#/adapter/form';
import type { VxeGridProps } from '#/adapter/vxe-table';
import type { QueryableTableProps } from '#/components/types';

import { Page } from '@vben/common-ui';

import { message } from 'ant-design-vue';

import { useVbenVxeGrid } from '#/adapter/vxe-table';
import { getExampleTableApi } from '#/api';

interface Props extends QueryableTableProps {
  api: ExtendedVxeGridApi;
}
const props = withDefaults(defineProps<Props>(), {});

// table query fields
const queryFields = props.fields.filter((field) => field.range[0]);
const querySchema = queryFields.map((field) => {
  // eslint-disable-next-line unused-imports/no-unused-vars
  const { range, name, ...attrs } = field;
  attrs.fieldName = name;
  if (attrs.component === 'Input') {
    attrs.componentProps = {
      ...attrs.componentProps,
      placeholder: attrs.componentProps?.placeholder || `请输入${attrs.label}`,
      allowClear: true,
      maxlength: attrs.componentProps?.maxlength || 64,
      // showCount: true,
    };
  } else if (attrs.component === 'Select') {
    attrs.componentProps = {
      ...attrs.componentProps,
      allowClear: true,
      placeholder: attrs.componentProps?.placeholder || `请选择${attrs.label}`,
    };
  }
  return attrs;
});

// table columns
const tableFields = props.fields.filter((field) => field.range[1]);
const tableColumns = tableFields.map((field) => {
  return { field: field.name, title: field.label };
});

interface RowType {
  category: string;
  color: string;
  id: string;
  price: string;
  productName: string;
  releaseDate: string;
}

const formOptions: VbenFormProps = {
  // 默认展开
  collapsed: false,
  schema: querySchema,
  // [
  //   {
  //     component: 'Input',
  //     defaultValue: '1',
  //     fieldName: 'category',
  //     label: 'Category',
  //   },
  //   {
  //     component: 'Input',
  //     fieldName: 'productName',
  //     label: 'ProductName',
  //   },
  //   {
  //     component: 'Input',
  //     fieldName: 'price',
  //     label: 'Price',
  //   },
  //   {
  //     component: 'Select',
  //     componentProps: {
  //       allowClear: true,
  //       options: [
  //         {
  //           label: 'Color1',
  //           value: '1',
  //         },
  //         {
  //           label: 'Color2',
  //           value: '2',
  //         },
  //       ],
  //       placeholder: '请选择',
  //     },
  //     fieldName: 'color',
  //     label: 'Color',
  //   },
  //   {
  //     component: 'DatePicker',
  //     fieldName: 'datePicker',
  //     label: 'Date',
  //   },
  // ],
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
    // { field: 'category', title: 'Category' },
    // { field: 'color', title: 'Color' },
    // { field: 'productName', title: 'Product Name' },
    // { field: 'price', title: 'Price' },
    // { field: 'releaseDate', formatter: 'formatDateTime', title: 'Date' },
  ],
  height: 'auto',
  keepSource: true,
  pagerConfig: {},
  proxyConfig: {
    ajax: {
      query: async ({ page }, formValues) => {
        message.success(`Query params: ${JSON.stringify(formValues)}`);
        return await getExampleTableApi({
          page: page.currentPage,
          pageSize: page.pageSize,
          ...formValues,
        });
      },
    },
  },
};

const [Grid] = useVbenVxeGrid({ formOptions, gridOptions });
</script>

<template>
  <Page auto-content-height>
    <Grid />
  </Page>
</template>
