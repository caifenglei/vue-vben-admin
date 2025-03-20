export namespace TableApi {
  export interface PageFetchParams {
    [key: string]: any;
    page?: number;
    pageSize?: number;
  }
}

export * from './auth';
export * as DeviceApi from './device';
export * as DictApi from './dict';
export * from './menu';
export * as ModelApi from './model';
export * as PermissionApi from './permission';
export * as RoleApi from './role';
export * from './table';
export * as UserApi from './user';
