import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const Store = createStore({
  initialState: {},
  actions: {
    load: ({uuid}) => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "lupa",
          urlEnding: `${uuid}?with=all`
        },
        {uuid}
      );
    }
  },
  name: "Lupa"
});

export const useLupa = createHook(Store);
