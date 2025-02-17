import { defineStore } from 'pinia';

import { query } from '#/api';

export const useDictStore = defineStore('dict-tree', {
  state: () => ({
    dicts: [],
  }),
  actions: {
    async setDicts() {
      this.dicts = await query({ format: 'tree' });
    },
    getDict(name: string) {
      return this.dicts.find((d) => d.code === name);
    },
  },
});
