// muutospyynto.muutokset.tarkistaDuplikaattiAsianumero
import {postData} from "../../../fetch";

export const tarkistaDuplikaattiAsianumero = {
  label: "Tarkistaa onko asianumero jo olemassa järjestelmässä",
  input: ["uuid", "asianumero"],
  run: async ({uuid, asianumero}) => {
    let formData = new FormData();
    formData.append('uuid', uuid);
    formData.append('asianumero', asianumero);
    console.log('postData');
    const response = await postData("tarkistaDuplikaattiAsianumero", formData);
    const json = await response.json();
    console.log('jsonSaatu');
    return {
      result: json,
      status: response.status
    };
  }
};
