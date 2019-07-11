import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { injectIntl } from "react-intl";
import common from "../i18n/definitions/common";

const Loading = (props) => {
  const { text } = props;
  
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
        <CircularProgress />
      </span>
      <h3 className="ml-4">{loadingtext}...</h3>
    </div>
  );
};

export default injectIntl(Loading);
