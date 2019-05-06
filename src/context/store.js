import React from "react";
import { JarjestajatProvider } from "./jarjestajatContext";
import { KunnatProvider } from "./kunnatContext";
import { KoulutuksetProvider } from "./koulutuksetContext";
import { MaakunnatProvider } from "./maakunnatContext";
import { MuutospyynnotProvider } from "./muutospyynnotContext";
import { PaatoskierroksetProvider } from "./paatoskierroksetContext";
import { ElykeskuksetProvider } from "./elykeskuksetContext";
import { MuutosperustelutProvider } from "./muutosperustelutContext";
import { MaaraystyypitProvider } from "./maaraystyypitContext";
import { KoulutusalatProvider } from "./koulutusalatContext";
import { KoulutustyypitProvider } from "./koulutustyypitContext";
import { LupahistoriaProvider } from "./lupahistoriaContext";
import { LuvatProvider } from "./luvatContext";
import { UserProvider } from "./userContext";
import { VankilatProvider } from "./vankilatContext";

const Store = ({ children }) => {
  return (
    <UserProvider>
      <JarjestajatProvider>
        <MaakunnatProvider>
          <KunnatProvider>
            <LuvatProvider>
              <LupahistoriaProvider>
                <MuutosperustelutProvider>
                  <VankilatProvider>
                    <ElykeskuksetProvider>
                      <PaatoskierroksetProvider>
                        <MuutospyynnotProvider>
                          <KoulutusalatProvider>
                            <KoulutuksetProvider>
                              <MaaraystyypitProvider>
                                <KoulutustyypitProvider>
                                  {children}
                                </KoulutustyypitProvider>
                              </MaaraystyypitProvider>
                            </KoulutuksetProvider>
                          </KoulutusalatProvider>
                        </MuutospyynnotProvider>
                      </PaatoskierroksetProvider>
                    </ElykeskuksetProvider>
                  </VankilatProvider>
                </MuutosperustelutProvider>
              </LupahistoriaProvider>
            </LuvatProvider>
          </KunnatProvider>
        </MaakunnatProvider>
      </JarjestajatProvider>
    </UserProvider>
  );
};

export default Store;
