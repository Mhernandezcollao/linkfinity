import { TranslationLanguages } from "./TranslationLanguages";

export const STORAGE_KEY_LANGUAGE = '@STORAGE_KEY_LANGUAGE';
const languageSelected = localStorage.getItem(STORAGE_KEY_LANGUAGE);

export const TranslationConfig = {
    resources: TranslationLanguages,
    lng: languageSelected || 'es', // DEFAULT
    fallbackLng: 'es', // USE IF NO TRANSLATION EXIST
    interpolation: {
        escapeValue: false,
    }
};