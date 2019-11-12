import React from "react";
import { storiesOf } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import KuljettajienPeruskoulutuslomake from "./index";

storiesOf("Lomakkeet/Koulutukset/Kuljettajakoulutukset/", module)
  .addDecorator(withInfo)
  .add("Peruskoulutuslomake", () => {
    const changes = [{
      anchor: "lomake.kuljettajien-peruskoulutuslomake.3-1.tehtavan-tarpeellisuus-field.A",
      properties: {
        value: "Merkkijono"
      }
    }, {
      anchor: "lomake.kuljettajien-peruskoulutuslomake.3-4.linja-auto-ammattitutkinto.A",
      properties: {
        isChecked: true
      }
    }, {
      anchor: "lomake.kuljettajien-peruskoulutuslomake.3-4.CE-luokka.A",
      properties: {
        isChecked: true
      }
    }, {
      anchor: "lomake.kuljettajien-peruskoulutuslomake.3-4.kuljetusalan-ammattitutkinto.A",
      properties: {
        isChecked: true
      }
    }]
    return <KuljettajienPeruskoulutuslomake changes={changes}></KuljettajienPeruskoulutuslomake>;
  });
