import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generatePaatetytAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelijaPaatetty } from "../../../stores/muutospyynnotEsittelijaPaatetty";

const PaatetytAsiat = () => {
  const intl = useIntl();
  const [
    muutospyynnotEsittelijaPaatetty,
    muutospyynnotEsittelijaPaatettyActions
  ] = useMuutospyynnotEsittelijaPaatetty();

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaPaatettyActions.load(
      "paatetyt"
    );

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaPaatettyActions]);

  const tableStructure = useMemo(() => {
    return !!muutospyynnotEsittelijaPaatetty.data
      ? generatePaatetytAsiatTableStructure(
          muutospyynnotEsittelijaPaatetty.data,
          intl.formatMessage
        )
      : [];
  }, [intl.formatMessage, muutospyynnotEsittelijaPaatetty.data]);

  return (
    <Table
      structure={tableStructure}
      sortedBy={{ columnIndex: 5, order: "descending" }}
    />
  );
};
PaatetytAsiat.propTypes = {
  intl: PropTypes.object
};

export default PaatetytAsiat;
