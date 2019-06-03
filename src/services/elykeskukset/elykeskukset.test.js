import {
  FETCH_ELYKESKUKSET_START,
  FETCH_ELYKESKUKSET_SUCCESS,
  FETCH_ELYKESKUKSET_FAILURE
} from "./actionTypes";
import reducer from "./reducer";

it("has correct action types", () => {
  expect(FETCH_ELYKESKUKSET_START).toBe("FETCH_ELYKESKUKSET_START");
  expect(FETCH_ELYKESKUKSET_SUCCESS).toBe("FETCH_ELYKESKUKSET_SUCCESS");
  expect(FETCH_ELYKESKUKSET_FAILURE).toBe("FETCH_ELYKESKUKSET_FAILURE");
});

it("handles the start right", () => {
  const state = {
    exampleValue: "Implementation keeps this."
  };
  expect(reducer(state, { type: FETCH_ELYKESKUKSET_START })).toStrictEqual({
    ...state,
    fetched: false,
    hasErrored: false,
    isFetching: true
  });
});
