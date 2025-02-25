<script lang="ts" setup>
import { useVbenDrawer } from '@vben/common-ui';

import { useVbenForm } from '#/adapter/form';
import { FieldPosition, useFormField } from '#/composables/use-form-field';

defineOptions({
  name: 'DrawableForm',
});

const emit = defineEmits(['update']);

const [Form, formApi] = useVbenForm({
  // schema: formSchema,
  showDefaultActions: false,
});

const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    formApi
      .validateAndSubmitForm()
      .then(async (res: Record<string, any> | undefined) => {
        if (res) {
          const { api } = drawerApi.getData<Record<string, any>>();
          await api(res);
          emit('update', res);
          drawerApi.close();
        }
      });
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { row, fields, title } = drawerApi.getData<Record<string, any>>();
      // 绘制表单
      formApi.setState({ schema: useFormField(fields, FieldPosition.FORM) });
      // 将row数据转为字符串类型
      const data = {} as Record<string, any>;
      for (const [key, value] of Object.entries(row)) {
        data[key] = Number.isNaN(value) ? value : `${value}`;
      }
      formApi.setValues(data, false);
      // 设置抽屉标题
      drawerApi.setState({ title });
    }
  },
});
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
