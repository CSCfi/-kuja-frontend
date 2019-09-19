import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import OpiskelijavuodetPerustelulomake from "./index";

storiesOf("Lomakkeet/Muut", module)
  .addDecorator(withInfo)
  .add("OpiskeluvuodetLomake", () => {
    const changes = [
    ];
    return (
      <OpiskelijavuodetPerustelulomake
        changes={changes}
      ></OpiskelijavuodetPerustelulomake>
    );
  });
