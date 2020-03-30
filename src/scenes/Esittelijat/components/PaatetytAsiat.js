import React, { useEffect, useMemo } from "react";
import Table from "okm-frontend-components/dist/components/02-organisms/Table";
import { generatePaatetytAsiatTableStructure } from "../modules/asiatUtils";
import { useIntl } from "react-intl";
import { PropTypes } from "prop-types";
import { useMuutospyynnotEsittelija } from "../../../stores/muutospyynnotEsittelija";

const PaatetytAsiat = () => {
  const intl = useIntl();
  const [
    muutospyynnotEsittelija,
    muutospyynnotEsittelijaActions
  ] = useMuutospyynnotEsittelija();

  useEffect(() => {
    let abortController = muutospyynnotEsittelijaActions.load("paatetyt");

    return function cancel() {
      if (abortController) {
        abortController.abort();
      }
    };
  }, [muutospyynnotEsittelijaActions]);

  const tableStructure = useMemo(() => {
    return !!muutospyynnotEsittelija.data
      ? generatePaatetytAsiatTableStructure(
          muutospyynnotEsittelija.data,
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
PaatetytAsiat.propTypes = {
  intl: PropTypes.object
};

export default PaatetytAsiat;
