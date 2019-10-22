import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { injectIntl } from "react-intl";
import common from "../i18n/definitions/common";
import PropTypes from "prop-types";
import * as R from "ramda";

const Loading = props => {
  const { text } = props;

  const {
    intl: { formatMessage }
  } = props;

  let loadingtext;
  if (text) {
    loadingtext = text;
  } else {
    loadingtext = formatMessage(common.loading);
  }

  return (
    <div className="flex items-center mx-auto">
      <span className="mr-6">
        {!R.isNil(props.percentage) && (
          <span className="absolute mt-8 ml-4">
            {Math.round(props.percentage)}%
          </span>
        )}
        <CircularProgress size={80} value={props.percentage} />
      </span>
      <h3 className="ml-4">{loadingtext}...</h3>
    </div>
  );
};

Loading.propTypes = {
  percentage: PropTypes.number
};

export default injectIntl(Loading);
