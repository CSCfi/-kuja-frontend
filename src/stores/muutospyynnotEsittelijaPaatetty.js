import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const Store = createStore({
  initialState: {},
  actions: {
    load: () => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "muutospyynnot",
          urlEnding: "paatetyt" // avoimet, valmistelussa, paatetyt
        }
      );
    }
  },
  name: "Muutospyynnöt - Esittelijä - Päätetty"
});

export const useMuutospyynnotEsittelijaPaatetty = createHook(Store);
