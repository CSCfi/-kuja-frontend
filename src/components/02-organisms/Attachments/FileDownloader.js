import React, { useContext, useMemo } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import FetchHandler from "../../../FetchHandler";
import { BackendContext } from "../../../context/backendContext";
// import { BackendContext } from "./context/backendContext";

const FileDownloader = props => {
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    console.log(props.uuid);
    if (props.uuid)
      return [
        {
          key: "liitteet",
          dispatchFn: dispatch,
          urlEnding: props.uuid
        }
      ];
    else return [];
  }, [dispatch, props.uuid]);

  const OpenFile = () => {
    console.log(fromBackend);
    // const blob = reader.result;
    // let url = blob;
    // let a = document.createElement("a");
    // a.href = url;
    // a.download = response.nimi + "." + response.tyyppi;
    // a.click();
    return <React.Fragment />;
  };

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={
          <React.Fragment>
            <OpenFile />
          </React.Fragment>
        }
      ></FetchHandler>
    </React.Fragment>
  );
};

FileDownloader.propTypes = {
  uuid: PropTypes.string
};

export default injectIntl(FileDownloader);
