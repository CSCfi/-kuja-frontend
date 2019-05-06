import _ from "lodash";
import {
  ADD_ITEM_TO_CHANGES,
  ADD_SUB_ITEM_TO_CHANGES,
  REMOVE_ITEM_FROM_CHANGES,
  REMOVE_SUB_ITEM_FROM_CHANGES
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case ADD_ITEM_TO_CHANGES:
      return {
        ...state,
        changes: {
          ...state.changes,
          [action.payload.listId]: _.concat(state.changes[action.payload.listId] || [], {
            koodiarvo: action.payload.item.code,
            type: action.payload.operationType,
            koodisto: "koulutus"
          })
        }
      };
    case ADD_SUB_ITEM_TO_CHANGES:
      return {
        ...state,
        changes: {
          ...state.changes,
          [action.payload.listId]: _.concat(state.changes[action.payload.listId] || [], {
            koodiArvo: action.payload.subItem.code,
            type: action.payload.operationType,
            koodisto: "osaamisala"
          })
        }
      };
    case REMOVE_ITEM_FROM_CHANGES:
      return {
        ...state,
        changes: {
          ...state.changes,
          [action.payload.listId]: _.filter(
            state.changes[action.payload.listId] || [],
            change => {
              return change.koodiarvo !== action.payload.item.code;
            }
          )
        }
      };
    case REMOVE_SUB_ITEM_FROM_CHANGES:
      return {
        ...state,
        changes: {
          ...state.changes,
          [action.payload.listId]: _.filter(state.changes[action.payload.listId] || [], change => {
            return change.koodiArvo !== action.payload.subItem.code;
          })
        }
      };
    default:
      return state;
  }
}
