import React from "react";
import styled from "styled-components";
import JarjestamislupaAsiatList from "./JarjestamislupaAsiatList";
import { InnerContentContainer } from "../../../../modules/elements";

const LupaInnerContentWrapper = styled.div`
  margin: 40px 50px;
`;

const JarjestamislupaAsiat = ({ lupahistory, lupadata }) => {
  return (
    <InnerContentContainer>
      <LupaInnerContentWrapper>
        <JarjestamislupaAsiatList
          lupahistory={lupahistory}
        />
      </LupaInnerContentWrapper>
    </InnerContentContainer>
  );
};

export default JarjestamislupaAsiat;
