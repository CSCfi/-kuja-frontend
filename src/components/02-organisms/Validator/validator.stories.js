import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { lomake } from "./exampleForm";
import * as R from "ramda";

function getPathByAnchor(
  anchorArr = [],
  lomake,
  anchorPartIndex = 0,
  _path = []
) {
  const anchorPart = anchorArr[anchorPartIndex];
  const convertedAnchorPart = isNaN(anchorPart)
    ? anchorPart
    : parseInt(anchorPart, 10);
  let pathPart = [];
  if (anchorPartIndex === 0) {
    pathPart = [R.findIndex(R.propEq("anchor", convertedAnchorPart), lomake)];
  } else if (anchorPartIndex + 1 < anchorArr.length) {
    const updatedPath = R.append("categories", _path);
    const lomakePart = R.path(updatedPath, lomake);
    pathPart = [
      "categories",
      R.findIndex(R.propEq("anchor", convertedAnchorPart), lomakePart)
    ];
  } else {
    const updatedPath = R.append("components", _path);
    const lomakePart = R.path(updatedPath, lomake);
    pathPart = [
      "components",
      R.findIndex(R.propEq("anchor", convertedAnchorPart), lomakePart)
    ];
  }

  _path = R.concat(_path, pathPart);

  if (anchorArr[anchorPartIndex + 1]) {
    return getPathByAnchor(anchorArr, lomake, anchorPartIndex + 1, _path);
  }
  return _path;
}

storiesOf("Validator", module)
  .addDecorator(withInfo)
  .add("Example 1", () => {
    const co = [
      {
        anchor: "2.tehtavan-tarpeellisuus.textbox.A",
        properties: { isChecked: true }
      }
    ];

    const checkTerms = (terms, lomake, changeObjects) => {
      return R.map(term => {
        const _path = getPathByAnchor(R.split(".", term.anchor), lomake);
        const component = R.path(_path, lomake);
        let isValid = true;
        if (component) {
          const changeObject = R.find(
            R.propEq("anchor", term.anchor),
            changeObjects
          );
          /**
           * Let's loop through the properties of the component.
           **/
          R.mapObjIndexed((value, key) => {
            if (
              !R.equals(value, component.properties[key]) &&
              (!changeObject || !R.equals(changeObject.properties[key], value))
            ) {
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

        isFulfilled: ifAll([
          ifAllTerms(
            [
              {
                anchor: "2.tehtavan-tarpeellisuus.textbox.A",
                properties: { isReadOnly: true }
              }
            ],
            lomake,
            co
          ),
          ifOneTerm(
            [
              {
                anchor: "2.jatkokoulutus-title",
                properties: {
                  title: "Jatkokoulutusta antavan koulutuskeskuksen tehtävä"
                }
              },
              {
                anchor: "2.suunnitelma.suunnitelma-field.A",
                properties: { value: "Testi 2 " }
              }
            ],
            lomake,
            co
          )
        ]),
        // Here we can set fields as mandatory
        modifyForm: (isFulfilled, lomake) => {
          console.info(isFulfilled);
        }
      }
    ];

    R.forEach(rule => {
      rule.modifyForm(rule.isFulfilled, lomake);
    }, rules);

    return <div>Validator</div>;
  });
