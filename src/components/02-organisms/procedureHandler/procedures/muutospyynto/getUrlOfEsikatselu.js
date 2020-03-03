export const getUrlOfEsikatselu = {
  input: ["muutospyynto"],
  run: ({ muutospyynto }) => {
    return `/api/pdf/esikatsele/muutospyynto/${muutospyynto.uuid}`;
  },
  output: url => {
    return url;
  },
  next: url => {
    if (url) {
      return ["PDFEsikatseludokumenttiValmis"];
    }
  }
};
