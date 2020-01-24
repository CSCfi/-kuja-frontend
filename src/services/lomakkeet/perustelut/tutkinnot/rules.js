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
  const categoriesWithRemovalTextBoxes = R.uniq(
    R.flatten(getCategoriesByProps(_lomake, { anchor: "removal" }))
  );

  const categoriesWithOsaamisalaTextBoxes = R.uniq(
    R.flatten(getCategoriesByProps(_lomake, { anchor: "osaamisala" }))
  );

  // Osaamisala textbox rules
  const osaamisalaTextBoxRules = R.map(category => {
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
  }, categoriesWithOsaamisalaTextBoxes);

  // Removal textbox rules
  const removalTextBoxRules = R.map(category => {
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
  }, categoriesWithRemovalTextBoxes);

  // Rules for muutosperustelut (one of the checkboxes must be checked)
  const muutosPerustelutRules = R.map(category => {
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

  return R.flatten([
    muutosPerustelutRules,
    removalTextBoxRules,
    osaamisalaTextBoxRules
  ]);
}
