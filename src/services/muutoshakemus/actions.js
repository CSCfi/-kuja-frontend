import {
  SET_SECTION_DATA,
  ADD_SUB_ITEM_TO_CHANGES,
  REMOVE_ITEM_FROM_CHANGES,
  REMOVE_SUB_ITEM_FROM_CHANGES
} from "./actionTypes";

export const setSectionData = (sectionId, index, changes) => {
  return dispatch => {
    dispatch({
      type: SET_SECTION_DATA,
      payload: {
        sectionId,
        index,
        changes
      }
    });
  };
};

export const addSubItemToChanges = (
  sectionId,
  subItem,
  listId,
  operationType
) => {
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
