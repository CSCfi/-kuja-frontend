import { requiredFields } from "./requiredFields";
import { createRules } from "../utils";

export const yleisettiedot = createRules(requiredFields.yleisettiedot);

export const tilinpaatostiedot = createRules(requiredFields.tilinpaatostiedot);
