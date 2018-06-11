import { API_BASE_URL } from "../../../../../../modules/constants"
import axios from "axios/index"
import { formatMuutospyynto } from "./muutospyyntoUtil"

// Constants
export const FETCH_MUUTOSPYYNTO_START = 'FETCH_MUUTOSPYYNTO_START'
export const FETCH_MUUTOSPYYNTO_SUCCESS = 'FETCH_MUUTOSPYYNTO_SUCCESS'
export const FETCH_MUUTOSPYYNTO_FAILURE = 'FETCH_MUUTOSPYYNTO_FAILURE'

export const CREATE_MUUTOSPYYNTO_START = 'CREATE_MUUTOSPYYNTO_START'
export const CREATE_MUUTOSPYYNTO_SUCCESS = 'CREATE_MUUTOSPYYNTO_SUCCESS'
export const CREATE_MUUTOSPYYNTO_FAILURE = 'CREATE_MUUTOSPYYNTO_FAILURE'

export const PREVIEW_MUUTOSPYYNTO_START = 'PREVIEW_MUUTOSPYYNTO_START'
export const PREVIEW_MUUTOSPYYNTO_SUCCESS = 'PREVIEW_MUUTOSPYYNTO_SUCCESS'
export const PREVIEW_MUUTOSPYYNTO_FAILURE = 'PREVIEW_MUUTOSPYYNTO_FAILURE'

export const SAVE_MUUTOSPYYNTO_START = 'SAVE_MUUTOSPYYNTO_START'
export const SAVE_MUUTOSPYYNTO_SUCCESS = 'SAVE_MUUTOSPYYNTO_SUCCESS'
export const SAVE_MUUTOSPYYNTO_FAILURE = 'SAVE_MUUTOSPYYNTO_FAILURE'

export const UPDATE_MUUTOSPYYNTO_START = 'UPDATE_MUUTOSPYYNTO_START'
export const UPDATE_MUUTOSPYYNTO_SUCCESS = 'UPDATE_MUUTOSPYYNTO_SUCCESS'
export const UPDATE_MUUTOSPYYNTO_FAILURE = 'UPDATE_MUUTOSPYYNTO_FAILURE'

// Actions
export function fetchMuutospyynto(uuid) {
  console.log('fetchMuutospyynto ', uuid)
  if (uuid) {
    return (dispatch) => {
      dispatch({ type: FETCH_MUUTOSPYYNTO_START })

      const request = fetch(`${API_BASE_URL}/muutospyynnot/id/${uuid}`)

      request
        .then((response) => response.json())
        .then((data) => {
          dispatch({ type: FETCH_MUUTOSPYYNTO_SUCCESS, payload: data })
        })
        .catch((err) => dispatch({ type: FETCH_MUUTOSPYYNTO_FAILURE, payload: err }))
    }
  }
}

export function createMuutospyynto(muutospyynto) {
  console.log('createMuutospyynto', muutospyynto)

  const formatted = formatMuutospyynto(muutospyynto)

  console.log('formatted', formatted)

  return (dispatch) => {
    dispatch({ type: CREATE_MUUTOSPYYNTO_START })

    return axios.put(`${API_BASE_URL}/muutospyynnot/create`, formatted)
      .then(response => {
        dispatch({ type: CREATE_MUUTOSPYYNTO_SUCCESS, payload: response })
      })
      .catch(err => {
        dispatch({ type: CREATE_MUUTOSPYYNTO_FAILURE, payload: err })
      })
  }
}

export function saveMuutospyynto(muutospyynto) {
  console.log('saveMuutospyynto', muutospyynto)

  const formatted = formatMuutospyynto(muutospyynto)

  console.log('formatted', formatted)

  return (dispatch) => {
    dispatch({ type: SAVE_MUUTOSPYYNTO_START})

    axios.put(`${API_BASE_URL}/muutospyynnot/create`, formatted, { withCredentials: true })
      .then(response => {
        dispatch({ type: SAVE_MUUTOSPYYNTO_SUCCESS, payload: response })
      })
      .catch(err => {
        dispatch({ type: SAVE_MUUTOSPYYNTO_FAILURE, payload: err })
      })
  }
}

