import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const Store = createStore({
  initialState: {},
  actions: {
    load: () => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "oivamuutoikeudetvelvollisuudetehdotjatehtavat"
        }
      );
    }
  },
  name: "Oiva - muut oikeudet, velvollisuudet ja tehtävät"
});

export const useOmovt = createHook(Store);
