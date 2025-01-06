import { requestClient } from '#/api/request';

export namespace TableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

/**
 * 获取表格数据
 */
export async function getList(params: TableApi.PageFetchParams) {
  return requestClient.get('/table/list', { params });
}

// export { getExampleTableApi };
