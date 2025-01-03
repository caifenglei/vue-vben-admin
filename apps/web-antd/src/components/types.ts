export interface EntityField {
  name: string;
  label: string;
  range: [boolean, boolean, boolean, boolean]; // [query, table, form, detail]
  type?: string;
  width?: string;
  align?: string;
  sortable?: boolean;
  formatter?: (row: any, column: any, cellValue: any, index: number) => any;
}

export interface QueryableTableProps {
  entity?: string;
  fields: EntityField[];
  onQueryChange?: (query: any) => void;
}
