import { isAdded, isRemoved, isInLupa } from "../../../../css/label";
import { map } from "ramda";

function getModificationForm(koulutusdata, kohde, maaraystyyppi) {
  const categories = map(item => {
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
  return categories;
}

export default function getKuljettajakoulutuslomake(action, data) {
  switch (action) {
    case "modification":
      return getModificationForm(
        data.koulutusdata,
        data.kohde,
        data.maaraystyyppi
      );
    default:
      return [];
  }
}
