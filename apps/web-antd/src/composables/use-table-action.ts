import type {
  EntityField,
  TableAction,
  TableRowAction,
} from '#/components/types';

import { useVbenDrawer } from '@vben/common-ui';
import { MdiCreate, MdiDelete, MdiEdit } from '@vben/icons';

import DrawableForm from '#/components/DrawableForm.vue';

export interface TableActionProps {
  tableRef: any;
  httpApis: any; // 接口集
  fields: EntityField[];
  createAction?: {
    defaultData?: Record<string, any>;
    label: string;
  };
}
// 表级操作
export function useTableAction(props: TableActionProps) {
  const queryableTable = props.tableRef;
  const reloadTable = function () {
    queryableTable.value?.reloadTable();
  };

  const [DrawerForm, formDrawerApi] = useVbenDrawer({
    connectedComponent: DrawableForm,
  });

  const createRow = (action: TableAction) => {
    formDrawerApi.setData({
      api: props.httpApis.create,
      fields: props.fields,
      row: props.createAction?.defaultData ?? {},
      title: action.text,
    });
    formDrawerApi.open();
  };

  const editRow = (row: any, action: TableRowAction) => {
    formDrawerApi.setData({
      api: props.httpApis.update,
      row,
      fields: props.fields,
      title: action.text,
    });
    formDrawerApi.open();
  };

  const tableActions: TableAction[] = [
    {
      icon: MdiCreate,
      text: props.createAction?.label ?? '新增',
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
        props.httpApis.destroy(row).then((_: any) => {
          reloadTable(); // TODO delete row length
        });
      },
      popConfirm: {
        title: '确定删除吗？',
      },
    },
    // {
    //   icon: MdiDelete,
    //   text: '分配权限',
    //   handle: (row: any, _action: TableRowAction) => {
    //     props.httpApis.destroy(row).then((_: any) => {
    //       reloadTable(); // TODO delete row length
    //     });
    //   },
    // },
  ];

  return {
    tableActions,
    rowActions,
    DrawerForm,
    reloadTable,
  };
}
