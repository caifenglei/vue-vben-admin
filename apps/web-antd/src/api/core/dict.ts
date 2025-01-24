import type { TableApi } from '#/api';

import { createRequestClient } from '#/api/request';

// export namespace TableApi {
//   export interface PageFetchParams {
//     [key: string]: any;
//     page: number;
//     pageSize: number;
//   }
// }

/**
 * 获取表格数据
 */
export async function query(params: TableApi.PageFetchParams) {
  return createRequestClient('/iapi').get('/mp/dicts/list', { params });
}

// export { getExampleTableApi };
