import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import LomakeHenkilonLisaamiseen from "./index";

storiesOf("Lomakkeet/Koulutukset/Kuljettajakoulutukset/", module)
  .addDecorator(withInfo)
  .add("Henkilön lisääminen jatkokoulutuslomakkeelle", () => {
    return <LomakeHenkilonLisaamiseen></LomakeHenkilonLisaamiseen>;
  });
