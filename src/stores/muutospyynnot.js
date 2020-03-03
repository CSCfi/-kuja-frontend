import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const Store = createStore({
  initialState: {},
  actions: {
    load: (ytunnus, isForceReloadRequested) => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "muutospyynnot",
          urlEnding: ytunnus
        },
        { ytunnus },
        isForceReloadRequested ? 0 : undefined
      );
    }
  },
  name: "Muutospyynnöt"
});

export const useMuutospyynnot = createHook(Store);
