import { requiredFields } from "./requiredFields";
import { createRules } from "../utils";
console.info(createRules(requiredFields.yleisettiedot));
export const yleisettiedot = createRules(requiredFields.yleisettiedot);
export const investoinnit = createRules(requiredFields.investoinnit);
