<script setup lang="ts">
import type { TableRowActionProps } from '#/components/types';

import { Button } from 'ant-design-vue';

const props = withDefaults(defineProps<TableRowActionProps>(), {});
</script>

<template>
  <div>
    <Button
      v-for="(action, index) in props.actions"
      type="link"
      :key="index"
      @click="() => action.handle(props.row, action)"
    >
      <template #icon>
        <component :is="action.icon" />
      </template>
      {{ action.text }}
    </Button>
  </div>
</template>

<style scoped></style>
