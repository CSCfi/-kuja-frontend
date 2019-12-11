import React from "react";
import { storiesOf } from "@storybook/react";
import Header from ".";
import HorizontalNavigation from "../HorizontalNavigation";

storiesOf("Header", module)
  .add("Basic layout", () => {
    return (
      <Header
        inFinnish="Suomeksi"
        inSwedish="På svenska"
        isLoggedIn={false}
        locale="fi"
        logIn="Kirjaudu sisään"
        logo={{ text: "Oiva", path: "/" }}
        logoutLink={{
          text: ["Kirjaudu ulos", "(oiva-sanni)"],
          path: "example.path.fi"
        }}
        onLocaleChange={(...props) => {
          console.info(props);
        }}
        onMenuClick={(...props) => {
          console.info(props);
        }}
        organisation={{
          text: "Jyväskylän koulutuskuntayhtymä",
          path: "/"
        }}
        shortDescription={{
          text: "Opetushallinnon ohjaus- ja säätelypalvelu",
          path: "/"
        }}></Header>
    );
  })
  .add("Header and HorizontalNavigation", () => {
    const links = [
      {
        path: "/esi-ja-perusopetus",
        text: "Esi- ja perusopetus",
        isExact: false
      },
      { path: "/lukiokoulutus", text: "Lukiokoulutus" },
      { path: "/jarjestajat", text: "Ammatillinen koulutus" },
      { path: "/vapaa-sivistystyo", text: "Vapaa sivistystyö" },
      { path: "/tilastot", text: "Tilastot" }
    ];
    return (
      <React.Fragment>
        <Header
          inFinnish="Suomeksi"
          inSwedish="På svenska"
          isLoggedIn={false}
          locale="fi"
          logIn="Kirjaudu sisään"
          logo={{ text: "Oiva", path: "/" }}
          logoutLink={{
            text: ["Kirjaudu ulos", "(oiva-sanni)"],
            path: "example.path.fi"
          }}
          onLocaleChange={(...props) => {
            console.info(props);
          }}
          onMenuClick={(...props) => {
            console.info(props);
          }}
          organisation={{
            text: "Jyväskylän koulutuskuntayhtymä",
            path: "/"
          }}
          shortDescription={{
            text: "Opetushallinnon ohjaus- ja säätelypalvelu",
            path: "/"
          }}></Header>
        <HorizontalNavigation links={links}></HorizontalNavigation>
      </React.Fragment>
    );
  });
