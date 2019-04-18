import {
  parseKoulutuksetAll,
  parseMuut
} from "scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/koulutusParser";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {},
  muut: {
    isFetching: false,
    fetched: false,
    hasErrored: false,
    muudata: undefined
  },
  poikkeukset: {
    isFetching: false,
    fetched: false,
    hasErrored: false,
    data: []
  }
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_KOULUTUKSET_ALL_START:
      return {
        ...state,
        isFetching: true,
        fetched: false,
        hasErrored: false
      };
    case FETCH_KOULUTUKSET_ALL_SUCCESS:
      return {
        ...state,
        isFetching: false,
        fetched: true,
        hasErrored: false,
        koulutusdata: parseKoulutuksetAll(action.payload)
      };
    case FETCH_KOULUTUKSET_ALL_FAILURE:
      return {
        ...state,
        isFetching: false,
        fetched: false,
        hasErrored: true
      };
    case FETCH_KOULUTUKSET_MUUT_START:
      return {
        ...state,
        muut: {
          isFetching: true,
          fetched: false,
          hasErrored: false
        }
      };
    case FETCH_KOULUTUKSET_MUUT_SUCCESS:
      return {
        ...state,
        muut: {
          isFetching: false,
          fetched: true,
          hasErrored: false,
          muudata: {
            ...state.muut.muudata,
            [action.koodisto]: parseMuut(action.payload)
          }
        }
      };
    case FETCH_KOULUTUKSET_MUUT_FAILURE:
      return {
        ...state,
        muut: {
          isFetching: false,
          fetched: false,
          hasErrored: true
        }
      };
    case FETCH_KOULUTUS_START:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: true,
          fetched: false,
          hasErrored: false
        }
      };
    case FETCH_KOULUTUS_SUCCESS:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: false,
          fetched: true,
          hasErrored: false,
          data: [...state.poikkeukset.data, action.payload]
        }
      };
    case FETCH_KOULUTUS_FAILURE:
      return {
        ...state,
        poikkeukset: {
          ...state.poikkeukset,
          isFetching: false,
          fetched: false,
          hasErrored: true
        }
      };
    default:
      return state;
  }
}