export function updateMuutospyynto(muutospyynto) {
  console.log('updateMuutospyynto', muutospyynto)

  const formatted = formatMuutospyynto(muutospyynto)

  console.log('formatted', formatted)

  return (dispatch) => {
    dispatch({ type: UPDATE_MUUTOSPYYNTO_START })

    axios.post(`${API_BASE_URL}/muutospyynnot/update`, formatted, { withCredentials: true })
      .then(response => {
        dispatch({ type: UPDATE_MUUTOSPYYNTO_SUCCESS, payload: response })
      })
      .catch(err => {
        dispatch({ type: UPDATE_MUUTOSPYYNTO_FAILURE, payload: err })
      })
  }
}

export function previewMuutospyynto(muutospyynto) {

//    const formatted = formatMuutospyynto(muutospyynto)

    const formatted = "{\n" +
        "  \"diaarinumero\": \"43/531/2017\",\n" +
        "  \"hakupvm\": \"2017-08-13\",\n" +
        "  \"id\": 0,\n" +
        "  \"jarjestajaOid\": \"1.2.246.562.10.48442622063\",\n" +
        "  \"jarjestajaYtunnus\": \"0208201-1\",\n" +
        "  \"luoja\": \"oiva-sanni\",\n" +
        "  \"luontipvm\": \"2017-08-13\",\n" +
        "  \"lupaId\": 43,\n" +
        "  \"paatoskierrosId\": 19,\n" +
        "  \"paivittaja\": \"string\",\n" +
        "  \"paivityspvm\": null,\n" +
        "  \"tila\": \"LUONNOS\",\n" +
        "  \"voimassaalkupvm\": \"2018-01-01\",\n" +
        "  \"voimassaloppupvm\": \"2018-12-31\",\n" +
        "  \"muutosperustelu\": {\n" +
        "    \"arvo\": \"\",\n" +
        "    \"koodiarvo\": \"01\",\n" +
        "    \"koodisto\": \"oivaperustelut\",\n" +
        "    \"luoja\": \"oiva-sanni\",\n" +
        "    \"luontipvm\": \"2017-08-13\",\n" +
        "    \"meta\": {\n" +
        "      \"perusteluteksti\": \"Työttömyys nousee\"\n" +
        "    }\n" +
        "  },\n" +
        "  \"muutokset\": [ \n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 1,\n" +
        "\t\t  \"koodiarvo\": \"447101\",\n" +
        "\t\t  \"koodisto\": \"koulutus\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 1,\n" +
        "\t\t  \"koodiarvo\": \"457503\",\n" +
        "\t\t  \"koodisto\": \"koulutus\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 2\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 1,\n" +
        "\t\t  \"koodiarvo\": \"321604\",\n" +
        "\t\t  \"koodisto\": \"koulutus\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 2\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"POISTO\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 2,\n" +
        "\t\t  \"koodiarvo\": \"1\",\n" +
        "\t\t  \"koodisto\": \"oppilaitoksenopetuskieli\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 3,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"opetuskielen lisäys\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 2,\n" +
        "\t\t  \"koodiarvo\": \"1\",\n" +
        "\t\t  \"parentId\": \"321604\",\n" +
        "\t\t  \"koodisto\": \"kieli\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 3,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"tutkintokielen lisäys\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 4,\n" +
        "\t\t  \"koodiarvo\": \"3\",\n" +
        "\t\t  \"koodisto\": \"koulutussektori\",\n" +
        "\t\t  \"arvo\": \"6650\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 3\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 4,\n" +
        "\t\t  \"koodiarvo\": \"2\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"arvo\": \"50\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 2,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 3\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 4,\n" +
        "\t\t  \"koodiarvo\": \"4\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"arvo\": \"60\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 2,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 3\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 3,\n" +
        "\t\t  \"koodiarvo\": \"01\",\n" +
        "\t\t  \"koodisto\": \"maakunta\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 3,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"1\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4asdsadasasdas\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"2\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"3\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"4\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"5\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"6\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"7\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"kokeilu\": \"laskdjlaks lkjd lkasjdlkasjdklajskl\", \"perusteluteksti\":\"ljoojojojojojoj\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"8\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"yhteistyösopimus\": \"Yhteistyötä loremin kanssa\", \"perusteluteksti\":\"perusteluita\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"9\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"10\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"11\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 5,\n" +
        "\t\t  \"koodiarvo\": \"12\",\n" +
        "\t\t  \"koodisto\": \"oivamuutoikeudetvelvollisuudetehdotjatehtavat\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 1,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 4\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t},\n" +
        " \t    {\n" +
        "\t\t  \"kohdeId\": 3,\n" +
        "\t\t  \"koodiarvo\": \"287\",\n" +
        "\t\t  \"koodisto\": \"kunta\",\n" +
        "\t\t  \"luoja\": \"oiva-sanni\",\n" +
        "   \t\t  \"luontipvm\": \"2018-03-15\",\n" +
        "\t\t  \"maaraystyyppiId\": 3,\n" +
        "\t\t  \"meta\": {\n" +
        "\t\t    \"perusteluteksti\": \"Lorem ipsum 5\"\n" +
        "\t\t  },\n" +
        "\t\t  \"tila\": \"LISAYS\"\n" +
        "\t\t}\n" +
        "  ]\n" +
        "}"


    return (dispatch) => {
        dispatch({ type: PREVIEW_MUUTOSPYYNTO_START })

        return axios.put(`${API_BASE_URL}/pdf/muutospyyntoObjToPdf`,
            formatted,
            {
                responseType: 'arraybuffer',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/pdf'
                }
            })
            .then(response => {
                dispatch({ type: PREVIEW_MUUTOSPYYNTO_SUCCESS, payload: response })
            })
            .catch(err => {
                dispatch({ type: PREVIEW_MUUTOSPYYNTO_FAILURE, payload: err })
            })
    }
}

