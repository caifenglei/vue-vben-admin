import type { EntityField } from '#/components/types';

import { useDictStore } from '#/store/modules/dict';

enum FieldPosition {
  DETAIL = 3,
  FORM = 2,
  Query = 0,
  TABLE = 1,
}

export function useDetailField(
  fields: EntityField[],
  values: Record<string, any>,
) {
  const detailFields = fields.filter(
    (field) => field.range[FieldPosition.DETAIL],
  );
  const details: Record<string, any>[] = detailFields.map((field) => {
    const { component, name, ...attrs } = field;
    const record: Record<string, any> = {
      component,
      label: attrs.label,
    };
    switch (component) {
      case 'ApiSelect': {
        const option = field.optionRender(values[field.relationship]);
        record.value = option.label;
        break;
      }
      case 'RadioGroup':
      case 'Select': {
        const options = useDictStore().getDict(attrs?.dictName)?.children;
        const value = values[name];
        record.value = options?.find(
          (opt: any) => opt.code === value.toString(),
        )?.label;
        break;
      }
      case 'Upload': {
        record.value = values.media; // TODO 默认取media
        break;
      }
      default: {
        record.value = values[name];
        break;
      }
    }
    return record;
  });
  return details;
}
