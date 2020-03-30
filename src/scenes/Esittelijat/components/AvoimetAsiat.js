import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generateAvoimetAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelija } from "../../../stores/muutospyynnotEsittelija";
import { useMuutospyynnotEsittelijaValmistelussa } from "../../../stores/muutospyynnotEsittelijaValmistelussa";

import * as R from "ramda";

const AvoimetAsiat = () => {
  const intl = useIntl();
  const [
    muutospyynnotEsittelija,
    muutospyynnotEsittelijaActions
  ] = useMuutospyynnotEsittelija();
  const [
    muutospyynnotEsittelijaValmistelussa,
    muutospyynnotEsittelijaValmistelussaActions
  ] = useMuutospyynnotEsittelijaValmistelussa();

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaActions.load("avoimet");

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaActions]);

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaValmistelussaActions.load();

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaValmistelussaActions]);

  const tableStructure = useMemo(() => {
    const avoinData = muutospyynnotEsittelija.data || [];
    const valmistelussaData = muutospyynnotEsittelijaValmistelussa.data || [];

    return !!muutospyynnotEsittelija.data &&
      !!muutospyynnotEsittelijaValmistelussa.data
      ? generateAvoimetAsiatTableStructure(
          R.concat(avoinData, valmistelussaData),
          intl.formatMessage
        )
      : [];
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
