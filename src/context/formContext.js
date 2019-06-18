import React, { useReducer } from "react";
import reducer from "../services/muutoshakemus/reducer";

const initialState = {
  tutkinnot: {
    changes: {}
  },
  koulutukset: {
    changes: {}
  },
  opetuskielet: {
    changes: {}
  },
  tutkintokielet: {
    changes: {}
  }
};

const FormContext = React.createContext(initialState);

const FormProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <FormContext.Provider value={{ state, dispatch }}>
      {props.children}
    </FormContext.Provider>
  );
};

export { FormContext, FormProvider };
