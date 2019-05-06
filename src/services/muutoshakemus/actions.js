import _ from "lodash";
import {
  ADD_ITEM_TO_CHANGES,
  ADD_SUB_ITEM_TO_CHANGES,
  REMOVE_ITEM_FROM_CHANGES,
  REMOVE_SUB_ITEM_FROM_CHANGES
} from "./actionTypes";

export const addItemToChanges = (item, listId, operationType) => {
  return dispatch => {
    dispatch({
      type: ADD_ITEM_TO_CHANGES,
      payload: {
        item,
        listId,
        operationType
      }
    });
  };
};

export const addSubItemToChanges = (subItem, listId, operationType) => {
  return dispatch => {
    dispatch({
      type: ADD_SUB_ITEM_TO_CHANGES,
      payload: {
        listId,
        operationType,
        subItem
      }
    });
  };
};

export const removeItemFromChanges = (item, listId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_ITEM_FROM_CHANGES,
      payload: {
        item,
        listId
      }
    });
  };
};

export const removeSubItemFromChanges = (subItem, listId) => {
  return dispatch => {
    dispatch({
      type: REMOVE_SUB_ITEM_FROM_CHANGES,
      payload: {
        listId,
        subItem
      }
    });
  };
};
