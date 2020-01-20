import * as R from "ramda";
import {
  getPathByAnchor,
  ifOneTerm
} from "../../components/02-organisms/CategorizedListRoot/utils";

export function createRules(requiredFields = []) {
  return R.map(rule => {
    return {
      isRequired: () => true,
      markRequiredFields: lomake => {
        const _path = getPathByAnchor(R.split(".", rule.anchor), lomake);
        console.info(_path);
        return R.assocPath(
          R.concat(_path, ["properties", "isRequired"]),
          true,
          lomake
        );
      },
      isValid: (lomake, changeObjects) => {
        return () =>
          ifOneTerm(
            [
              {
                anchor: rule.anchor,
                properties: { value: R.compose(R.not, R.isEmpty) }
              }
            ],
            lomake,
            changeObjects
          );
      },
      showErrors: (lomake, isValid) => {
        const _path = getPathByAnchor(R.split(".", rule.anchor), lomake);
        console.info(_path);
        return R.assocPath(
          R.concat(_path, ["properties", "isValid"]),
          isValid,
          lomake
        );
      }
    };
  }, requiredFields);
}
