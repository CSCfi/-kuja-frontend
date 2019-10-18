import React, { useContext, useEffect, useMemo } from "react";
import { logoutUser } from "../../services/backendService/actions";
import styled from "styled-components";
import { BackendContext } from "../../context/backendContext";

const LogoutText = styled.div`
  padding: 14px 20px;
  line-height: 18px;
  width: 1200px;
  margin: auto;
`;

const Logout = () => {
  const { state: fromBackend = {}, dispatch } = useContext(BackendContext);

  /**
   * Abort controller instances are used for cancelling the related
   * XHR calls later.
   */
  const loggedOutUser = useMemo(() => {
    return logoutUser(dispatch);
  }, [dispatch]);

  useEffect(() => {
    console.info("logataan ulos");
    logoutUser(dispatch);
  }, [dispatch]);

  return (
    <LogoutText>
      <p>Olet kirjautunut ulos.</p>
    </LogoutText>
  );
};

export default Logout;
