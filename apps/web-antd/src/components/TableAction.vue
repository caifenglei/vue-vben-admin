<script setup lang="ts">
import type { TableActionProps } from '#/components/types';

import { Button, Divider, Popconfirm } from 'ant-design-vue';

const props = withDefaults(defineProps<TableActionProps>(), {});
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
        @confirm="() => action.handle(action)"
      >
        <Button type="primary" :key="index">
          <template #icon>
            <component :is="action.icon" />
          </template>
          {{ action.text }}
        </Button>
      </Popconfirm>
      <Button
        v-else
        :key="index"
        type="primary"
        @click="() => action.handle(action)"
      >
        <template #icon>
          <component :is="action.icon" />
        </template>
        {{ action.text }}
      </Button>
    </template>
  </div>
</template>

<style scoped></style>
