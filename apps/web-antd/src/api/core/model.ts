import type { TableApi } from '#/api';

import { requestClient } from '#/api/request';
/**
 * 获取表格数据
 */
export async function query(params: TableApi.PageFetchParams) {
  return requestClient.get('v2/spa/models', { params });
}

export async function create(rowData: Record<string, any>) {
  return requestClient.post(`v2/spa/models`, rowData);
}

export async function get(rowData: Record<string, any>) {
  return requestClient.get(`v2/spa/models/${rowData.id}`);
}

export async function update(rowData: Record<string, any>) {
  return requestClient.put(`v2/spa/models/${rowData.id}`, rowData);
}

export async function destroy(rowData: Record<string, any>) {
  return requestClient.delete(`v2/spa/models/${rowData.id}`);
}
