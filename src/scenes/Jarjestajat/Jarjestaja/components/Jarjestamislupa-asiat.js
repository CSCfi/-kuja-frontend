import React from "react";
import JarjestamislupaAsiatList from "./JarjestamislupaAsiatList";
import { InnerContentContainer } from "../../../../modules/elements";
import PropTypes from "prop-types";

const JarjestamislupaAsiat = ({
  lupahistory,
  match,
  muutospyynnot,
  newApplicationRouteItem
}) => {
  return (
    <InnerContentContainer>
      <div className="m-8">
        <JarjestamislupaAsiatList
          lupahistory={lupahistory}
          match={match}
          muutospyynnot={muutospyynnot}
          newApplicationRouteItem={newApplicationRouteItem}
        />
      </div>
    </InnerContentContainer>
  );
};

JarjestamislupaAsiat.propTypes = {
  lupahistory: PropTypes.array,
  match: PropTypes.object,
  muutospyynnot: PropTypes.array,
  newApplicationRouteItem: PropTypes.object
};

export default JarjestamislupaAsiat;
