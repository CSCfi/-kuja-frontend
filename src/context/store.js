import React from "react";
import { JarjestajatProvider } from "./jarjestajatContext";
import { MuutospyynnotProvider } from "./muutospyynnotContext";
import { KunnatProvider } from "./kunnatContext";
import { LuvatProvider } from './luvatContext';
import { UserProvider } from "./userContext";

const Store = ({ children }) => {
  return (
    <UserProvider>
      <JarjestajatProvider>
        <KunnatProvider>
          <LuvatProvider>
            <MuutospyynnotProvider>{children}</MuutospyynnotProvider>
          </LuvatProvider>
        </KunnatProvider>
      </JarjestajatProvider>
    </UserProvider>
  );
};

export default Store;
