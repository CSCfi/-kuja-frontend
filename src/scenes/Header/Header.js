import React, { useEffect } from "react";
import styled from "styled-components";
import HeaderBar from "./components/HeaderBar";
import LinkItemUpper from "./components/LinkItemUpper";
import LinkItem from "./components/LinkItem";
import { ROLE_ESITTELIJA } from "modules/constants";
import { COLORS, FONT_STACK } from "modules/styles";
import { getOrganization } from "services/kayttajat/actions";

const HeaderTitle = styled.div`
  font-family: "Arial";
  font-size: 16px;
  color: black;
  text-decoration: none;
  padding: 14px 0px;
  margin-left: 30px;
  line-height: 18px;
`;

const HeaderBarUpper = styled.div`
  display: flex;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  margin: 0 auto;
  width: 100%;
  background: ${COLORS.WHITE};
  max-height: 50px;
`;

const HeaderBarLower = styled.div`
  display: flex;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : "flex-start"};
  margin: 0 auto;
  padding-left: 20px;
  width: 100%;
  background: ${COLORS.OIVA_MENU_BG_COLOR};
  max-height: 50px;
`;

const HeaderUpperRight = styled.div`
  padding: 14px 20px;
  line-height: 18px;
`;

const Header = ({ user = {}, oppilaitos, dispatch }) => {
  const ytunnus =
    oppilaitos && oppilaitos.organisaatio
      ? oppilaitos.organisaatio.ytunnus
      : false;

  useEffect(() => {
    if (user && user.oid) {
      getOrganization(user.oid)(dispatch);
    }
  }, [user]);

  return (
    <React.Fragment>
      <HeaderBar>
        <HeaderBarUpper maxWidth="1280px" justifyContent="space-between">
          <HeaderTitle>
            Oiva - Opetushallinnon ohjaus- ja säätelypalvelu
          </HeaderTitle>

          <HeaderUpperRight>
            {!sessionStorage.getItem("role") ? (
              <LinkItemUpper
                to="/cas-auth"
                className="has-separator pull-right"
              >
                Kirjaudu sisään
              </LinkItemUpper>
            ) : null}

            {user && user.username && (
              <LinkItemUpper
                to="/cas-logout"
                className="has-separator pull-right"
              >
                Kirjaudu ulos ({user.username})
              </LinkItemUpper>
            )}

            <LinkItemUpper to="/fi" className="has-separator pull-right">
              Suomeksi
            </LinkItemUpper>
            <LinkItemUpper to="/sv" className="pull-right">
              På svenska
            </LinkItemUpper>
          </HeaderUpperRight>
        </HeaderBarUpper>
      </HeaderBar>
      <HeaderBar>
        <HeaderBarLower>
          {/* TODO: localization! */}
          <LinkItem to="/" exact fontFamily={FONT_STACK.OPEN_SANS_REGULAR}>
            Etusivu
          </LinkItem>
          <LinkItem to="/esi-ja-perusopetus">Esi- ja perusopetus</LinkItem>
          <LinkItem to="/lukiokoulutus">Lukiokoulutus</LinkItem>
          <LinkItem to="/jarjestajat">Ammatillinen koulutus</LinkItem>
          <LinkItem to="/vapaa-sivistystyo">Vapaa sivistystyö</LinkItem>
          <LinkItem to="/tilastot">Tilastot</LinkItem>

          {ytunnus && (
            <LinkItem
              // onClick={this.forceUpdate}
              ytunnus={ytunnus}
              to={{
                pathname: "/jarjestajat/" + ytunnus + "/omattiedot",
                ytunnus: ytunnus
              }}
              exact
            >
              Oma organisaatio
            </LinkItem>
          )}

          {sessionStorage.getItem("role") === ROLE_ESITTELIJA ? (
            <LinkItem to="/asiat">Asiat</LinkItem>
          ) : null}
        </HeaderBarLower>
      </HeaderBar>
    </React.Fragment>
  );
};

// const Header = () => {
//   const { state, dispatch } = useContext(UserContext);

//   useEffect(() => {
//     console.log(state, dispatch);
//   });

//   return (
//     <div>
//       HEADER: {state.id}
//       <button
//         type="button"
//         onClick={() => {
//           dispatch({ type: "LOGIN_GET_ROLES_START", payload: 1 });
//         }}
//       >
//         Click me!
//       </button>
//     </div>
//   );
// };

export default Header;
