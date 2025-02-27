import type { TableApi } from '#/api';

import { requestClient } from '#/api/request';
/**
 * 获取表格数据
 */
export async function query(params: TableApi.PageFetchParams) {
  return requestClient.get('v2/mp/roles', { params });
}

export async function create(rowData: Record<string, any>) {
  return requestClient.post(`v2/mp/roles`, rowData);
}

export async function get(rowData: Record<string, any>) {
  return requestClient.get(`v2/mp/roles/${rowData.id}`, rowData);
}

export async function update(rowData: Record<string, any>) {
  return requestClient.post(`v2/mp/roles/${rowData.id}`, rowData);
}

export async function destroy(rowData: Record<string, any>) {
  return requestClient.post(`v2/mp/roles_del`, { ids: [rowData.id] });
}

export async function allPermissions() {
  const params: Record<string, any> = {
    page_size: 10_000,
  };
  return requestClient.get(`v2/mp/permissions`, params);
}
