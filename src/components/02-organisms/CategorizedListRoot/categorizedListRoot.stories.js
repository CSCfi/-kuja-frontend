import CategorizedListRoot from "./index";
import React, { useState } from "react";
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
import { inputStory } from "./storydata/inputStory";

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
    const Stage = props => {
      const [changes, setChanges] = useState(props.changes);

      const handleUpdate = payload => {
        setChanges(payload.changes);
        console.info(payload);
      };

      return (
        <React.Fragment>
          {!!props.render
            ? props.render({
                categories: props.categories,
                changes,
                onUpdate: handleUpdate
              })
            : null}
          {props.children}
        </React.Fragment>
      );
    };

    return (
      <Stage
        categories={simpleStory.categories}
        changes={simpleStory.changes}
        render={props => (
          <CategorizedListRoot
            anchor="simple"
            categories={props.categories}
            changes={props.changes}
            onUpdate={props.onUpdate}
          />
        )}
      ></Stage>
    );
  })
  .add("Complex example", () => {
    const Stage = props => {
      const [changes, setChanges] = useState(props.changes);

      const handleUpdate = payload => {
        setChanges(payload.changes);
        console.info(payload);
      };

      return (
        <React.Fragment>
          {!!props.render
            ? props.render({
                categories: props.categories,
                changes,
                onUpdate: handleUpdate
              })
            : null}
          {props.children}
        </React.Fragment>
      );
    };

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

      // <CategorizedListRoot
      //   anchor="complex"
      //   categories={complexStory.categories}
      //   changes={complexStory.changes}
      //   onUpdate={() => {}}
      //   showCategoryTitles={true}
      // />
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
  .add("Input example", () => {
    return (
      <CategorizedListRoot
        anchor="input"
        categories={inputStory.categories}
        changes={inputStory.changes}
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
