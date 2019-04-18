import _ from 'lodash'

export const GET_MUUTOSPERUSTELU_BY_KOODIARVO = "GET_MUUTOSPERUSTELU_BY_KOODIARVO";

export function getMuutosperusteluByKoodiArvo(koodiarvo) {
  return dispatch => {
    dispatch({ type: GET_MUUTOSPERUSTELU_BY_KOODIARVO });
  }
}
