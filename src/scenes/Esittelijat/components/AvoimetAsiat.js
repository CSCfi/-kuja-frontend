import React from "react";
import Table from "../../../components/02-organisms/Table"
import {generateAsiatTableStructure} from "../modules/asiatUtils";
import {useIntl} from "react-intl";
import {PropTypes} from "prop-types";

const AvoimetAsiat = () => {
    const intl = useIntl();

    const avoimetAsiatData = [];

    const tableStructure = !!avoimetAsiatData ?
      generateAsiatTableStructure(avoimetAsiatData, intl.formatMessage) :
      [];

    return (
      <React.Fragment>
        <React.Fragment>
          <Table structure={tableStructure}></Table>
        </React.Fragment>
      </React.Fragment>
    )
  }
;

AvoimetAsiat.propTypes = {
  intl: PropTypes.object
};

export default AvoimetAsiat;
