import CategorizedListRoot from "./index";
import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkboxStory } from "./storydata/checkboxStory";
import { simpleStory } from "./storydata/simpleStory";
import { complexStory } from "./storydata/complexStory";
import { radioStory } from "./storydata/radioStory";
import { simpleTextBoxStory } from "./storydata/simpleTextBoxStory";
import { subformStory } from "./storydata/subformStory";
import { textBoxStory } from "./storydata/textBoxStory";
import { attachmentsStory } from "./storydata/attachmentsStory";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("One checkbox example", () => {
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
  })
  .add("Simple text box example", () => {
    return (
      <CategorizedListRoot
        anchor="textbox"
        categories={simpleTextBoxStory.categories}
        changes={simpleTextBoxStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={true}
      />
    );
  })
  .add("Text box example", () => {
    return (
      <CategorizedListRoot
        anchor="textbox"
        categories={textBoxStory.categories}
        changes={textBoxStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={false}
      />
    );
  })
  .add("Attachments example", () => {
    return (
      <CategorizedListRoot
        anchor="attachments"
        categories={attachmentsStory.categories}
        changes={attachmentsStory.changes}
        attachments={[]}
        onUpdate={() => {}}
        showCategoryTitles={false}
        placement="test"
      />
    );
  })
  .add("Dynamic subform example", () => {
    return (
      <CategorizedListRoot
        anchor="dynamicSubforms"
        categories={subformStory.categories}
        changes={subformStory.changes}
        onUpdate={() => {}}
        showCategoryTitles={false}
      />
    );
  });
