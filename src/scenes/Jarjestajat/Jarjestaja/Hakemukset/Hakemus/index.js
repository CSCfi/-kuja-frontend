import React from "react";
import MuutospyyntoWizard from "../../Hakemukset/Muutospyynto/components/MuutospyyntoWizard";
import { KoulutuksetProvider } from "../../../../../context/koulutuksetContext";
import { KoulutusalatProvider } from "../../../../../context/koulutusalatContext";
import { MuutoshakemusProvider } from "../../../../../context/muutoshakemusContext";
import { KoulutustyypitProvider } from "../../../../../context/koulutustyypitContext";
import { MuutospyynnotProvider } from "../../../../../context/muutospyynnotContext";
import { MuutProvider } from "../../../../../context/muutContext";
import { KieletProvider } from "../../../../../context/kieletContext";
import PropTypes from "prop-types";

const Hakemus = props => {
  return (
    <MuutospyynnotProvider>
      <KoulutustyypitProvider>
        <KoulutusalatProvider>
          <KoulutuksetProvider>
            <KieletProvider>
              <MuutProvider>
                <MuutoshakemusProvider>
                  <MuutospyyntoWizard lupa={props.lupa} {...props} />
                </MuutoshakemusProvider>
              </MuutProvider>
            </KieletProvider>
          </KoulutuksetProvider>
        </KoulutusalatProvider>
      </KoulutustyypitProvider>
    </MuutospyynnotProvider>
  );
};

Hakemus.propTypes = {
  lupa: PropTypes.object
};

export default Hakemus;
