import React, { useReducer } from "react";
import reducer from "services/oppilaitoksenopetuskielet/reducer";

const initialState = {
  isFetching: false,
  fetched: false,
  hasErrored: false,
  data: []
};

const OppilaitoksenOpetuskieletContext = React.createContext(initialState);

const OppilaitoksenOpetuskieletProvider = props => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <OppilaitoksenOpetuskieletContext.Provider value={{ state, dispatch }}>
      {props.children}
    </OppilaitoksenOpetuskieletContext.Provider>
  );
};

export { OppilaitoksenOpetuskieletContext, OppilaitoksenOpetuskieletProvider };
