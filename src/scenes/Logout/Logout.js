import React, { useContext, useEffect } from "react";
import { logoutUser } from "services/kayttajat/actions";
import styled from "styled-components";
import { UserContext} from '../../context/userContext'

const LogoutText = styled.div`
  padding: 14px 20px;
  line-height: 18px;
  width: 1200px;
  margin: auto;
`;

const Logout = () => {
  const { state, dispatch } = useContext(UserContext)
  useEffect(() => {
    logoutUser()(dispatch);
  }, []);

  return (
    <LogoutText>
      <p>Olet kirjautunut ulos.</p>
    </LogoutText>
  );
};

export default Logout;
