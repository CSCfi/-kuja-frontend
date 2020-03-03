import { postData } from "../../fetch";

export const asetaMuutospyynnonTilaksiAvoin = {
  title: "Muutospyynnön asettaminen avoimeksi",
  input: ["muutospyynto"],
  run: async ({ muutospyynto }) => {
    await postData("lahetaMuutospyynto", null, {
      urlEnding: muutospyynto.uuid
    });
    return muutospyynto;
  },
  output: async (muutospyynto) => {
    return muutospyynto;
  },
  next: output => {
    if (output) {
      return ["muutospyynnonLahettaminenOnnistui"];
    }
    return ["muutospyynnonLahettaminenEpaonnistui"];
  }
};
