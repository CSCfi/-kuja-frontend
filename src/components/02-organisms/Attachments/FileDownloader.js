import React, { useContext, useMemo } from "react";
import { injectIntl } from "react-intl";
import PropTypes from "prop-types";
import * as R from "ramda";
import FetchHandler from "../../../../FetchHandler";
import { BackendContext } from "../../../../context/backendContext";
import { BackendContext } from "./context/backendContext";

const FileDownloader = ({ file }) => {
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  const fetchSetup = useMemo(() => {
    return [
      {
        key: "liitteet",
        dispatchFn: dispatch,
        urlEnding: file.oid
      }
    ];
  }, [dispatch, file]);

  const OpenFile = () => {
    const blob = reader.result;
    let url = blob;
    let a = document.createElement("a");
    a.href = url;
    a.download = response.nimi + "." + response.tyyppi;
    a.click();
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

Jarjestaja.propTypes = {
  lupaKohteet: PropTypes.object,
  lupa: PropTypes.object,
  match: PropTypes.object,
  muutospyynnot: PropTypes.array,
  organisaatio: PropTypes.object,
  user: PropTypes.object,
  ytunnus: PropTypes.string
};

export default injectIntl(FileDownloader);
