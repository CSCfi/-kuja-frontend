import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generateAvoimetAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelijaAvoin } from "../../../stores/muutospyynnotEsittelijaAvoin";
import { useMuutospyynnotEsittelijaValmistelussa } from "../../../stores/muutospyynnotEsittelijaValmistelussa";

import * as R from "ramda";

const AvoimetAsiat = () => {
  const intl = useIntl();
  const [
    muutospyynnotEsittelijaAvoin,
    muutospyynnotEsittelijaAvoinActions
  ] = useMuutospyynnotEsittelijaAvoin();
  const [
    muutospyynnotEsittelijaValmistelussa,
    muutospyynnotEsittelijaValmistelussaActions
  ] = useMuutospyynnotEsittelijaValmistelussa();

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaAvoinActions.load();

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaAvoinActions]);

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaValmistelussaActions.load();

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaValmistelussaActions]);

  const tableStructure = useMemo(() => {
    const avoinData = muutospyynnotEsittelijaAvoin.data || [];
    const valmistelussaData = muutospyynnotEsittelijaValmistelussa.data || [];

    return !!muutospyynnotEsittelijaAvoin.data &&
      !!muutospyynnotEsittelijaValmistelussa.data
      ? generateAvoimetAsiatTableStructure(
          R.concat(avoinData, valmistelussaData),
          intl.formatMessage
        )
      : [];
  }, [
    intl.formatMessage,
    muutospyynnotEsittelijaAvoin.data,
    muutospyynnotEsittelijaValmistelussa.data
  ]);

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
