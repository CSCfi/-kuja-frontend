import { toast } from "react-toastify";

export const PDFEsikatseludokumenttiValmis = {
  run: async () => {
    toast.success("PDF-muotoinen esikatseludokumentti on valmis katsottavaksi!", {
      autoClose: 8000,
      position: toast.POSITION.BOTTOM_LEFT
    });
    return true;
  }
};
