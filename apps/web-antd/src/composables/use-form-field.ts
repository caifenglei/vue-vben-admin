import type { VbenFormSchema } from '#/adapter/form';
import type { EntityField } from '#/components/types';

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
    if (component === 'Input') {
      schema.componentProps = {
        ...attrs.props,
        placeholder: attrs.props?.placeholder || `请输入${attrs.label}`,
        allowClear: true,
        maxlength: attrs.props?.maxlength || 64,
        showCount: true,
      };
    } else if (component === 'Select') {
      schema.componentProps = {
        ...attrs.props,
        allowClear: true,
        placeholder: attrs.props?.placeholder || `请选择${attrs.label}`,
      };
    }
    return schema;
  });
  return formSchema;
}
