export namespace TableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page: number;
    pageSize: number;
  }
}

export * from './auth';
export * from './dict';
export * from './menu';
export * from './table';
export * from './user';
