import React, { useEffect, useMemo, useState } from "react";
import { fetchFromBackend, abort } from "./services/backendService";
import { MessageWrapper } from "./modules/elements";
import Loading from "./modules/Loading";
import { injectIntl } from "react-intl";
import auth from "./i18n/definitions/auth";
import common from "./i18n/definitions/common";
import PropTypes from "prop-types";
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
const FetchHandler = ({
  erroneous,
  fetching,
  fetchSetup,
  intl,
  ready,
  user
}) => {
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
      nosetup: null,
      erroneous: erroneous || (
        <React.Fragment>
          <MessageWrapper>
            <p>{intl.formatMessage(common.fetchFailure)}</p>
            {!user ? (
              <React.Fragment>
                <p>{intl.formatMessage(common.fetchFailureAuthInfo)}</p>
                <a href="/cas-auth">{intl.formatMessage(auth.logIn)}</a>
              </React.Fragment>
            ) : null}
          </MessageWrapper>
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
  }, [erroneous, fetching, intl, percentage, ready, user]);

  /**
   * handledXhrCalls can include both - erroneous and successful queries
   * With this logic it's possible to show the correct view to a user.
   */
  useEffect(() => {
    if (R.isEmpty(fetchSetup)) {
      setFetchStatus("ready");
    } else if (R.includes("failed", handledXhrCalls)) {
      setFetchStatus("erroneous");
    } else if (R.equals(R.length(handledXhrCalls), R.length(fetchSetup))) {
      setFetchStatus("ready");
    } else {
      setFetchStatus("fetching");
    }
  }, [fetchSetup, handledXhrCalls]);

  /**
   * When a call is done successfully it will be added on the list
   * of handled calls. Cancelling of ongoing XHR calls is done here
   * It's about cases where user leaves the current page/view and
   * data fething is still in progress.
   */
  useEffect(() => {
    let isAborting = false;

    /**
     * Before we fetch data it's importan to empty the array of handled calls.
     */
    setHandledXhrCalls([]);
    /**
     * Backend queries are done by fetchFromBackend. It returns an array of
     * AbortController instances and list of promises.
     **/
    const { abortControllers, promises } = fetchFromBackend(fetchSetup);

    R.forEach(promise => {
      promise.then(response => {
        // If aborting is in progress any states shouldn't be set
        // to prevent errors.
        if (!isAborting) {
          setHandledXhrCalls(prevCalls => {
            const token = response ? response.url : "failed";
            return R.insert(-1, token, prevCalls);
          });
        }
      });
    }, promises);

    return () => {
      // isAborting flag is set to true so that the logic above can use it.
      // If aborting is in progress it's useless to set any state.
      isAborting = true;
      abort(abortControllers);
    };
  }, [fetchSetup]);

  /**
   * Return values is ready if all calls to backend have been done
   * successfully.
   */
  return <React.Fragment>{markupSetup[fetchStatus]}</React.Fragment>;
};

FetchHandler.propTypes = {
  erroneous: PropTypes.object,
  fetching: PropTypes.object,
  fetchSetup: PropTypes.array,
  ready: PropTypes.object,
  user: PropTypes.object
};

export default injectIntl(FetchHandler);
