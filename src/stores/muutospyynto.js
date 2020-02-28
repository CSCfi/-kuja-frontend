import { createStore, createHook } from "react-sweet-state";
import { execute } from "./utils/loadFromBackend";

const createMuutospyyntoOutput = (muutospyynto, attachments) => {
  let data = new FormData();
  const muutos = new Blob([JSON.stringify(muutospyynto)], {
    type: "application/json"
  });
  data.append("muutospyynto", muutos, "muutospyynnön json-data");

  if (attachments) {
    attachments.map(item => {
      if (!item.removed && item.new && item.tiedosto instanceof Blob) {
        data.append(item.tiedostoId, item.tiedosto, item.filename);
        item.tiedosto = null;
      }
      return null;
    });
  }
  return data;
};

const Store = createStore({
  initialState: {},
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
    save: (muutospyynto, attachments) => ({
      getState,
      setState
    }) => {
      return execute(
        { getState, setState },
        {
          key: "tallennaMuutospyynto"
        },
        {},
        null,
        createMuutospyyntoOutput(muutospyynto, attachments)
      );
    },
    send: (muutospyynto, attachments, triggerPreview) => ({
      getState,
      setState
    }) => {
      return execute(
        { getState, setState },
        {
          key: "lahetaMuutospyynto"
        },
        {},
        null,
        createMuutospyyntoOutput(muutospyynto, attachments)
      );
    }
  },
  name: "Muutospyyntö"
});

export const useMuutospyynto = createHook(Store);
