import React from "react";
import CategorizedListRoot from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { checkboxStory } from "./storydata/checkboxStory";
import { simpleStory } from "./storydata/simpleStory";
import { simpleRadioStory } from "./storydata/simpleRadioStory";
import { complexStory } from "./storydata/complexStory";
import { radioStory } from "./storydata/radioStory";
import { simpleTextBoxStory } from "./storydata/simpleTextBoxStory";
import { subformStory } from "./storydata/subformStory";
import { textBoxStory } from "./storydata/textBoxStory";
import { attachmentsStory } from "./storydata/attachmentsStory";
import { inputStory } from "./storydata/inputStory";
import Stage from "./Stage";

storiesOf("CategorizedListRoot", module)
  .addDecorator(withInfo)
  .add("Simple radio example (refactored)", () => {
    return (
      <Stage
        anchor={"simple-radio"}
        interval={1000}
        loopChanges={[
          { anchor: "A.B.A", properties: { isChecked: true } },
          { anchor: "A.C.A", properties: { isChecked: true } },
          { anchor: "B.B.C.A", properties: { isChecked: true } },
          { anchor: "B.C.A", properties: { isChecked: true } },
          { anchor: "B.A.A", properties: { isChecked: true } },
          { anchor: "B.B.A.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: true } }
        ]}
        categories={simpleRadioStory.categories}
        changes={simpleRadioStory.changes}
        render={props => <CategorizedListRoot {...props} />}
      ></Stage>
    );
  })
  .add("One checkbox example", () => {
    return (
      <Stage
        anchor={"checkbox"}
        interval={1000}
        loopChanges={[
          { anchor: "A.A", properties: { isChecked: true } },
          { anchor: "A.A.A", properties: { isChecked: true } },
          { anchor: "A.A.A", properties: { isChecked: false } },
          { anchor: "A.A", properties: { isChecked: false } },
          { anchor: "A.A.A", properties: { isChecked: true } },
          { anchor: "A.A", properties: { isChecked: false } }
        ]}
        categories={checkboxStory.categories}
        changes={checkboxStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={true} {...props} />
        )}
      ></Stage>
    );
  })
  .add("Simple example", () => {
    return (
      <Stage
        anchor={"checkbox"}
        interval={2000}
        loopChanges={[
          { anchor: "A.B.A", properties: { isChecked: true } },
          { anchor: "A.A", properties: { isChecked: false } },
          { anchor: "B.B.C.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: false } },
          { anchor: "B.A", properties: { isChecked: false } },
          { anchor: "B.B.A.A", properties: { isChecked: true } },
          { anchor: "C.A", properties: { isChecked: true } }
        ]}
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        render={props => (
          <CategorizedListRoot showCategoryTitles={false} {...props} />
        )}
      ></Stage>
    );
  })
  .add("Complex example", () => {
    return (
      <Stage
        categories={complexStory.categories}
        changes={complexStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="complex"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={false}
          />
        )}
      ></Stage>
    );
  })
  .add("Radio example", () => {
    return (
      <Stage
        categories={radioStory.categories}
        changes={radioStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="radio"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={false}
          />
        )}
      ></Stage>
    );
  })
  .add("Simple text box example", () => {
    return (
      <Stage
        categories={simpleTextBoxStory.categories}
        changes={simpleTextBoxStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="textbox"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={true}
          />
        )}
      ></Stage>
    );
  })
  .add("Text box example", () => {
    return (
      <Stage
        categories={textBoxStory.categories}
        changes={textBoxStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="textbox"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={false}
          />
        )}
      ></Stage>
    );
  })
  .add("Input example", () => {
    return (
      <Stage
        categories={inputStory.categories}
        changes={inputStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="input"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={false}
          />
        )}
      ></Stage>
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
      <Stage
        categories={subformStory.categories}
        changes={subformStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="dynamicSubforms"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
            showCategoryTitles={false}
          />
        )}
      ></Stage>
    );
  });
