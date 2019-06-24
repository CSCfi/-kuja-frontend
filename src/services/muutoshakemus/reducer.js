import _ from "lodash";
import {
  SET_SECTION_DATA,
  ADD_SUB_ITEM_TO_CHANGES,
  REMOVE_ITEM_FROM_CHANGES,
  REMOVE_SUB_ITEM_FROM_CHANGES
} from "./actionTypes";

export default function(state, action) {
  switch (action.type) {
    case SET_SECTION_DATA:
      return {
        ...state,
        [action.payload.sectionId]: {
          ...state[action.payload.sectionId],
          changes: {
            ...state[action.payload.sectionId].changes,
            [action.payload.index]: action.payload.changes
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
