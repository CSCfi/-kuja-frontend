import React from "react";
import JarjestamislupaAsiatList from "./JarjestamislupaAsiatList";
import { InnerContentContainer } from "../../../../modules/elements";

const JarjestamislupaAsiat = ({ lupahistory, lupadata }) => {
  return (
    <InnerContentContainer>
      <div className="m-8">
        <JarjestamislupaAsiatList lupahistory={lupahistory} />
      </div>
    </InnerContentContainer>
  );
};

export default JarjestamislupaAsiat;
