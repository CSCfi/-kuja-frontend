import { getForm } from "./TaloudellisetYleisettiedot";

export function getTaloudellisetlomake(data, isReadOnly) {
  return getForm(isReadOnly);
}
