import { toast } from "react-toastify";

export const muutospyynnonTallennusOnnistui = {
  run: async () => {
    toast.success("Muutospyyntö tallennettu!", {
      autoClose: 2000,
      position: toast.POSITION.TOP_LEFT
    });
    return true;
  }
};
