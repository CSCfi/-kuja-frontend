import { GET_MUUTOSPERUSTELU_BY_KOODIARVO } from "./actionTypes";

const initialState = {
  user: {},
  isFetching: false,
  fetched: false,
  hasErrored: false
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_MUUTOSPERUSTELU_BY_KOODIARVO:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    default:
      return state;
  }
}
