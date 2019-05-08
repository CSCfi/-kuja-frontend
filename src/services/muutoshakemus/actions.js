import _ from "lodash";
import {
  ADD_ITEM_TO_CHANGES,
  ADD_SUB_ITEM_TO_CHANGES,
  REMOVE_ITEM_FROM_CHANGES,
  REMOVE_SUB_ITEM_FROM_CHANGES
} from "./actionTypes";

export const addItemToChanges = (sectionId, item, listId, operationType, removeExistingOnes = false) => {
  return dispatch => {
    dispatch({
      type: ADD_ITEM_TO_CHANGES,
      payload: {
        item,
        listId,
        operationType,
        removeExistingOnes,
        sectionId
      }
    });
  };
};

export const addSubItemToChanges = (sectionId, subItem, listId, operationType) => {
  return dispatch => {
    dispatch({
      type: ADD_SUB_ITEM_TO_CHANGES,
      payload: {
        listId,
        operationType,
        sectionId,
        subItem
      }
    });
  };
};

export const removeItemFromChanges = (sectionId, item, listId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_ITEM_FROM_CHANGES,
      payload: {
        item,
        listId,
        sectionId
      }
    });
  };
};

export const removeSubItemFromChanges = (sectionId, subItem, listId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_SUB_ITEM_FROM_CHANGES,
      payload: {
        listId,
        sectionId,
        subItem
      }
    });
  };
};
