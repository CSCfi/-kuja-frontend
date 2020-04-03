import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generateAvoimetAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelijaAvoimet } from "../../../stores/muutospyynnotEsittelijaAvoimet";
import { useMuutospyynnotEsittelijaValmistelussa } from "../../../stores/muutospyynnotEsittelijaValmistelussa";
import * as R from "ramda";
import { useLocation } from "react-router-dom";

const AvoimetAsiat = props => {
  const intl = useIntl();
  const location = useLocation();
  const [
    muutospyynnotEsittelijaAvoimet,
    muutospyynnotEsittelijaAvoimetActions
  ] = useMuutospyynnotEsittelijaAvoimet();
  const [
    muutospyynnotEsittelijaValmistelussa,
    muutospyynnotEsittelijaValmistelussaActions
  ] = useMuutospyynnotEsittelijaValmistelussa();

  const isForced = R.includes("force=true", location.search);

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaAvoimetActions.load(isForced);

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [isForced, muutospyynnotEsittelijaAvoimetActions]);

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaValmistelussaActions.load(
      isForced
    );

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [isForced, muutospyynnotEsittelijaValmistelussaActions]);

  const tableStructure = useMemo(() => {
    const avoinData = muutospyynnotEsittelijaAvoimet.data || [];
    const valmistelussaData = muutospyynnotEsittelijaValmistelussa.data || [];
    return isForced ||
      (!!muutospyynnotEsittelijaAvoimet.data &&
        !!muutospyynnotEsittelijaValmistelussa.data)
      ? generateAvoimetAsiatTableStructure(
          R.concat(avoinData, valmistelussaData),
          intl.formatMessage,
          props.history
        )
      : [];
  }, [
    intl.formatMessage,
    muutospyynnotEsittelijaAvoimet.data,
    muutospyynnotEsittelijaValmistelussa.data,
    props.history,
    isForced
  ]);

  return (
    <Table
      structure={tableStructure}
      sortedBy={{ columnIndex: 5, order: "descending" }}
    />
  );
};
AvoimetAsiat.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object
};

export default AvoimetAsiat;
