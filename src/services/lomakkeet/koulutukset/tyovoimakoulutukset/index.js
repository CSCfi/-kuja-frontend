import { isAdded, isRemoved, isInLupa } from "../../../../css/label";
import { map } from "ramda";

function getModificationForm(kohde, koulutusdata, maaraystyyppi) {
  return map(item => {
    return {
      anchor: item.code,
      components: [
        {
          anchor: "A",
          name: "RadioButtonWithLabel",
          properties: {
            forChangeObject: {
              isReasoningRequired: item.isReasoningRequired
            },
            name: "RadioButtonWithLabel",
            title: item.title,
            isChecked: item.shouldBeChecked,
            labelStyles: {
              addition: isAdded,
              removal: isRemoved,
              custom: item.isInLupa ? isInLupa : {}
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
      }
    };
  }, koulutusdata.items);
}

export default function getTyovoimakoulutuslomake(action, data) {
  switch (action) {
    case "modification":
      return getModificationForm(
        data.kohde,
        data.koulutusdata,
        data.maaraystyyppi
      );
    default:
      return [];
  }
}
