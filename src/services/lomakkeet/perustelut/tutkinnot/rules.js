import { getCategoriesByProps, createTerms } from "../../utils";
import * as R from "ramda";
import {
  getPathByAnchor,
  ifOneTerm
} from "../../../../components/02-organisms/CategorizedListRoot/utils";

export function getRules(_lomake) {
  const muutosperusteluCategories = R.uniq(
    R.flatten(getCategoriesByProps(_lomake, { anchor: "perustelut" }))
  );

  const rules = R.map(category => {
    return {
      isRequired: () => true,
      markRequiredFields: (lomake, isRequired) => {
        const _path = getPathByAnchor(
          R.split(".", category.fullAnchor),
          lomake
        );
        return R.assocPath(
          R.concat(_path, ["categories", 0, "isRequired"]),
          isRequired,
          lomake
        );
      },
      isValid: (lomake, changeObjects, isRequired) => {
        return isRequired
          ? () =>
              ifOneTerm(
                R.flatten(
                  createTerms(
                    category.categories,
                    { name: "CheckboxWithLabel" },
                    {
                      properties: {
                        isChecked: true
                      }
                    },
                    R.split(".", category.fullAnchor)
                  )
                ),
                lomake,
                changeObjects
              )
          : () => true;
      },
      showErrors: (lomake, isValid) => {
        const _path = getPathByAnchor(
          R.split(".", category.fullAnchor),
          lomake
        );
        return R.assocPath(
          R.concat(_path, ["categories", 0, "isValid"]),
          isValid,
          lomake
        );
      }
    };
  }, muutosperusteluCategories);
  return rules;
}

export const rules = [];
