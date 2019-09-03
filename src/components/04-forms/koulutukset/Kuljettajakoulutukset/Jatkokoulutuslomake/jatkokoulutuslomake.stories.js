import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import KuljettajienJatkokoulutuslomake from "./index";

storiesOf("Lomakkeet/Koulutukset/Kuljettajakoulutukset/", module)
  .addDecorator(withInfo)
  .add("Jatkokoulutuslomake", () => {
    return <KuljettajienJatkokoulutuslomake></KuljettajienJatkokoulutuslomake>;
  });
