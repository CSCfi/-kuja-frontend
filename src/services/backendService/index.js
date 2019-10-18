import { API_BASE_URL } from "../../modules/constants";
import {
  FETCH_FROM_BACKEND_FAILED,
  FETCH_FROM_BACKEND_IS_ON,
  FETCH_FROM_BACKEND_SUCCESS
} from "./actionTypes";
import * as R from "ramda";

/**
 * The main purpose of this module is to run and cancel XHR calls and to
 * provide related information.
 * @module BackendService
 */

/**
 * Cancels XHR requests by calling the abort method of the given
 * AbortController instances.
 * @param {Object[]} abortControllers - Array of AbortController instances.
 */
export function abort(abortControllers = []) {
  try {
    R.forEachObjIndexed(abortController => {
      abortController.abort();
    }, abortControllers);
  } catch (err) {
    throw err;
  }
}

/**
 * Returns true if XHR call has failed for some reason.
 * @param {object} backendData - Format depends on the used reducer.
 */
export function isErroneous(backendData) {
  return backendData && R.equals(backendData.status, "erroneous");
}

/**
 * Returns true if XHR call is active.
 * @param {object} backendData - Format depends on the used reducer 222.
 * @return {boolean}
 */
export function isFetching(backendData) {
  return backendData && R.equals(backendData.status, "fetching");
}

/**
 * Return true if data is fetched and ready for use - otherwice false.
 * @param {object} backendData - Format depends on the used reducer.
 * @return {boolean}
 */
export function isReady(backendData) {
  return backendData && R.equals(backendData.status, "ready");
}

/**
 * The comprehensive list of the backend routes.
 * Format: { key: url, ... }
 * Example: { luvat: api/luvat/jarjestajilla, ... }
 */
const backendRoutes = {
  kunnat: `${API_BASE_URL}/koodistot/kunnat`,
  lupa: `${API_BASE_URL}/luvat/jarjestaja/`,
  luvat: `${API_BASE_URL}/luvat/jarjestajilla`,
  maakunnat: `${API_BASE_URL}/koodistot/maakunnat`,
  muutospyynnot: `${API_BASE_URL}/muutospyynnot/`,
  organisaatio: `${API_BASE_URL}/organisaatiot/`,
  kayttaja: `${API_BASE_URL}/auth/me`
};

/**
 * Runs XHR calls.
 *
 * @param {string} key - A key of backendRoutes object.
 * @param {string} url - XHR call is directed to this url.
 * @param {function} dispatchFn - A dispatch function.
 * @param {object} abortController - An instance of AbortController.
 */
async function run(key, url, options, dispatchFn, abortController) {
  /**
   * It's time to fetch some data!
   */

  const response = await fetch(url, {
    ...options,
    signal: abortController.signal
  }).catch(err => {
    console.log(err);
  });

  if (response && response.ok) {
    const data = await response.json();

    /**
     * Data will be saved to the same context as what dispatchFn presents.
     */
    dispatchFn({
      type: FETCH_FROM_BACKEND_SUCCESS,
      key,
      data
    });
  } else {
    /**
     * Fetching failed. So, let's mark it up for later use.
     */
    dispatchFn({
      type: FETCH_FROM_BACKEND_FAILED,
      key,
      response
    });
  }
}

/**
 *
 * @param {Object[]} keysAndDispatchFuncs - [{ key: string, dispatchFn: function}, ...]
 * @param {string} keysAndDispatchFuncs[].key - A key of the backendRoutes object.
 * @param {string} keysAndDispatchFuncs[].dispatchFn - A dispatch function.
 * @param {array} _abortControllers - Array of AbortController instances
 * @param {number} index
 */
function recursiveFetchHandler(
  keysAndDispatchFuncs,
  _abortControllers = [],
  index = 0
) {
  const { key, dispatchFn, options = {}, urlEnding = "" } = R.view(
    R.lensIndex(index),
    keysAndDispatchFuncs
  );

  const url = R.join("", [R.prop(key, backendRoutes), urlEnding]);

  /**
   * When a user is leaving a page and the following backend call is active we can
   * use an abort controller to gracefully abort the call. So, let's create one.
   */
  const abortController = new AbortController();

  /**
   * This is practically a push operation written with Ramda.
   */
  const abortControllers = R.insert(-1, abortController, _abortControllers);

  /**
   * Fetching is about to start. So, let's mark it up for later use.
   */
  dispatchFn({
    type: FETCH_FROM_BACKEND_IS_ON,
    key
  });

  /**
   * XHR call is made by the run function.
   */
  run(key, url, options, dispatchFn, abortController);

  /**
   * Let's handle the next fetch setup. Current function is called
   * again with updated parameters here.
   */
  if (index < keysAndDispatchFuncs.length - 1) {
    return recursiveFetchHandler(
      keysAndDispatchFuncs,
      abortControllers,
      index + 1
    );
  }

  return abortControllers;
}

/**
 * Uses recursiveFetchHandler function to loop through the given array of objects.
 * @param {Object[]} keysAndDispatchFuncs - [{ key: string, dispatchFn: function}, ...]
 */
export function fetchFromBackend(keysAndDispatchFuncs = []) {
  return recursiveFetchHandler(keysAndDispatchFuncs);
}
