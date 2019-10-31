import React, { useContext, useEffect } from "react";
import { logoutUser } from "../../services/backendService/actions";
import styled from "styled-components";
import { BackendContext } from "../../context/backendContext";
import { MessageWrapper } from "../../modules/elements";

const LogoutText = styled.div`
  padding: 14px 20px;
  line-height: 18px;
  width: 1200px;
  margin: auto;
`;

const Logout = () => {
  const { ...context } = useContext(BackendContext);

  useEffect(() => {
    logoutUser(context.dispatch);
  }, [context.dispatch]);

  return (
    <LogoutText>
      <MessageWrapper>Olet kirjautunut ulos.</MessageWrapper>
    </LogoutText>
  );
};

export default Logout;