export const actions = {
  fetchMuutospyynto,
  createMuutospyynto,
  previewMuutospyynto,
  saveMuutospyynto,
  updateMuutospyynto
}

// Action handlers
const ACTION_HANDLERS = {
  [FETCH_MUUTOSPYYNTO_START]    : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [FETCH_MUUTOSPYYNTO_SUCCESS]  : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      data: action.payload
    }
  },
  [FETCH_MUUTOSPYYNTO_FAILURE]  : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
  },
  [CREATE_MUUTOSPYYNTO_START]   : (state, action) => {
      return {
          ...state,
          create: {
              isSubmitting: true,
              isCreated: false,
              hasErrored: false,
          }
      }
  },
  [CREATE_MUUTOSPYYNTO_SUCCESS]   : (state, action) => {
      return {
          ...state,
          create: {
              isSubmitting: false,
              isCreated: true,
              hasErrored: false,
              response: action.payload
          }
      }
  },
  [CREATE_MUUTOSPYYNTO_FAILURE]   : (state, action) => {
      return {
          ...state,
          create: {
              isSubmitting: false,
              hasCreated: false,
              hasErrored: true,
              response: action.payload
          }
      }
  },
  [PREVIEW_MUUTOSPYYNTO_START]   : (state, action) => {
    return {
      ...state,
      isFetching: true,
      fetched: false,
      hasErrored: false
    }
  },
  [PREVIEW_MUUTOSPYYNTO_SUCCESS]   : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: true,
      hasErrored: false,
      pdf: action.payload
    }
  },
  [PREVIEW_MUUTOSPYYNTO_FAILURE]   : (state, action) => {
    return {
      ...state,
      isFetching: false,
      fetched: false,
      hasErrored: true
    }
  },
  [SAVE_MUUTOSPYYNTO_START] : (state, action) => {
    return {
      ...state,
      save: {
        isSaving: true,
        saved: false,
        hasErrored: false
      }
    }
  },
  [SAVE_MUUTOSPYYNTO_SUCCESS] : (state, action) => {
    return {
      ...state,
      save: {
        isSaving: false,
        saved: true,
        hasErrored: false
      }
    }
  },
  [SAVE_MUUTOSPYYNTO_FAILURE] : (state, action) => {
    return {
      ...state,
      save: {
        isSaving: false,
        saved: false,
        hasErrored: true
      }
    }
  },
  [UPDATE_MUUTOSPYYNTO_START] : (state, action) => {
    return {
      ...state,
      update: {
        isUpdating: true,
        updated: false,
        hasErrored: false
      }
    }
  },
  [UPDATE_MUUTOSPYYNTO_SUCCESS] : (state, action) => {
    return {
      ...state,
      update: {
        isUpdating: false,
        updated: true,
        hasErrored: false
      }
    }
  },
  [UPDATE_MUUTOSPYYNTO_FAILURE] : (state, action) => {
    return {
      ...state,
      update: {
        isUpdating: false,
        updated: false,
        hasErrored: true
      }
    }
  }
}

// Reducer
const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: {},
  create: undefined
}

export default function muutospyyntoReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
