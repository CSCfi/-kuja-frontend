import React, { useReducer } from "react";
import reducer from "../services/muutoshakemus/reducer";
import {
  FIELD_ARRAY_NAMES
} from "../scenes/Jarjestajat/Jarjestaja/Hakemukset/Muutospyynto/modules/uusiHakemusFormConstants"

const initialState = {
  otsikko: 'Test title (temp)',
  // [FIELD_ARRAY_NAMES.TUTKINNOT_JA_KOULUTUKSET]: {}
  changes: {}
};

const MuutoshakemusContext = React.createContext(initialState);

const MuutoshakemusProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <MuutoshakemusContext.Provider value={{ state, dispatch }}>
      {props.children}
    </MuutoshakemusContext.Provider>
  );
};

export { MuutoshakemusContext, MuutoshakemusProvider };


// {
//   tutkinnot ja koulutukset,
//   opetus- ja tutkintokieli,
//   toiminta-alue,
//   OPISKELIJAVUODET JA NIITÄ KOSKEVAT RAJOITUKSET
//   MUUT OIKEUDET, VELVOLLISUUDET, EHDOT JA TEHTÄVÄT

// }