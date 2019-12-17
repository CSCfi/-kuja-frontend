import FetchHandler from "../../../FetchHandler";
import React, {useContext, useMemo} from "react";
import {BackendContext} from "../../../context/backendContext";
import Table from "../../../components/02-organisms/Table"
import * as R from "ramda";
import {generateAsiatTableStructure} from "../modules/asiatUtils";

const AvoimetAsiat = () => {
    const {state: fromBackend, dispatch} = useContext(BackendContext);
    const fetchSetup = useMemo(() => {
      const fetchItems = [];
      fetchItems.push({
        key: "muutospyynnot",
        dispatchFn: dispatch,
        urlEnding: "avoimet"
      });
      return fetchItems;
    }, [dispatch]);

    const avoimetAsiatData = useMemo(() => {
      return R.path(["muutospyynnot","raw"],fromBackend);
    }, [fromBackend]);

    const tableStructure = !!avoimetAsiatData ?
      generateAsiatTableStructure(avoimetAsiatData) :
      [];

    return (
      <React.Fragment>
        <FetchHandler
          fetchSetup={fetchSetup}
          ready={
            <React.Fragment>
              <Table structure={tableStructure}></Table>
            </React.Fragment>
          }
        />
      </React.Fragment>
    )
  }
;

export default AvoimetAsiat;
