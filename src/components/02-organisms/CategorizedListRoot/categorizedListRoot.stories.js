import CategorizedListRoot from "./index";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { simpleStory } from "./storydata/simpleStory";
import { complexStory } from "./storydata/complexStory";
import { radioStory } from "./storydata/radioStory";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("Simple example", () => {
    return (
      <CategorizedListRoot
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        onUpdate={() => {}}
      />
    );
  })
  .add("Complex example", () => {
    return (
      <CategorizedListRoot
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
        categories={radioStory.categories}
        changes={radioStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    );
  });
