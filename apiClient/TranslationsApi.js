import { apiGetFetch } from "./apiFetch";

export const fetchTranslations = (lang) =>
  apiGetFetch(`/locales/${lang}/translation.json`, {});

// TODO: Implement backend
export const putTranslations = (lang, data) =>
  console.log("putTranslations", lang, data);
