import i18next, {
  LanguageDetectorModule,
  StringMap,
  TFunction,
  TOptions,
  i18n,
} from 'i18next';
import {
  initReactI18next,
  useTranslation as useTranslationBase,
} from 'react-i18next';
import { findBestAvailableLanguage } from 'react-native-localize';
import { TranslationKeys } from '../../types/translations';

const translations = {
  en: require('./translations/en.json'),
};

const availableTranslations = Object.keys(translations);

const defaultLanguage = { languageTag: 'en', isRTL: false };

const languageDetector: LanguageDetectorModule = {
  init: () => {},
  type: 'languageDetector',
  detect: () =>
    (findBestAvailableLanguage(availableTranslations) ?? defaultLanguage)
      .languageTag,
  cacheUserLanguage: () => {},
};

i18next.use(languageDetector).use(initReactI18next).init({
  fallbackLng: 'en',
  debug: __DEV__,
  resources: translations,
  defaultNS: 'common',
});

// specialize useTranslation hook to use generated translation keys
export interface CustomTFunction {
  (key: TranslationKeys, options?: TOptions<StringMap> | string): string;
}

type UseTranslationResponse = [TFunction, i18n, boolean] & {
  t: CustomTFunction;
  i18n: i18n;
  ready: boolean;
};

export const useTranslation = (
  ...params: Parameters<typeof useTranslationBase>
): UseTranslationResponse => useTranslationBase(...params);
