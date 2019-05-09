import React from "react";
import { UserProvider } from "./userContext";
// import { PaatoskierroksetProvider } from "./paatoskierroksetContext";
// import { ElykeskuksetProvider } from "./elykeskuksetContext";
// import { MuutosperustelutProvider } from "./muutosperustelutContext";
// import { MaaraystyypitProvider } from "./maaraystyypitContext";
// import { VankilatProvider } from "./vankilatContext";
// import { OppilaitoksenOpetuskieletProvider } from "./oppilaitoksenopetuskielet";

const Store = ({ children }) => {
  return (
    <UserProvider>
      {children}
    </UserProvider>
  );
};

export default Store;
