import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const initialState = {};

const Store = createStore({
  initialState,
  actions: {
    load: uuid => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "muutospyynto",
          urlEnding: uuid
        },
        { uuid }
      );
    },
    reset: () => ({ setState }) => {
      setState(initialState);
    }
  },
  name: "Muutospyyntö"
});

export const useMuutospyynto = createHook(Store);
