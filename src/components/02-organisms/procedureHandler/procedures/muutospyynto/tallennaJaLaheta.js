import { postData } from "../../fetch";

export const tallennaJaLahetaMuutospyynto = {
  title: "Muutospyynnon tallentaminen ja lähettäminen",
  input: ["formData"],
  run: async ({ formData }) => {
    const response = await postData("tallennaMuutospyynto", formData);
    return response;
  },
  output: async response => {
    if (response) {
      return await response.json();
    } else {
      return response;
    }
  },
  next: output => {
    if (output.uuid) {
      return [
        "muutospyynnonTallennusOnnistui",
        "asetaMuutospyynnonTilaksiAvoin"
      ];
    }
    return ["muutospyynnonLahettaminenEpaonnistui"];
  }
};
