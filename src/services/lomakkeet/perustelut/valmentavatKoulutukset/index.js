import getDefaultRemovalForm from "../lomakeosiot/poistolomake";
import { curriedGetAnchorPartsByIndex } from "../../../../utils/common";
import { isAdded, isRemoved, isInLupa } from "../../../../css/label";
import "../../i18n-config";
import { __ } from "i18n-for-browser";
import * as R from "ramda";

function getAdditionForm(
  koulutusdata,
  kohde,
  maaraystyyppi,
  changeObjectsPage1,
  isReadOnly
) {
  const getAnchorPartsByIndex = curriedGetAnchorPartsByIndex(
    changeObjectsPage1
  );
  const categories = R.map(item => {
    let structure = null;
    if (R.includes(item.code, getAnchorPartsByIndex(1))) {
      structure = {
        anchor: item.code,
        components: [
          {
            anchor: "A",
            name: "StatusTextRow",
            properties: {
              name: "StatusTextRow",
              code: item.code,
              title: item.title,
              labelStyles: {
                addition: isAdded,
                removal: isRemoved,
                custom: Object({}, item.isInLupa ? isInLupa : {})
              }
            }
          }
        ],
        meta: {
          kohde,
          maaraystyyppi,
          isInLupa: item.isInLupa,
          koodisto: item.koodisto,
          metadata: item.metadata
        },
        categories: [
          {
            anchor: "vapaa-tekstikentta",
            components: [
              {
                anchor: "A",
                name: "TextBox",
                properties: {
                  isReadOnly,
                  placeholder: "Perustelut...",
                  title: __("reasoning.title.default"),
                  value: ""
                }
              }
            ]
          }
        ]
      };
    }
    return structure;
  }, R.values(koulutusdata.items));
  return categories.filter(Boolean);
}

export default function getValmentavatKoulutuksetPerustelulomake(
  action,
  data,
  isReadOnly,
  prefix
) {
  switch (action) {
    case "addition":
      return getAdditionForm(
        data.koulutusdata,
        data.kohde,
        data.maaraystyyppi,
        data.changeObjectsPage1,
        isReadOnly
      );
    case "removal":
      return getDefaultRemovalForm(prefix);
    default:
      return [];
  }
}
