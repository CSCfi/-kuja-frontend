import React from "react";
import MuutospyyntoWizard from "../../Hakemukset/Muutospyynto/components/MuutospyyntoWizard";
import { KohteetProvider } from "../../../../../context/kohteetContext";
import { KoulutuksetProvider } from "../../../../../context/koulutuksetContext";
import { KoulutusalatProvider } from "../../../../../context/koulutusalatContext";
import { MuutoshakemusProvider } from "../../../../../context/muutoshakemusContext";
import { KoulutustyypitProvider } from "../../../../../context/koulutustyypitContext";
import { MaaraystyypitProvider } from "../../../../../context/maaraystyypitContext";
import { MuutospyynnotProvider } from "../../../../../context/muutospyynnotContext";
import { MuutProvider } from "../../../../../context/muutContext";
import { KieletProvider } from "../../../../../context/kieletContext";
import PropTypes from "prop-types";

const Hakemus = props => {
  return (
    <MaaraystyypitProvider>
      <MuutospyynnotProvider>
        <KohteetProvider>
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
        </KohteetProvider>
      </MuutospyynnotProvider>
    </MaaraystyypitProvider>
  );
};

Hakemus.propTypes = {
  lupa: PropTypes.object
};

export default Hakemus;
