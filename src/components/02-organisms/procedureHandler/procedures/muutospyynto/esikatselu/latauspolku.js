// muutospyynto.esikatselu.latauspolku
export const latauspolku = {
  label: "Esikatselun valmistelu",
  input: ["muutospyynto"],
  run: ({ muutospyynto }) => {
    return muutospyynto && muutospyynto.uuid
      ? `/api/pdf/esikatsele/muutospyynto/${muutospyynto.uuid}`
      : null;
  },
  next: url => {
    console.info(url);
    return url
      ? ["muutospyynto.esikatselu.onKatsottavissa"]
      : ["muutospyynto.esikatselu.eiAvaudu"];
  }
};
