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
export * as PermissionApi from './permission';
export * as RoleApi from './role';
export * from './table';
export * from './user';
