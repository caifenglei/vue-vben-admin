<script setup lang="ts">
import type { TableRowActionProps } from '#/components/types';

import { VbenIcon } from '@vben-core/shadcn-ui';

import { Button, Divider, Popconfirm } from 'ant-design-vue';

const props = withDefaults(defineProps<TableRowActionProps>(), {});
</script>

<template>
  <div>
    <template v-for="(action, index) in props.actions">
      <Divider v-if="index !== 0" :key="`divider-${index}`" type="vertical" />
      <Popconfirm
        v-if="action.popConfirm"
        :key="`pop-confirm-${index}`"
        :title="action.popConfirm.title"
        :ok-text="action.popConfirm.confirmText || '确定'"
        :cancel-text="action.popConfirm.confirmText || '取消'"
        @confirm="() => action.handle(props.row, action)"
      >
        <Button type="link" :key="index">
          <template #icon>
            <!--            <component :is="action.icon" />-->
            <VbenIcon :icon="action.icon" />
          </template>
          {{ action.text }}
        </Button>
      </Popconfirm>
      <Button
        v-else
        :key="index"
        type="link"
        @click="() => action.handle(props.row, action)"
      >
        <template #icon>
          <VbenIcon :icon="action.icon" />
        </template>
        {{ action.text }}
      </Button>
    </template>
  </div>
</template>

<style scoped></style>
