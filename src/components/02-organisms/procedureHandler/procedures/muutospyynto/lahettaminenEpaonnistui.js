import { toast } from "react-toastify";

export const muutospyynnonLahettaminenEpaonnistui = {
  run: async () => {
    toast.error("Virhe muutospyynnön lähettämisessä", {
      autoClose: 2000,
      position: toast.POSITION.TOP_LEFT
    });
    return true;
  }
};
