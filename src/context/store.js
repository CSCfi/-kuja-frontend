import React from "react";
import { JarjestajatProvider } from "./jarjestajatContext";
import { KunnatProvider } from "./kunnatContext";
import { MaakunnatProvider } from "./maakunnatContext";
import { MuutospyynnotProvider } from "./muutospyynnotContext";
import { LupahistoriaProvider } from "./lupahistoriaContext";
import { LuvatProvider } from "./luvatContext";
import { UserProvider } from "./userContext";

const Store = ({ children }) => {
  return (
    <UserProvider>
      <JarjestajatProvider>
        <MaakunnatProvider>
          <KunnatProvider>
            <LuvatProvider>
              <LupahistoriaProvider>
                <MuutospyynnotProvider>{children}</MuutospyynnotProvider>
              </LupahistoriaProvider>
            </LuvatProvider>
          </KunnatProvider>
        </MaakunnatProvider>
      </JarjestajatProvider>
    </UserProvider>
  );
};

export default Store;
