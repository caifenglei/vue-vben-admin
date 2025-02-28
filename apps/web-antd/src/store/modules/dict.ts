import { defineStore } from 'pinia';

import { DictApi } from '#/api';

export interface DictItem {
  id: number;
  code: string;
  label: string;
  parent_id: number;
  sort: number;
  status: number;
  updated_at: string;
  children: DictItem[];
}
export const useDictStore = defineStore('dict-tree', {
  state: () => ({
    dicts: [] as DictItem[],
  }),
  actions: {
    async setDicts() {
      this.dicts = await DictApi.query({ format: 'tree' });
    },
    getDict(name: string): DictItem | undefined {
      return this.dicts.find((d) => d.code === name);
    },
  },
});
