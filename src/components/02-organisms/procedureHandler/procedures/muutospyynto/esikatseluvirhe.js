import { toast } from "react-toastify";

export const esikatseluvirhe = {
  run: async () => {
    toast.error("Virhe esikatselun näyttämisessä", {
      autoClose: 2000,
      position: toast.POSITION.TOP_LEFT
    });
    return true;
  }
};
