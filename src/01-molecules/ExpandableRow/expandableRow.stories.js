import React from "react";
import { storiesOf } from "@storybook/react";
import ExpandableRow from "./index";
import { withInfo } from "@storybook/addon-info";

storiesOf("ExpandableRow", module)
  .addDecorator(withInfo)
  .add("is shrinked", () => (
    <ExpandableRow>
      <div data-slot="title">Title</div>
      <div data-slot="info">Info section</div>
      <div data-slot="content">There is some content here...</div>
    </ExpandableRow>
  ))
  .add("is expanded", () => (
    <ExpandableRow shouldBeExpanded={true}>
      <div data-slot="title">Title</div>
      <div data-slot="info">Info section</div>
      <div data-slot="content">There is some content here...</div>
    </ExpandableRow>
  ));
