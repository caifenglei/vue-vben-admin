<script lang="ts" setup>
import { useVbenForm } from '#/adapter/form';
import { FieldPosition, useFormField } from '#/composables/use-form-field';
import { useVbenDrawer } from '@vben/common-ui';
import { ref } from 'vue';

defineOptions({
  name: 'DrawableForm',
});

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
    await formApi.submitForm();
    drawerApi.close();
  },
  onOpenChange(isOpen: boolean) {
    if (isOpen) {
      const { fields, title } = drawerApi.getData<Record<string, any>>();
      formApi.setState({ schema: useFormField(fields, FieldPosition.FORM) });
      drawerTitle.value = title;
    }
  },
  title: drawerTitle,
});
</script>
<template>
  <Drawer>
    <Form />
  </Drawer>
</template>
