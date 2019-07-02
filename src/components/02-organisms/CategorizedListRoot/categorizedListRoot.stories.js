import CategorizedListRoot from "./index";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkboxStory } from "./storydata/checkboxStory";
import { simpleStory } from "./storydata/simpleStory";
import { complexStory } from "./storydata/complexStory";
import { radioStory } from "./storydata/radioStory";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("One checkbox example", () => {
    console.info(checkboxStory.categories);
    return (
      <CategorizedListRoot
        anchor="checkbox"
        categories={checkboxStory.categories}
        changes={checkboxStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    );
  })
  .add("Simple example", () => {
    return (
      <CategorizedListRoot
        anchor="simple"
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        onUpdate={() => {}}
      />
    );
  })
  .add("Complex example", () => {
    return (
      <CategorizedListRoot
        anchor="complex"
        categories={complexStory.categories}
        changes={complexStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    );
  })
  .add("Radio example", () => {
    return (
      <CategorizedListRoot
        anchor="radio"
        categories={radioStory.categories}
        changes={radioStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    );
  });
