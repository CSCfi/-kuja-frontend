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
          R.filter(R.propEq("tila", "AVOIN"), muutospyynnotEsittelija.data),
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
