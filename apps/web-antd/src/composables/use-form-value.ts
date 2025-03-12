export function useFormValue(
  fields: EntityField[],
  values: Record<string, any>,
) {
  if (Object.values(values).length === 0) {
    return values;
  }
  const data = { ...values };
  fields.forEach((field: EntityField) => {
    const fieldName = field.name;
    if (field.component === 'Upload') {
      const vs = [];
      // TODO 默认了media作为key
      data.media?.forEach((item: any) => {
        vs.push({
          uid: item.uuid,
          name: item.file_name,
          url: item.original_url,
          status: 'done',
          path: '',
        });
      });
      data[fieldName] = vs;
    } else if (
      ['RadioGroup', 'Select'].includes(field.component) &&
      field.dictName
    ) {
      // field.optionRender(data[field.relationship]);
      // 将row数据转为字符串类型
      const value = data[fieldName];
      data[fieldName] = Number.isNaN(value) ? value : `${value}`;
    }
  });

  return data;
}
