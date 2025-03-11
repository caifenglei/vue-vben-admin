import type { VbenFormSchema } from '#/adapter/form';
import type { EntityField } from '#/components/types';

import { markRaw } from 'vue';

import ImageUploader from '#/components/ImageUploader.vue';
import { useDictStore } from '#/store/modules/dict';

export enum FieldPosition {
  DETAIL = 3,
  FORM = 2,
  Query = 0,
  TABLE = 1,
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
      case 'Input': {
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
          class: 'w-full',
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
