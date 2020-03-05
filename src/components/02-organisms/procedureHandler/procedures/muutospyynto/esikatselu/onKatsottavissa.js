import { toast } from "react-toastify";

// muutospyynto.esikatselu.onKatsottavissa
export const onKatsottavissa = {
  label: "PDF katsottavissa",
  run: async () => {
    toast.success("PDF-muotoinen esikatseludokumentti on valmis katsottavaksi!", {
      autoClose: 8000,
      position: toast.POSITION.BOTTOM_LEFT
    });
    return true;
  }
};
