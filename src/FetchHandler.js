import React, { useEffect, useMemo, useState } from "react";
import { fetchFromBackend, abort } from "./services/backendService";
import { MessageWrapper } from "./modules/elements";
import Loading from "./modules/Loading";
import * as R from "ramda";

const FetchHandler = ({ erroneous, fetching, fetchSetup, ready }) => {
  const [fetchStatus, setFetchStatus] = useState(
    fetchSetup.length > 0 ? "fetching" : "ready"
  );
  const [handledXhrCalls, setHandledXhrCalls] = useState([]);

  const percentage = useMemo(() => {
    return (100 * R.length(handledXhrCalls)) / R.length(fetchSetup);
  }, [fetchSetup, handledXhrCalls]);

  /**
   * User can define a markup for different states of fetching data.
   * If there isn't user defined markup then the default markup
   * (after || signs) is used.
   */
  const markupSetup = useMemo(() => {
    return {
      erroneous: erroneous || (
        <React.Fragment>Kaikkea dataa ei saatu haettua.</React.Fragment>
      ),
      fetching: fetching || (
        <React.Fragment>
          <MessageWrapper>
            <Loading percentage={percentage} />
          </MessageWrapper>
        </React.Fragment>
      ),
      ready: ready || <React.Fragment>&nbsp;</React.Fragment>
    };
  }, [erroneous, fetching, percentage, ready]);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const { abortControllers, responses } = useMemo(() => {
    return fetchFromBackend(fetchSetup);
  }, [fetchSetup]);

  /**
   * Ongoing XHR calls must be canceled. It's done here.
   */
  useEffect(() => {
    return () => {
      abort(abortControllers);
    };
  }, [abortControllers]);

  useEffect(() => {
    R.forEach(response => {
      response.then(result => {
        setHandledXhrCalls(R.insert(-1, !!result, handledXhrCalls));
      });
    }, responses);
  }, [responses]);

  /**
   * When all the backend calls are ready it's time to calculate
   * the outcome.
   */
  useEffect(() => {
    Promise.all(responses).then(values => {
      const isAllOK = R.equals(
        R.map(R.prop("ok"), values).length / fetchSetup.length,
        1
      );
      // If everything went well we are going to show the 'ready' markup.
      if (isAllOK) {
        setFetchStatus("ready");
      }
    });
  }, [fetchSetup.length, responses]);

  /**
   * Return values is ready if all calls to backend have been done
   * successfully.
   */
  return <React.Fragment>{markupSetup[fetchStatus]}</React.Fragment>;
};

export default FetchHandler;
