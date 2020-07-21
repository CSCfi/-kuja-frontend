import { createRules, ifOneTerm, getPathByAnchor } from "../utils";
import { requiredFields } from "./requiredFields";
import { assocPath, concat, find, propEq, path } from "ramda";
import ProcedureHandler from "../../../components/02-organisms/procedureHandler";

export async function getRules() {
  // Rules for top three fields of muutospyyntö
  const simpleRules = createRules(requiredFields);

  const advancedRules = [
    {
      isRequired: () => true,
      markRequiredFields: lomake => {
        const _path = getPathByAnchor(["asianumero", "A"], lomake);
        return assocPath(
          concat(_path, ["properties", "isRequired"]),
          true,
          lomake
        );
      },

      isValid: (lomake, changeObjects)  => {
          console.log(lomake);
          const asianumeroComponent = find(propEq("anchor", "asianumero"), lomake);
          const uuid = asianumeroComponent ? path(["components", "0", "properties", "forChangeObject", "uuid"], asianumeroComponent) : null;
          console.log(uuid);
          return () => {
            ifOneTerm(
                [
                    {
                        anchor: "asianumero.A",
                        properties: {
                            value: async value => {
                                if (value) {
                                    const validString = /^VN\/[0-9]{1,6}\/[0-9]{4}$/.test(value);
                                    const procedureHandler = new ProcedureHandler();
                                    const outputs = await procedureHandler.run(
                                        "muutospyynto.muutokset.tarkistaDuplikaattiAsianumero",
                                        [uuid, value]
                                    );
                                       console.log(validString);
                                       console.log(outputs.muutospyynto.muutokset.tarkistaDuplikaattiAsianumero.output.result);
                                       //return validString && !outputs.muutospyynto.muutokset.tarkistaDuplikaattiAsianumero.output.result;
                                       return false;
                                }
                                return false;
                            },
                        }
                    }
                ],
                lomake,
                changeObjects
            );
        } },
      showErrors: (lomake, isValid) => {
        const _path = getPathByAnchor(["asianumero", "A"], lomake);
        return assocPath(
          concat(_path, ["properties", "isValid"]),
          isValid,
          lomake
        );
      }
    }
  ];

  return concat(simpleRules, advancedRules);
}
