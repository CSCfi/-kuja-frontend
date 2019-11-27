import React from "react";
import JarjestamislupaAsiatList from "./JarjestamislupaAsiatList";
import { InnerContentContainer } from "../../../../modules/elements";
import PropTypes from "prop-types";

const JarjestamislupaAsiat = ({
  history,
  match,
  muutospyynnot,
  newApplicationRouteItem,
  organisaatio,
  intl
}) => {
  return (
    <InnerContentContainer>
      <div className="m-8">
        <JarjestamislupaAsiatList
          history={history}
          match={match}
          intl={intl}
          muutospyynnot={muutospyynnot}
          newApplicationRouteItem={newApplicationRouteItem}
          organisaatio={organisaatio}
        />
      </div>
    </InnerContentContainer>
  );
};

JarjestamislupaAsiat.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
  muutospyynnot: PropTypes.array,
  newApplicationRouteItem: PropTypes.object
};

export default JarjestamislupaAsiat;
