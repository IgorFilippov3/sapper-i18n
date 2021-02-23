import { promises } from "fs";
import { resolve } from "path";

const cache = new Map(); 
const DEFAULT_LOCALE = "ru";
const LOCALE_IDS = ["ru", "en", "de"];

export async function getLocale(url) {
  const localeID = getLocaleID(url);

  const cachedLocale = cache.get(localeID);

  if (cachedLocale) {
    return cachedLocale;
  }

  let locale;

  try {
    locale = await loadLocale(localeID);
  } catch (err) {
    if (err.code === "ENOENT") {
      locale = await loadLocale(DEFAULT_LOCALE);
    } else {
      console.error(err);
    }
  }

  cache.set(localeID, locale);

  return locale;
}

function loadLocale(localeID) {
  return promises.readFile(resolve(__dirname, `./locale/messages.${localeID}.json`), {
    encoding: "utf8"
  });
}

function getLocaleID(url) {
  const langFragment = url.split("/")[1];
  return LOCALE_IDS.includes(langFragment)
    ? langFragment
    : DEFAULT_LOCALE;
}
