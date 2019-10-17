import { API_BASE_URL } from "../../../modules/constants";
import {
  FETCH_FROM_BACKEND_FAILED,
  FETCH_FROM_BACKEND_IS_ON,
  FETCH_FROM_BACKEND_SUCCESS
} from "./actionTypes";
import * as R from "ramda";

export const abort = abortControllers => {
  R.forEachObjIndexed(abortController => {
    abortController.abort();
  }, abortControllers);
};

export const isErroneous = backendData => {
  console.info("error", backendData);
  return backendData && R.equals(backendData.status, "erroneous");
};

export const isFetching = backendData => {
  console.info("is fetching", backendData);
  return backendData && R.equals(backendData.status, "fetching");
};

export const isReady = backendData => {
  console.info("is ready", backendData);
  return backendData && R.equals(backendData.status, "ready");
};

const backendRoutes = {
  luvat: `${API_BASE_URL}/luvat/jarjestajilla`
};

export const fetchFromBackend = async (
  keysAndDispatchFuncs,
  _abortControllers = [],
  index = 0
) => {
  const setupObj = R.view(R.lensIndex(index), keysAndDispatchFuncs);

  const url = R.prop(setupObj.key, backendRoutes);

  /**
   * When a user is leaving a page and the following backend call is active we can
   * use an abort controller to gracefully abort the call. So, let's create one.
   */
  const abortController = new AbortController();

  const abortControllers = R.insert(-1, _abortControllers);

  /**
   * Fetching is about to start. So, let's mark it up for later use.
   */
  setupObj.dispatchFn({
    type: FETCH_FROM_BACKEND_IS_ON,
    key: setupObj.key
  });

  /**
   * Let's handle the next data fetching setup. We are calling the current
   * function here again with updated parameters.
   */
  if (index < keysAndDispatchFuncs.length - 1) {
    return fetchFromBackend(keysAndDispatchFuncs, abortControllers, index + 1);
  }

  /**
   * It's time to fetch some data!
   */
  const response = await fetch(url, {
    signal: abortController.signal
  });

  if (response.ok) {
    const data = await response.json();

    /**
     * Data will be saved to the same context as what dispatchFn presents.
     */
    setupObj.dispatchFn({
      type: FETCH_FROM_BACKEND_SUCCESS,
      key: setupObj.key,
      data
    });
  } else {
    /**
     * Fetching failed. So, let's mark it up for later use.
     */
    setupObj.dispatchFn({
      type: FETCH_FROM_BACKEND_FAILED,
      key: setupObj.key,
      response
    });
  }

  return R.zipObj(abortControllers);
};
