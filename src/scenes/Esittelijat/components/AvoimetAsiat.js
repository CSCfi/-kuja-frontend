import FetchHandler from "../../../FetchHandler";
import React, {useContext} from "react";
import {BackendContext} from "../../../context/backendContext";

const AvoimetAsiat = () => {
  const { state: fromBackend, dispatch } = useContext(BackendContext);
  const fetchSetup = [
    {
      key: "muutospyynnot",
      dispatchFn: dispatch,
      urlEnding: "avoimet"
    }
  ];

  return (
    <React.Fragment>
      <FetchHandler
        fetchSetup={fetchSetup}
        ready={
          <React.Fragment>
            {JSON.stringify(fromBackend)}
          </React.Fragment>
        }
      />
    </React.Fragment>
  )
};

export default AvoimetAsiat;
