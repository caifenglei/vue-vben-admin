<script lang="ts" setup>
import { ref } from 'vue';

import { useVbenDrawer } from '@vben/common-ui';

import {
  Descriptions,
  DescriptionsItem,
  Image,
  ImagePreviewGroup,
} from 'ant-design-vue';

import { useDetailField } from '#/composables/use-detail-field';

defineOptions({
  name: 'DrawableDetail',
});

const fieldDetails = ref([]);

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {},
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { row, fields, title } = drawerApi.getData<Record<string, any>>();
      fieldDetails.value = useDetailField(fields, row);
      // 设置抽屉标题
      drawerApi.setState({ title });
    }
  },
});
</script>
<template>
  <Drawer append-to-main>
    <Descriptions title="详细信息">
      <DescriptionsItem
        v-for="(d, i) in fieldDetails"
        :key="i"
        :label="d.label"
        :span="d.component === 'Upload' ? 3 : 1"
      >
        <ImagePreviewGroup v-if="d.component === 'Upload'">
          <Image
            v-for="(img, j) in d.value"
            :key="j"
            :src="img.original_url"
            :width="160"
          />
        </ImagePreviewGroup>
        <span v-else>{{ d.value }}</span>
      </DescriptionsItem>
    </Descriptions>
  </Drawer>
</template>
