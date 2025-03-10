<script setup lang="ts">
import type { UploadChangeParam, UploadProps } from 'ant-design-vue';

import { ref } from 'vue';

import { useAppConfig } from '@vben/hooks';
import { MdiCreate } from '@vben/icons';
import { useAccessStore } from '@vben/stores';

import { VbenIcon } from '@vben-core/shadcn-ui';

import { message, Modal, Upload } from 'ant-design-vue';

// const props = defineProps({
//   name: {
//     type: String,
//     default: '',
//   },
// });

const { apiURL } = useAppConfig(import.meta.env, import.meta.env.PROD);

const uploadAction = `${apiURL}/v2/spa/image/upload`;
const accessStore = useAccessStore();
const uploadHeaders = {
  Authorization: `Bearer ${accessStore.accessToken}`,
};
const fileList = defineModel({ default: [] });
const uploading = ref<boolean>(false);
const imageUrl = ref<string>('');

const previewVisible = ref<boolean>(false);
const previewTitle = ref<string>('');
const previewImageSrc = ref<string>('');

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
  fileList.value = info.fileList.map((file) => {
    return { ...file, ...file.response?.data };
  });
};

function getBase64(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onload = () => resolve(reader.result);
    // eslint-disable-next-line unicorn/prefer-add-event-listener
    reader.onerror = (error) => reject(error);
  });
}

const handlePreview = async (file: UploadProps['fileList'][number]) => {
  if (!file.url && !file.preview) {
    file.preview = (await getBase64(file.originFileObj)) as string;
  }
  previewImageSrc.value = file.url || file.preview;
  previewVisible.value = true;
  previewTitle.value =
    file.name || file.url.slice(Math.max(0, file.url.lastIndexOf('/') + 1));
};

const cancelPreview = () => {
  previewVisible.value = false;
  previewTitle.value = '';
};
</script>

<template>
  <div>
    <Upload
      v-model:file-list="fileList"
      name="image"
      list-type="picture-card"
      class="avatar-uploader"
      show-upload-list
      :action="uploadAction"
      :headers="uploadHeaders"
      :before-upload="beforeUpload"
      @change="handleChange"
      @preview="handlePreview"
    >
      <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
      <div v-else>
        <VbenIcon v-if="uploading" icon="lucide:area-chart" />
        <MdiCreate v-else />
        <div class="ant-upload-text">上传图片</div>
      </div>
    </Upload>
    <Modal
      :title="previewTitle"
      :footer="null"
      :open="previewVisible"
      @cancel="cancelPreview"
    >
      <img alt="example" style="width: 100%" :src="previewImageSrc" />
    </Modal>
  </div>
</template>

<style scoped></style>
