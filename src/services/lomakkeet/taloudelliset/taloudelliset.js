import { getAdditionForm } from "./TaloudellisetYleisettiedot";

export function getTaloudellisetlomake(data, isReadOnly, locale) {
  return getAdditionForm(isReadOnly, locale, data);
}
