import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import CategorizedListRoot from "../CategorizedListRoot";
import { lomake } from "./exampleForm";
import Stage from "../CategorizedListRoot/Stage";
import { rules } from "../../../services/lomakkeet/perustelut/kuljettajakoulutukset/jatkokoulutus/rules";

storiesOf("Validator", module)
  .addDecorator(withInfo)
  .add("Example 1", () => {
    return (
      <Stage
        anchor={"root-anchor"}
        categories={lomake}
        rules={rules}
        changes={[]}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}></Stage>
    );
  });
