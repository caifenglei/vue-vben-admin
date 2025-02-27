<script setup lang="ts">
import type { TreeNode } from '#/utils/tree';

import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import { TabPane, Tabs, Tree } from 'ant-design-vue';

import { buildTree } from '#/utils/tree';

const activeTab = ref('perms');
const permsTreeData = ref<TreeNode[]>([]);
const checkedPerms = ref<string[]>([]);
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  // onConfirm: async () => {
  //   formApi
  //     .validateAndSubmitForm()
  //     .then(async (res: Record<string, any> | undefined) => {
  //       if (res) {
  //         const { api } = drawerApi.getData<Record<string, any>>();
  //         await api(res);
  //         emit('update', res);
  //         drawerApi.close();
  //       }
  //     });
  // },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { httpApis, row } = drawerApi.getData<Record<string, any>>();
      httpApis.allPermissions().then((res: Record<string, any>) => {
        permsTreeData.value = buildTree(res.data);
        httpApis.get(row).then((res: Record<string, any>) => {
          // permsTreeData.value = buildTree(res.permissions);
          checkedPerms.value = res.permissions.map(
            (item: Record<string, any>) => item.id,
          );
        });
      });

      // // 绘制表单
      // formApi.setState({ schema: useFormField(fields, FieldPosition.FORM) });
      // // 将row数据转为字符串类型
      // const data = {} as Record<string, any>;
      // for (const [key, value] of Object.entries(row)) {
      //   data[key] = Number.isNaN(value) ? value : `${value}`;
      // }
      // formApi.setValues(data, false);
      // 设置抽屉标题
      drawerApi.setState({ title: `${row.label} - 角色分配` });
    }
  },
});
</script>

<template>
  <Drawer append-to-main>
    <Tabs v-model:active-key="activeTab">
      <TabPane key="perms" tab="角色具备的权限">
        <Tree
          v-if="permsTreeData.length > 0"
          checkable
          default-expand-all
          v-model:checked-keys="checkedPerms"
          :tree-data="permsTreeData"
          :field-names="{ key: 'id', title: 'label' }"
        >
          <template #title="{ data }">
            <span class="pl-1" :title="data.name">{{ data.label }}</span>
          </template>
        </Tree>
      </TabPane>
      <TabPane key="roles" tab="拥有角色的用户"> 用户列表 </TabPane>
    </Tabs>
  </Drawer>
</template>
