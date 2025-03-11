import type { VbenFormSchema } from '#/adapter/form';
import type { EntityField } from '#/components/types';

import { markRaw, ref } from 'vue';

import { useDebounceFn } from '@vueuse/core';

import ImageUploader from '#/components/ImageUploader.vue';
import { useDictStore } from '#/store/modules/dict';

const fetching = ref(false);
const keyword = ref('');

export enum FieldPosition {
  DETAIL = 3,
  FORM = 2,
  Query = 0,
  TABLE = 1,
}

function fetchRemoteOptions(
  { keyword = '' }: Record<string, any>,
  api: any,
  optionRender,
) {
  fetching.value = true;
  return new Promise((resolve) => {
    api({ keyword }).then((res: any) => {
      const options = res.data.map((item) => optionRender(item));
      resolve(options);
    });
  });
}

export function useFormField(fields: EntityField[], type: FieldPosition) {
  const schemaFields = fields.filter((field) => field.range[type]);
  const formSchema: VbenFormSchema[] = schemaFields.map((field) => {
    const { component, name, ...attrs } = field;
    const schema: VbenFormSchema = {
      component,
      // defaultValue: attrs.defaultValue,
      fieldName: name,
      label: attrs.label,
      // rules: attrs.rules,
    };
    if (type === FieldPosition.FORM) {
      schema.rules = attrs.rules;
    }
    switch (component) {
      case 'ApiSelect': {
        schema.componentProps = () => {
          return {
            api: (params) =>
              fetchRemoteOptions(params, attrs.api, attrs.optionRender),
            // 禁止本地过滤
            filterOption: false,
            // 如果正在获取数据，使用插槽显示一个loading
            notFoundContent: fetching.value ? undefined : null,
            // 搜索词变化时记录下来， 使用useDebounceFn防抖。
            onSearch: useDebounceFn((value: string) => {
              keyword.value = value;
            }, 300),
            // 远程搜索参数。当搜索词变化时，params也会更新
            params: {
              keyword: keyword.value || undefined,
            },
            showSearch: true,
          };
        };
        break;
      }
      case 'Divider': {
        schema.hideLabel = true;
        break;
      }
      case 'Input':
      case 'Textarea': {
        schema.componentProps = {
          ...attrs.props,
          placeholder: attrs.props?.placeholder || `请输入${attrs.label}`,
          allowClear: true,
          maxlength: attrs.props?.maxlength || 64,
          showCount: true,
        };
        break;
      }
      case 'RadioGroup': {
        const options = getDictOptions(attrs.dictName);
        schema.componentProps = {
          ...attrs.props,
          options,
        };
        break;
      }
      case 'Select': {
        const options = getDictOptions(attrs.dictName);
        schema.componentProps = {
          ...attrs.props,
          options,
          allowClear: true,
          placeholder: attrs.props?.placeholder || `请选择${attrs.label}`,
        };
        break;
      }
      case 'Upload': {
        schema.component = markRaw(ImageUploader);
        schema.componentProps = {
          ...attrs.props,
          name,
        };

        break;
      }
      // No default
    }
    return schema;
  });
  return formSchema;
}

function getDictOptions(dictCode: string) {
  let options = [] as any[];
  if (dictCode) {
    const dictStore = useDictStore();
    options =
      dictStore.getDict(dictCode)?.children.map((item: any) => ({
        label: item.label,
        value: item.code,
      })) || [];
  }
  return options;
}
