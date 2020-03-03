import { toast } from "react-toastify";

export const muutospyynnonTallennusEpaonnistui = {
  run: async () => {
    toast.error("Virhe muutospyynnön käsittelyssä", {
      autoClose: 2000,
      position: toast.POSITION.TOP_LEFT
    });
    return true;
  }
};
