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
          urlEnding: "valmistelussa" // avoimet, valmistelussa, paatetyt
        }
      );
    }
  },
  name: "Muutospyynnöt - Esittelijä - Valmistelussa"
});

export const useMuutospyynnotEsittelijaValmistelussa = createHook(Store);
