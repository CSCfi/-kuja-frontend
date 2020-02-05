import { isAdded, isRemoved, isInLupa } from "../../../../css/label";
import { map } from "ramda";

function getModificationForm(kohde, koulutusdata, maaraystyyppi) {
  const categories = map(item => {
    return {
      anchor: item.code,
      components: [
        {
          anchor: "A",
          name: "CheckboxWithLabel",
          properties: {
            name: "CheckboxWithLabel",
            title: item.title,
            isChecked: item.shouldBeChecked || false,
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
      }
    };
  }, koulutusdata.items);
  return categories;
}

export default function getATVKoulutuksetLomake(action, data) {
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
