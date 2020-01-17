import {
  ifOneTerm,
  getPathByAnchor
} from "../../../../../components/02-organisms/CategorizedListRoot/utils";
import * as R from "ramda";

export const rules = [
  {
    /**
     * Value of 'isRequired' property should be boolean. The property indicates
     * a state that is needed to find out if some other field(s) should be
     * required.
     **/
    isRequired: () => true,
    /**
     * Modify form to include asterisks to indicated that user should fill
     * the related fields.
     **/
    markRequiredFields: (isRequired, lomake) => {
      const anchor = "2.tehtavan-tarpeellisuus.textbox.A";
      const _path = getPathByAnchor(R.split(".", anchor), lomake);
      if (isRequired) {
        return R.assocPath(
          R.concat(_path, ["properties", "isRequired"]),
          true,
          lomake
        );
      }
      return R.assocPath(R.concat(_path, ["properties", "title"]), "", lomake);
    },
    // Here we can set fields as mandatory
    isValid: (isRequired, lomake, changeObjects) => {
      return isRequired
        ? () =>
            ifOneTerm(
              [
                {
                  anchor: "2.tehtavan-tarpeellisuus.textbox.A",
                  properties: { value: "testi" }
                }
              ],
              lomake,
              changeObjects
            )
        : () => true;
    },
    showErrors: (lomake, isValid) => {
      const anchor = "2.tehtavan-tarpeellisuus.textbox.A";
      const _path = getPathByAnchor(R.split(".", anchor), lomake);
      return R.assocPath(
        R.concat(_path, ["properties", "isValid"]),
        isValid,
        lomake
      );
    }
  },
  {
    isRequired: () => true,
    /**
     * Modify form to include asterisks to indicated that user should fill
     * the related fields.
     **/
    markRequiredFields: (isRequired, lomake) => {
      const _path = getPathByAnchor([2, "voimassaolo", "title"], lomake);
      if (isRequired) {
        return R.assocPath(
          R.concat(_path, ["properties", "isRequired"]),
          true,
          lomake
        );
      }
      return R.assocPath(R.concat(_path, ["properties", "title"]), "", lomake);
    },
    // Here we can set fields as mandatory
    isValid: (isRequired, lomake, changeObjects) => {
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
      const _path = getPathByAnchor([2, "voimassaolo", "title"], lomake);
      return R.assocPath(
        R.concat(_path, ["properties", "isValid"]),
        isValid,
        lomake
      );
    }
  }
];
