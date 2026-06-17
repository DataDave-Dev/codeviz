import { describe, expect, test } from "vitest";
import { locales } from "./config";
import { getDictionary } from "./dictionaries";

function getKeys(obj: Record<string, unknown>, prefix = ""): string[] {
  let keys: string[] = [];
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const val = obj[key];
      const fullKey = prefix ? `${prefix}.${key}` : key;
      keys.push(fullKey);
      if (typeof val === "object" && val !== null) {
        keys = keys.concat(getKeys(val as Record<string, unknown>, fullKey));
      }
    }
  }
  return keys.sort();
}

describe("i18n dictionaries validation", () => {
  const enKeys = getKeys(getDictionary("en"));

  test.each(locales.filter((l) => l !== "en"))(
    "locale '%s' should match English keys exactly",
    (locale) => {
      const localeKeys = getKeys(getDictionary(locale));
      expect(localeKeys).toEqual(enKeys);
    }
  );
});
