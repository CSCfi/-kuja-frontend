import React from "react";
import Datepicker from "./index";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";

storiesOf("Datepicker", module)
  .addDecorator(withInfo)
  .add("Simple example", () => {
    const onChanges = (payload, { value }) => {
      console.info(payload, value);
    };
    const today = new Date(Date.now());
    const yesterday = new Date(Date.now() - 86400000);
    return (
      <div>
        <p>Normal</p>
        <Datepicker
          value={today}
          payload={{ value: today }}
          onChanges={onChanges}
        />
        <p>Error</p>
        <Datepicker
          value={yesterday}
          payload={{ value: yesterday }}
          onChanges={onChanges}
          error={true}
        />
        <p>Wide</p>
        <Datepicker payload={{ testProp: 2 }} onChanges={onChanges} fullWidth />
        <p>Number</p>
        <Datepicker payload={{ testProp: 2 }} onChanges={onChanges} />
      </div>
    );
  });
