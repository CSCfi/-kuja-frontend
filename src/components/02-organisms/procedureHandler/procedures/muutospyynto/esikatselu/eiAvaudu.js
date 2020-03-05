import { toast } from "react-toastify";

// muutospyynto.esikatselu.eiAvaudu
export const eiAvaudu = {
  label: "Virhe esikatselun avaamisessa",
  run: async () => {
    toast.error("Virhe esikatselun näyttämisessä", {
      autoClose: 5000,
      position: toast.POSITION.BOTTOM_LEFT
    });
    return false;
  }
};
