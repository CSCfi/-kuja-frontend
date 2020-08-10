import { toast } from "react-toastify";

// muutospyynto.muutokset.asianumeroOK
export const asianumeroOK = formatMessage => ({
  label: "Ilmoitus siitä että asianumero ei ole ennestään käytössä",
  run: async () => {
    toast.success("Asianumero ei ole ennestään käytössä.", {
      autoClose: 2000,
      position: toast.POSITION.TOP_CENTER
    });
    return true;
  }
});
