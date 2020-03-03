import { toast } from "react-toastify";

export const muutospyynnonLahettaminenOnnistui = {
  input: ["muutospyynto"],
  run: async ({ muutospyynto }) => {
    toast.success("Muutospyyntö lähetetty!", {
      autoClose: 2000,
      position: toast.POSITION.TOP_LEFT
    });
    return muutospyynto.jarjestajaYtunnus;
  },
  output: async ytunnus => {
    return ytunnus;
  },
  next: () => {
    return ["getUrlOfMuutospyyntojenListaus"];
  }
};
