import React from "react";
import JarjestamislupaAsiatList from "./JarjestamislupaAsiatList";
import { InnerContentContainer } from "../../../../modules/elements";

const JarjestamislupaAsiat = (props) => {
  return (
    <InnerContentContainer>
      <div className="m-8">
        <JarjestamislupaAsiatList {...props} />
      </div>
    </InnerContentContainer>
  );
};

export default JarjestamislupaAsiat;
