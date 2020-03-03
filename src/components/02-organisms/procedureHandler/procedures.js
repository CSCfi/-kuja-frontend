import { muutospyynnonTallennusEpaonnistui } from "./procedures/muutospyynto/tallennusEpaonnistui";
import { muutospyynnonTallennusOnnistui } from "./procedures/muutospyynto/tallennusOnnistui";
import { tallennaMuutospyynto } from "./procedures/muutospyynto/tallenna";
import { tallennaJaLahetaMuutospyynto } from "./procedures/muutospyynto/tallennaJaLaheta";
import { muutospyynnonLahettaminenEpaonnistui } from "./procedures/muutospyynto/lahettaminenEpaonnistui";
import { muutospyynnonLahettaminenOnnistui } from "./procedures/muutospyynto/lahettaminenOnnistui";
import { asetaMuutospyynnonTilaksiAvoin } from "./procedures/muutospyynto/asetaTilaksiAvoin";
import { getUrlOfMuutospyyntojenListaus } from "./procedures/muutospyynnot/getUrlOfMuutospyyntojenListaus";
import { esikatseluvirhe } from "./procedures/muutospyynto/esikatseluvirhe";
import { tallennusJaEsikatselu } from "./procedures/muutospyynto/tallennusJaEsikatselu";
import { getUrlOfEsikatselu } from "./procedures/muutospyynto/getUrlOfEsikatselu";
import { PDFEsikatseludokumenttiValmis } from "./procedures/muutospyynto/esikatseluPDFKatsottavissa";
import { muutospyynnonTallennusJaIlmoitus } from "./procedures/muutospyynto/tallennusJaIlmoitus";

export const procedures = {
  asetaMuutospyynnonTilaksiAvoin,
  getUrlOfEsikatselu,
  getUrlOfMuutospyyntojenListaus,
  esikatseluvirhe,
  muutospyynnonLahettaminenEpaonnistui,
  muutospyynnonLahettaminenOnnistui,
  muutospyynnonTallennusEpaonnistui,
  muutospyynnonTallennusJaIlmoitus,
  muutospyynnonTallennusOnnistui,
  PDFEsikatseludokumenttiValmis,
  tallennaJaLahetaMuutospyynto,
  tallennaMuutospyynto,
  tallennusJaEsikatselu
};
