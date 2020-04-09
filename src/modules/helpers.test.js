import { resolveKoodiLocalization } from "./helpers";

it("should return undefined", () => {
  const result = resolveKoodiLocalization({}, "FI", "nimi", "kieli");
  expect(result).toEqual(undefined);
});

it("should parse a localized field", () => {
  const obj = [
    {
      kieli: "FI",
      nimi: "Test FI"
    },
    {
      kieli: "SV",
      nimi: "Test SV"
    }
  ];
  const result = resolveKoodiLocalization(obj, "FI", "nimi", "kieli");
  expect(result).toBe("Test FI");
});

it("should parse a localized field with alt message", () => {
  const obj = [
    {
      kieli: "SV",
      nimi: "Test SV"
    }
  ];
  const result = resolveKoodiLocalization(obj, "FI", "nimi", "kieli");
  expect(result).toBe("Test SV");
});

it("should work with defaults", () => {
  const obj = [
    {
      kieli: "FI",
      nimi: "Test FI"
    },
    {
      kieli: "SV",
      nimi: "Test SV"
    }
  ];
  const result = resolveKoodiLocalization(obj);
  expect(result).toBe("Test FI");
});
