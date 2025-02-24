import type { TableApi } from '#/api';

import { requestClient } from '#/api/request';
/**
 * 获取表格数据
 */
export async function query(params: TableApi.PageFetchParams) {
  return requestClient.get('v2/mp/roles', { params });
}

export async function update(rowData: Record<string, any>) {
  return requestClient.post(`v2/mp/roles/${rowData.id}`, rowData);
}
