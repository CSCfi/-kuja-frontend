import React from "react";
import HakemusContainer from "./hakemusContainer";
import { KohteetProvider } from "../../../../../context/kohteetContext";
import { KoulutuksetProvider } from "../../../../../context/koulutuksetContext";
import { KoulutusalatProvider } from "../../../../../context/koulutusalatContext";
import { MuutoshakemusProvider } from "../../../../../context/muutoshakemusContext";
import { KoulutustyypitProvider } from "../../../../../context/koulutustyypitContext";
import { MaaraystyypitProvider } from "../../../../../context/maaraystyypitContext";
import { MuutospyynnotProvider } from "../../../../../context/muutospyynnotContext";
import { MuutProvider } from "../../../../../context/muutContext";
import { KunnatProvider } from "../../../../../context/kunnatContext";
import { MaakunnatProvider } from "../../../../../context/maakunnatContext";
import { MaakuntakunnatProvider } from "../../../../../context/maakuntakunnatContext";
import { KieletProvider } from "../../../../../context/kieletContext";
import PropTypes from "prop-types";
import { injectIntl } from "react-intl";
import { VankilatProvider } from "../../../../../context/vankilatContext";

const Hakemus = props => {
  return (
    <MaaraystyypitProvider>
      <MuutospyynnotProvider>
        <KohteetProvider>
          <KoulutustyypitProvider>
            <KoulutusalatProvider>
              <KoulutuksetProvider>
                <KieletProvider>
                  <KunnatProvider>
                    <MaakunnatProvider>
                      <MaakuntakunnatProvider>
                        <MuutProvider>
                          <MuutoshakemusProvider>
                            <VankilatProvider>
                              <HakemusContainer {...props} />
                            </VankilatProvider>
                          </MuutoshakemusProvider>
                        </MuutProvider>
                      </MaakuntakunnatProvider>
                    </MaakunnatProvider>
                  </KunnatProvider>
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

export default injectIntl(Hakemus);
