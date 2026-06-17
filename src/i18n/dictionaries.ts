import type { Locale } from "./config";
import type en from "./dictionaries/en.json";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require(`./dictionaries/${locale}.json`);
  } catch {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require("./dictionaries/en.json");
  }
}
