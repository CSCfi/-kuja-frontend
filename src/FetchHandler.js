import React, { useEffect, useMemo, useState } from "react";
import { fetchFromBackend, abort } from "./services/backendService";
import { MessageWrapper } from "./modules/elements";
import Loading from "./modules/Loading";
import localForage from "localforage";
import * as R from "ramda";

/**
 * FetchHandler handles XHR requests. It calls abort method of an
 * AbortController to gracefully cancel ongoing XHR calls.
 *
 * @param {jsx} erroneous - Markup to show when some of the XHR calls fail.
 * @param {jsx} fetching - Markup to show when at least one XHR call is in progress.
 * @param {Object[]} fetchSetup - Contains all the required info about calls to make.
 * @param {String} fetchSetup[].key - Key that relates to the backendRoutes object of the BackendService.
 * @param {String} fetchSetup[].subKey - Search results can be categorized using a sub key.
 * @param {String[]} fetchSetup[].path - Explicit location of the search results.
 * @param {jsx} ready - Markup to show when all the XHR calls are done successfully.
 */
const FetchHandler = ({ erroneous, fetching, fetchSetup, ready }) => {
  const [fetchStatus, setFetchStatus] = useState(
    fetchSetup.length > 0 ? "fetching" : "ready"
  );
  const [handledXhrCalls, setHandledXhrCalls] = useState([]);

  /**
   * Percentage is shown when XHR calls are in progress. It tells
   * how many calls are done.
   */
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
        <React.Fragment>
          <MessageWrapper>Tietoja ei voitu noutaa.</MessageWrapper>
        </React.Fragment>
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
   * When a call is done successfully it will be added on the list
   * of handled calls. Cancelling of ongoing XHR calls is done here
   * It's about cases where user leaves the current page/view and
   * data fething is still in progress.
   */
  useEffect(() => {
    // aborting = user is leaving the current page
    localForage.setItem("aborting", false);
    // This helps us to show the percentage to a user.
    R.forEach(response => {
      response.then(result => {
        if (result) {
          setHandledXhrCalls(prevCalls => {
            return R.insert(-1, result.url, prevCalls);
          });
        }
      });
    }, responses);
    return () => {
      // Property 'aborting' is set to figure out if the status should
      // be erroneous when some of the XHR calls are failing because
      // of the user is leaving the current page.
      localForage.setItem("aborting", true).then(() => {
        abort(abortControllers);
      });
    };
  }, [abortControllers, responses]);

  /**
   * When all the backend calls are ready it's time to calculate
   * the outcome.
   */
  useEffect(() => {
    if (R.length(responses) > 0) {
      Promise.all(responses).then(values => {
        const okValues = R.map(R.prop("url"), values).filter(Boolean);
        const isAllOK = R.equals(okValues.length / fetchSetup.length, 1);
        // If everything went well we are going to show the 'ready' markup.
        if (isAllOK) {
          setFetchStatus("ready");
        } else {
          localForage.getItem("aborting").then(value => {
            // If user is NOT leaving the page during an XHR call
            if (!value) {
              // There's at least one unsuccessful XHR call at this point so
              // let's set the status to erroneous.
              setFetchStatus("erroneous");
            }
          });
        }
      });
    }
  }, [fetchSetup.length, responses]);

  /**
   * Return values is ready if all calls to backend have been done
   * successfully.
   */
  return <React.Fragment>{markupSetup[fetchStatus]}</React.Fragment>;
};

export default FetchHandler;
