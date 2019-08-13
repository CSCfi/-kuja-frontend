import React from 'react';
import TextBox from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

storiesOf("TextBox", module)
  .addDecorator(withInfo)
  .add("Simple example", () => {
    return <TextBox />;
  });
