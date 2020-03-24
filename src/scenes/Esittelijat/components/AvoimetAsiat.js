import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generateAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelija } from "../../../stores/muutospyynnotEsittelija";

const AvoimetAsiat = () => {
  const intl = useIntl();
  const [
    muutospyynnotEsittelija,
    muutospyynnotEsittelijaActions
  ] = useMuutospyynnotEsittelija();

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaActions.load("avoimet");

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaActions]);

  const tableStructure = useMemo(() => {
    // const array = [
    //   {
    //     uuid: "1234",
    //     tila: "LUONNOS",
    //     paivityspvm: "2020-01-03",
    //     jarjestaja: {
    //       nimi: { fi: "qwerty" },
    //       maakuntaKoodi: { metadata: [{ kieli: "FI", nimi: "Esimerkki" }] }
    //     }
    //   }
    // ];
    const array = [
      {
        lupaId: 215,
        hakupvm: "2019-11-27",
        voimassaalkupvm: "2019-01-01",
        voimassaloppupvm: "2019-12-31",
        paatoskierrosId: 19,
        tila: "AVOIN",
        jarjestajaYtunnus: "0208201-1",
        luoja: "oiva-sanni",
        luontipvm: 1574812800000,
        paivittaja: "oiva-sanni",
        paivityspvm: 1574836496820,
        uuid: "6b66384c-f613-11e9-b1c2-005056aa7b7b",
        lupaUuid: "281900a2-fd34-11e8-8d76-005056aa0e66",
        jarjestaja: {
          nimi: { fi: "qwerty" },
          maakuntaKoodi: { metadata: [{ kieli: "FI", nimi: "Esimerkki" }] }
        }
      }
    ];
    return !!array
      ? generateAsiatTableStructure(array, intl.formatMessage)
      : [];
    // return !!muutospyynnotEsittelija.data
    //   ? generateAsiatTableStructure(
    //       muutospyynnotEsittelija.data,
    //       intl.formatMessage
    //     )
    //   : [];
  }, [intl.formatMessage, muutospyynnotEsittelija.data]);

  return (
    <React.Fragment>
      <React.Fragment>
        <Table structure={tableStructure}></Table>
      </React.Fragment>
    </React.Fragment>
  );
};
AvoimetAsiat.propTypes = {
  intl: PropTypes.object
};

export default AvoimetAsiat;
