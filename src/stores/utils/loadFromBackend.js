import { API_BASE_URL } from "../../modules/constants";
import { backendRoutes } from "./backendRoutes";
import { equals, includes, join, map, mergeDeepLeft } from "ramda";

async function run(abortController, config, callbackFn) {
  // key is used to resolve path parameters from backendRoutes
  // queryParameters is a list of key-value pairs
  // urlEnding is a string of supplementary path parameters
  const { key, urlEnding, queryParameters = [] } = config;
  const queryString = join(
    "&",
    map(item => `${item.key}=${item.value}`)(queryParameters)
  );
  const routeObj = backendRoutes[key];
  const options = {
    signal: abortController.signal
  };
  const url = `${API_BASE_URL}/${join("", [
    routeObj.path,
    urlEnding,
    routeObj.postfix,
    queryString.length > 0 ? `?${queryString}` : ""
  ])}`;

  const response = await fetch(
    url,
    // add 'accept' header if it does not exist
    mergeDeepLeft(options, {
      headers: { Accept: "application/json" }
    })
  ).catch(err => {
    console.info(err);
    callbackFn(null, true);
  });

  if (response) {
    if (response.ok) {
      const contentType = response.headers.get("content-type");
      if (includes("application/json", contentType)) {
        callbackFn(await response.json(), false);
      }
    } else {
      callbackFn(null, true);
    }
  }
}

export default function loadFromBackend(config, callbackFn, payload) {
  if (!callbackFn) {
    console.info("Callback function is missing", config);
    return;
  }
  const abortController = new AbortController();
  run(abortController, config, callbackFn, payload);
  return abortController;
}

export function execute(
  { getState, setState },
  config,
  propsToState = {},
  refreshIntervalInSeconds = 120,
  payload
) {
  const state = getState();
  if (
    state.isLoading !== true &&
    (state.isErroneous ||
      !equals(propsToState, state.keyParams) ||
      !state.fetchedAt ||
      new Date().getTime() - state.fetchedAt >= refreshIntervalInSeconds * 1000)
  ) {
    setState({
      isLoading: true
    });

    const abortController = loadFromBackend(
      config,
      (data, isErroneous) => {
        setState({
          ...{ keyParams: propsToState },
          data,
          fetchedAt: new Date().getTime(),
          isErroneous,
          isLoading: false
        });
      },
      payload
    );

    return abortController;
  }
  return null;
}
