import getDefaultRemovalForm from "./lomakeosiot/poistolomake";
import { getAdditionForm } from "./kuljettajakoulutukset/jatkokoulutus";

export default function getKuljettajienJatkokoulutuslomake(
  action,
  data,
  isReadOnly,
  locale
) {
  console.info(action, data, isReadOnly, locale);
  switch (action) {
    case "addition":
      return getAdditionForm(isReadOnly, locale);
    case "removal":
      return getDefaultRemovalForm();
    default:
      return [];
  }
}
