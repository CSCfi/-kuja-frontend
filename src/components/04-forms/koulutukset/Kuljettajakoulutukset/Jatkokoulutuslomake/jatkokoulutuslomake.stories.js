import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import KuljettajienJatkokoulutuslomake from "./index";

storiesOf("Lomakkeet/Koulutukset/Kuljettajakoulutukset/", module)
  .addDecorator(withInfo)
  .add("Jatkokoulutuslomake", () => {
    const changes = [{
      anchor: "lomake.kuljettajien-jatkokoulutuslomake.4-1.tehtavan-tarpeellisuus-field.A",
      properties: {
        value: "Merkkijono"
      }
    }, {
      anchor: "lomake.kuljettajien-jatkokoulutuslomake.4-5.linja-auto-ammattitutkinto.A",
      properties: {
        isChecked: true
      }
    }, {
      anchor: "lomake.kuljettajien-jatkokoulutuslomake.4-5.CE-luokka.A",
      properties: {
        isChecked: true
      }
    }, {
      anchor: "lomake.kuljettajien-jatkokoulutuslomake.4-5.kuljetusalan-ammattitutkinto.A",
      properties: {
        isChecked: true
      }
    }]
    return <KuljettajienJatkokoulutuslomake changes={changes}></KuljettajienJatkokoulutuslomake>;
  });
