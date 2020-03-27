import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generateAvoimetAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelija } from "../../../stores/muutospyynnotEsittelija";
import * as R from "ramda";

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
    return !!muutospyynnotEsittelija.data
      ? generateAvoimetAsiatTableStructure(
          R.filter(obj => {
            return R.or(
              R.equals(obj.tila, "AVOIN"),
              R.equals(obj.tila, "VALMISTELUSSA")
            );
          }, muutospyynnotEsittelija.data),
          intl.formatMessage
        )
      : [];
    // const array = [
    //   {
    //     lupaId: 215,
    //     hakupvm: "2019-11-27",
    //     voimassaalkupvm: "2019-01-01",
    //     voimassaloppupvm: "2019-12-31",
    //     paatoskierrosId: 19,
    //     tila: "AVOIN",
    //     jarjestajaYtunnus: "0208201-1",
    //     luoja: "oiva-sanni",
    //     luontipvm: 1574812800000,
    //     paivittaja: "oiva-sanni",
    //     paivityspvm: 1574836496820,
    //     uuid: "6b66384c-f613-11e9-b1c2-005056aa7b7b",
    //     lupaUuid: "281900a2-fd34-11e8-8d76-005056aa0e66",
    //     jarjestaja: {
    //       nimi: { fi: "qwerty" },
    //       maakuntaKoodi: { metadata: [{ kieli: "FI", nimi: "Esimerkki" }] }
    //     }
    //   },
    //   {
    //     lupaId: 315,
    //     hakupvm: "2019-11-27",
    //     voimassaalkupvm: "2019-01-01",
    //     voimassaloppupvm: "2019-12-31",
    //     paatoskierrosId: 19,
    //     tila: "VALMISTELUSSA",
    //     jarjestajaYtunnus: "0208201-1",
    //     luoja: "oiva-sanni",
    //     luontipvm: 1574812800000,
    //     paivittaja: "oiva-sanni",
    //     paivityspvm: 1574836496820,
    //     uuid: "6b66384c-f613-11e9-b1c2-005056aa7b7b",
    //     lupaUuid: "281900a2-fd34-11e8-8d76-005056aa0e66",
    //     jarjestaja: {
    //       nimi: { fi: "qwerty" },
    //       maakuntaKoodi: { metadata: [{ kieli: "FI", nimi: "Esimerkki" }] }
    //     }
    //   }
    // ];
    // return !!array
    //   ? generateAvoimetAsiatTableStructure(
    //       R.filter(obj => {
    //         return R.or(
    //           R.equals(obj.tila, "AVOIN"),
    //           R.equals(obj.tila, "VALMISTELUSSA")
    //         );
    //       }, array),
    //       intl.formatMessage
    //     )
    //   : [];
  }, [intl.formatMessage, muutospyynnotEsittelija.data]);

  return (
    <Table
      structure={tableStructure}
      sortedBy={{ columnIndex: 5, order: "descending" }}
    />
  );
};
AvoimetAsiat.propTypes = {
  intl: PropTypes.object
};

export default AvoimetAsiat;
