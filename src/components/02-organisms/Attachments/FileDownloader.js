import React, { useContext, useMemo, useEffect } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import FetchHandler from "../../../FetchHandler";
import { BackendContext } from "../../../context/backendContext";
import { isReady } from "../../../services/backendService";
import * as R from "ramda";

// const whyDidYouRender = require("@welldone-software/why-did-you-render/dist/no-classes-transpile/umd/whyDidYouRender.min.js");
// whyDidYouRender(React);

const saveData = (function() {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function(data, fileName) {
    var json = JSON.stringify(data),
      blob = new Blob([json], { type: "octet/stream" }),
      url = window.URL.createObjectURL(blob);
    a.href = url;
    a.download = fileName;
    a.click();
    console.info(url, data, fileName);
    window.URL.revokeObjectURL(url);
  };
})();

const FileDownloader = React.memo(props => {
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    console.info(props.filename);
    return props.uuid && Math.random() < 0.5
      ? [
          {
            key: "liitteet",
            path: ["liitteet", props.filename],
            dispatchFn: dispatch,
            urlEnding: `${props.uuid}/raw`
          }
        ]
      : [];
  }, [dispatch, props.filename, props.uuid]);

  useEffect(() => {
    // if (isReady(R.prop(props.filename, fromBackend.liitteet))) {
    //   console.info(fromBackend.liitteet[props.filename].raw, props.filename);
    //   saveData(fromBackend.liitteet[props.filename].raw, props.filename);
    // }
  }, [fromBackend.liitteet, props.filename]);

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={<React.Fragment />}
      ></FetchHandler>
    </React.Fragment>
  );
});

FileDownloader.propTypes = {
  filename: PropTypes.string,
  uuid: PropTypes.string
};

// FileDownloader.whyDidYouRender = true;

export default injectIntl(FileDownloader);
