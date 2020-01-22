import {
  ifOneTerm,
  getPathByAnchor
} from "../../../../../components/02-organisms/CategorizedListRoot/utils";
import * as R from "ramda";
import { createRules } from "../../../utils";
import { requiredFields } from "./requiredFields";

const basicRules = createRules(requiredFields);

const conditionalRules = [
  {
    isRequired: () => true,
    /**
     * Modify form to include asterisks to indicated that user should fill
     * the related fields.
     **/
    markRequiredFields: (lomake, isRequired) => {
      const anchor = "2.voimassaolo.title";
      const _path = getPathByAnchor(R.split(".", anchor), lomake);
      return R.assocPath(
        R.concat(_path, ["properties", "isRequired"]),
        isRequired,
        lomake
      );
    },
    // Here we can set fields as mandatory
    isValid: (lomake, changeObjects, isRequired) => {
      return isRequired
        ? () =>
            ifOneTerm(
              [
                {
                  anchor: "2.voimassaolo.voimassaolo-field-yes.A",
                  properties: { isChecked: true }
                },
                {
                  anchor: "2.voimassaolo.voimassaolo-field-no.A",
                  properties: { isChecked: true }
                }
              ],
              lomake,
              changeObjects
            )
        : () => true;
    },
    showErrors: (lomake, isValid) => {
      const anchor = "2.voimassaolo.title";
      const _path = getPathByAnchor(R.split(".", anchor), lomake);
      return R.assocPath(
        R.concat(_path, ["properties", "isValid"]),
        isValid,
        lomake
      );
    }
  }
];

export const rules = R.concat(basicRules, conditionalRules);
