import type { TableApi } from '#/api';

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

export interface TableRowAction {
  icon: any; // DefinedComponent
  text: string;
  disabled?: (row: any) => any | boolean;
  handle?: (row: any, action: TableRowAction) => any;
}

export interface QueryableTableProps {
  entity?: string;
  fields: EntityField[];
  rowActions?: TableRowAction[];
  httpQuery: (params: TableApi.PageFetchParams) => Promise<any>;
  onQueryChange?: (query: any) => void;
}

export interface TableRowActionProps {
  actions: TableRowAction[];
  row: any;
}
