// 已重构
import { zhtw } from "./zh-tw";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import detector from "i18next-browser-languagedetector";

export type ResourcesKey = keyof typeof zhtw;

// the translations
// (tip move them in a JSON file and import them)
const resources = {
  zhtw: {
    translation: zhtw
  }
};

i18n
  .use(detector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "zhtw",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;