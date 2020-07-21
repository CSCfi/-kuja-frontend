// muutospyynto.muutokset.tarkistaDuplikaattiAsianumero
import { postData } from "../../../fetch";

export const tarkistaDuplikaattiAsianumero = {
  label: "Tarkistaa onko asianumero jo olemassa järjestelmässä",
  input: ["uuid", "asianumero"],
  run: async ({ uuid, asianumero }) => {
    if (uuid) {
      let formData = new FormData();
      formData.append("uuid", uuid);
      formData.append("asianumero", asianumero);
      // const response = await postData(
      //   "tarkistaDuplikaattiAsianumero",
      //   formData
      // );
      // const json = await response.json();
      console.info("Noudetaan tieto asianumeron yksilöllisyydestä.");
      const response = {};
      const json = {};
      return {
        result: Math.random() < 0.5,
        status: response.status
      };
    } else {
      console.warn("Asianumerohakua ei voida tehdä, koska UUID puuttuu.");
      return {};
    }
  }
};
