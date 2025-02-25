import type { TableApi } from '#/api';

// 表字段属性
export interface EntityField {
  name: string;
  label: string;
  component: string;
  // ComponentProps
  props?: any;
  dictName?: string;
  // [query, table, form, detail]
  range: [boolean, boolean, boolean, boolean];
  width?: string;
  align?: string;
  sortable?: boolean;
  treeNode?: boolean; // 树形控制节点
  formatter?: (row: any, column: any, cellValue: any, index: number) => any;
}

// 表操作属性
export interface TableAction {
  icon: any; // DefinedComponent
  text: string;
  disabled?: () => any | boolean;
  handle: (action: TableAction) => any;
  popConfirm?: {
    cancelText?: string;
    confirmText?: string;
    title: string;
  };
}

// 表行操作属性
export interface TableRowAction {
  icon: any; // DefinedComponent
  text: string;
  disabled?: (row: any) => any | boolean;
  handle: (row: any, action: TableRowAction) => any;
  popConfirm?: {
    cancelText?: string;
    confirmText?: string;
    title: string;
  };
}

// 搜索表格属性
export interface QueryableTableProps {
  entity?: string;
  fields: EntityField[];
  tableActions?: TableAction[];
  rowActions?: TableRowAction[];
  httpQuery: (params: TableApi.PageFetchParams) => Promise<any>;
  onQueryChange?: (query: any) => void;
}

// 表操作组属性
export interface TableActionProps {
  actions: TableAction[];
}

// 表的行操作组属性
export interface TableRowActionProps {
  actions: TableRowAction[];
  row: any;
}
