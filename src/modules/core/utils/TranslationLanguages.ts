import { enTranslation } from "../i18n/en";
import { esTranslation } from "../i18n/es";
import { ptTranslation } from "../i18n/pt";

export const TranslationLanguagesSelection = [
    {
        label: '🇬🇧 English',
        value: 'en'
    },
    {
        label: '🇪🇸 Español',
        value: 'es'
    },
    {
        label: '🇧🇷 Portuguese',
        value: 'pt'
    }
];

export const TranslationLanguages = {
    en: {
        translation: enTranslation
    },
    es: {
        translation: esTranslation
    },
    pt: {
        translation: ptTranslation
    }
};