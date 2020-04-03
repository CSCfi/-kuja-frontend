import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generatePaatetytAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelijaPaatetty } from "../../../stores/muutospyynnotEsittelijaPaatetty";
import * as R from "ramda";
import { useLocation } from "react-router-dom";

const PaatetytAsiat = props => {
  const intl = useIntl();
  const location = useLocation();
  const [
    muutospyynnotEsittelijaPaatetty,
    muutospyynnotEsittelijaPaatettyActions
  ] = useMuutospyynnotEsittelijaPaatetty();

  const isForced = useMemo(() => {
    return R.includes("force=", location.search);
  }, [location.search]);

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaPaatettyActions.load(isForced);

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [isForced, location.search, muutospyynnotEsittelijaPaatettyActions]);

  const tableStructure = useMemo(() => {
    return isForced || !!muutospyynnotEsittelijaPaatetty.data
      ? generatePaatetytAsiatTableStructure(
          muutospyynnotEsittelijaPaatetty.data,
          intl.formatMessage,
          props.history
        )
      : [];
  }, [
    isForced,
    props.history,
    intl.formatMessage,
    muutospyynnotEsittelijaPaatetty.data
  ]);

  return (
    <Table
      structure={tableStructure}
      sortedBy={{ columnIndex: 5, order: "descending" }}
    />
  );
};
PaatetytAsiat.propTypes = {
  intl: PropTypes.object,
  history: PropTypes.object
};

export default PaatetytAsiat;
