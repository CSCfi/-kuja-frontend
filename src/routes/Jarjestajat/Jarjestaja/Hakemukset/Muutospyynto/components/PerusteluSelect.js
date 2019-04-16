import React, { Component } from "react";
import { Field } from "redux-form";
import styled from "styled-components";

import { MUUTOS_WIZARD_TEKSTIT } from "../modules/constants";

const PerusteluSelectWrapper = styled.div`
  margin-bottom: 20px;
`;

class PerusteluSelect extends Component {
  render() {
    const { muutosperustelut, muutos, fields, muutokset } = this.props;

    return (
      <PerusteluSelectWrapper>
        <h4>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_OTSIKKO.FI}</h4>
        <div>{MUUTOS_WIZARD_TEKSTIT.TAUSTA_SYYT_TARKENNE.FI}</div>

        {muutosperustelut.map(m => {
          return (
            <div key={m.koodiArvo}>
              <input
                name={`muutosperustelu-${muutos.koodiarvo}-${
                  m.koodisto.koodistoUri
                }-${m.koodiArvo}`}
                id={`muutosperustelu-${muutos.koodiarvo}-${
                  m.koodisto.koodistoUri
                }-${m.koodiArvo}`}
                type="checkbox"
              />
              <label
                htmlFor={`muutosperustelu-${muutos.koodiarvo}-${
                  m.koodisto.koodistoUri
                }-${m.koodiArvo}`}
              >
                {m.label}
              </label>
            </div>
          );
        })}
      </PerusteluSelectWrapper>
    );
  }
}

export default PerusteluSelect;
