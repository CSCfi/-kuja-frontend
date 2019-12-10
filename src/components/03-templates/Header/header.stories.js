import React from "react";
import { storiesOf } from "@storybook/react";
import Header from ".";

storiesOf("Header", module).add("Basic layout", () => {
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
});
