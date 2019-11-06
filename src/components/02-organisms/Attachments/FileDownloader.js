import React, { useContext, useMemo } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import FetchHandler from "../../../FetchHandler";
import { BackendContext } from "../../../context/backendContext";

const FileDownloader = props => {
  const { dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    return props.uuid
      ? [
          {
            key: "liitteet",
            dispatchFn: dispatch,
            urlEnding: `${props.uuid}/raw`
          }
        ]
      : [];
  }, [dispatch, props.uuid]);

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={<React.Fragment />}
      ></FetchHandler>
    </React.Fragment>
  );
};

FileDownloader.propTypes = {
  uuid: PropTypes.string
};

export default injectIntl(FileDownloader);
