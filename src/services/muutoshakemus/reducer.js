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
      const item = {
        koodiarvo: action.payload.item.code,
        type: action.payload.operationType,
        koodisto: "koulutus"
      };
      return {
        ...state,
        [action.payload.sectionId]: {
          ...state[action.payload.sectionId],
          changes: {
            ...state[action.payload.sectionId].changes,
            [action.payload.listId]: !action.payload.removeExistingOnes
              ? _.concat(
                  state[action.payload.sectionId].changes[
                    action.payload.listId
                  ] || [],
                  item
                )
              : [item]
          }
        }
      };
    case ADD_SUB_ITEM_TO_CHANGES:
      return {
        ...state,
        [action.payload.sectionId]: {
          ...state[action.payload.sectionId],
          changes: {
            ...state[action.payload.sectionId].changes,
            [action.payload.listId]: _.concat(
              state[action.payload.sectionId].changes[action.payload.listId] ||
                [],
              {
                koodiArvo: action.payload.subItem.code,
                type: action.payload.operationType,
                koodisto: "osaamisala"
              }
            )
          }
        }
      };
    case REMOVE_ITEM_FROM_CHANGES:
      return {
        ...state,
        [action.payload.sectionId]: {
          ...state[action.payload.sectionId],
          changes: {
            ...state[action.payload.sectionId].changes,
            [action.payload.listId]: _.filter(
              state[action.payload.sectionId].changes[action.payload.listId] ||
                [],
              change => {
                return change.koodiarvo !== action.payload.item.code;
              }
            )
          }
        }
      };
    case REMOVE_SUB_ITEM_FROM_CHANGES:
      return {
        ...state,
        [action.payload.sectionId]: {
          changes: {
            ...state[action.payload.sectionId].changes,
            [action.payload.listId]: _.filter(
              state[action.payload.sectionId].changes[action.payload.listId] ||
                [],
              change => {
                return change.koodiArvo !== action.payload.subItem.code;
              }
            )
          }
        }
      };
    default:
      return state;
  }
}
