export const removeUndefined = <S>(value: S | undefined): value is S =>
  value !== undefined;
