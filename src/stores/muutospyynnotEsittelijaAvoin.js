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
          urlEnding: "avoimet" // avoimet, valmistelussa, paatetyt
        }
      );
    }
  },
  name: "Muutospyynnöt - Esittelijä - Avoimet"
});

export const useMuutospyynnotEsittelijaAvoin = createHook(Store);
