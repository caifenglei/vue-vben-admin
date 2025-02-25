import type { VbenFormSchema } from '#/adapter/form';
import type { EntityField } from '#/components/types';

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
    if (component === 'Input') {
      schema.componentProps = {
        ...attrs.props,
        placeholder: attrs.props?.placeholder || `请输入${attrs.label}`,
        allowClear: true,
        maxlength: attrs.props?.maxlength || 64,
        showCount: true,
      };
    } else if (component === 'Select') {
      let options = [] as any[];
      if (attrs.dictName) {
        const dictStore = useDictStore();
        options =
          dictStore.getDict(attrs.dictName)?.children.map((item: any) => ({
            label: item.label,
            value: item.code,
          })) || [];
      }
      schema.componentProps = {
        ...attrs.props,
        options,
        allowClear: true,
        placeholder: attrs.props?.placeholder || `请选择${attrs.label}`,
        class: 'w-full',
      };
    }
    return schema;
  });
  return formSchema;
}
