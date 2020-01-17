import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import CategorizedListRoot from "../CategorizedListRoot";
import * as R from "ramda";
import { lomake } from "./exampleForm";
import Stage from "../CategorizedListRoot/Stage";
import { getPathByAnchor } from "../CategorizedListRoot/utils";

storiesOf("Validator", module)
  .addDecorator(withInfo)
  .add("Example 1", () => {
    const co = [];

    const checkTerms = (terms, lomake, changeObjects) => {
      return R.map(term => {
        const _path = getPathByAnchor(R.split(".", term.anchor), lomake);
        const component = R.path(_path, lomake);
        let isValid = true;
        if (component) {
          const changeObject = R.find(
            R.propEq("anchor", "root-anchor." + term.anchor),
            changeObjects
          );
          console.info(changeObjects);
          /**
           * Let's loop through the properties of the component.
           **/
          R.mapObjIndexed((value, key) => {
            if (
              !R.equals(value, component.properties[key]) &&
              (!changeObject || !R.equals(changeObject.properties[key], value))
            ) {
              console.info("ei ole validi: ", key, changeObject, value);
              isValid = false;
            }
          }, term.properties);
        } else {
          isValid = false;
        }

        return isValid;
      }, terms);
    };

    const ifAll = R.all(R.equals(true));
    const ifAllTerms = R.compose(ifAll, checkTerms);
    const ifOneTerm = R.compose(R.includes(true), checkTerms);

    const rules = [
      {
        /**
         * Value of 'isFulfilled' property should be boolean. The property indicates
         * a state that is needed to find out if some other field(s) should be
         * required.
         **/
        isFulfilled: (lomake, changeObjects) =>
          ifAll([
            ifAllTerms(
              [
                {
                  anchor: "2.tehtavan-tarpeellisuus.textbox.A",
                  properties: { value: "testi" }
                }
              ],
              lomake,
              changeObjects
            ),
            ifOneTerm(
              [
                {
                  anchor: "2.suunnitelma.suunnitelma-field.A",
                  properties: { value: "testi 2" }
                },
                {
                  anchor: "2.osaaminen.osaaminen-field.A",
                  properties: { value: "testi 2" }
                }
              ],
              lomake,
              changeObjects
            )
          ]),
        /**
         * Modify form to include asterisks to indicated that user should fill
         * the related fields.
         **/
        markRequiredFields: (isFulfilled, lomake) => {
          const _path = getPathByAnchor([2, "voimassaolo", "title"], lomake);
          if (isFulfilled) {
            return R.assocPath(
              R.concat(_path, ["properties", "title"]),
              "*",
              lomake
            );
          }
          return R.assocPath(
            R.concat(_path, ["properties", "title"]),
            "",
            lomake
          );
        },
        // Here we can set fields as mandatory
        isValid: (isFulfilled, lomake, changeObjects) => {
          return isFulfilled
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
        showErrors: (isValid, lomake) => {
          const _path = getPathByAnchor(
            [2, "tehtavan-tarpeellisuus", "textbox", "A"],
            lomake
          );
          return R.assocPath(
            R.concat(_path, ["properties", "isErroneous"]),
            !isValid,
            lomake
          );
        }
      }
    ];

    return (
      <Stage
        anchor={"root-anchor"}
        interval={0}
        loopChanges={[
          {
            anchor: "2.tehtavan-tarpeellisuus.textbox.A",
            properties: { value: "" }
          },
          {
            anchor: "2.tehtavan-tarpeellisuus.textbox.A",
            properties: { value: "" }
          }
        ]}
        categories={lomake}
        rules={rules}
        changes={co}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  });
