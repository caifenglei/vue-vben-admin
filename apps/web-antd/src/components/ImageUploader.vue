<script setup lang="ts">
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

import { ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { MdiCreate } from '@vben/icons';

import { message, Upload } from 'ant-design-vue';

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
});

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const uploadAction = `${apiURL}/v2/spa/image/upload`;

const fileList = defineModel({ default: [] });
const uploading = ref<boolean>(false);
const imageUrl = ref<string>('');

const beforeUpload = (file: UploadProps['fileList'][number]) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Image must smaller than 2MB!');
  }
  return isJpgOrPng && isLt2M;
};

const handleChange = (info: UploadChangeParam) => {
  if (info.file.status === 'uploading') {
    uploading.value = true;
    return;
  }
  if (info.file.status === 'done') {
    // Get this url from response in real world.
    console.error(info, 'uploaded info ...');
    // getBase64(info.file.originFileObj, (base64Url: string) => {
    //   imageUrl.value = base64Url;
    uploading.value = false;
    // });
  }
  if (info.file.status === 'error') {
    uploading.value = false;
    message.error('upload error');
  }
};
</script>

<template>
  <Upload
    v-model:file-list="fileList"
    :name="props.name"
    list-type="picture-card"
    class="avatar-uploader"
    :show-upload-list="false"
    :action="uploadAction"
    :before-upload="beforeUpload"
    @change="handleChange"
  >
    <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
    <div v-else>
      <loading-outlined v-if="uploading" />
      <MdiCreate v-else />
      <div class="ant-upload-text">上传图片</div>
    </div>
  </Upload>
</template>

<style scoped></style>
