import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const Store = createStore({
  initialState: {},
  actions: {
    load: ({uuid}) => ({ getState, setState }) => {
      return execute(
        { getState, setState },
        {
          key: "pebbleLupa",
          urlEnding: `${uuid}`
        },
        { uuid }
      );
    }
  },
  name: "PebbleLupa"
});

export const usePebbleLupa = createHook(Store);
