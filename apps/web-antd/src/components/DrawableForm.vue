<script lang="ts" setup>
import { ref } from 'vue';

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

const drawerTitle = ref('');
const [Drawer, drawerApi] = useVbenDrawer({
  onCancel() {
    drawerApi.close();
  },
  onConfirm: async () => {
    const values = await formApi.getValues();
    const { api } = drawerApi.getData<Record<string, any>>();
    await api(values);
    emit('update', values);
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { row, fields, title } = drawerApi.getData<Record<string, any>>();
      formApi.setState({ schema: useFormField(fields, FieldPosition.FORM) });
      formApi.setValues(row, false);
      drawerTitle.value = title;
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
