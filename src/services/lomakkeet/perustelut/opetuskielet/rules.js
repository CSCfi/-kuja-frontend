import { getCategoriesByProps } from "../../utils";
import * as R from "ramda";
import {
  ifOneTerm,
  getPathByAnchor
} from "../../../../components/02-organisms/CategorizedListRoot/utils";

export function getRules(_lomake) {
  const textBoxCategories = R.uniq(
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
          R.concat(_path, [
            "categories",
            0,
            "components",
            0,
            "properties",
            "isRequired"
          ]),
          isRequired,
          lomake
        );
      },
      isValid: (lomake, changeObjects, isRequired) => {
        return isRequired
          ? () =>
              ifOneTerm(
                [
                  {
                    anchor: `${category.fullAnchor}.${category.components[0].anchor}`,
                    properties: {
                      value: R.compose(R.not, R.isEmpty)
                    }
                  }
                ],
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
          R.concat(_path, [
            "categories",
            0,
            "components",
            0,
            "properties",
            "isValid"
          ]),
          isValid,
          lomake
        );
      }
    };
  }, textBoxCategories);
  return rules;
}

export const rules = [];
