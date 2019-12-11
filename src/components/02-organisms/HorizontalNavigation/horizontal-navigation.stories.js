import React from "react";
import { storiesOf } from "@storybook/react";
import HorizontalNavigation from ".";

storiesOf("HorizontalNavigation", module).add("Basic layout", () => {
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
  return <HorizontalNavigation links={links}></HorizontalNavigation>;
});
