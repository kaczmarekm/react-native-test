/* eslint-disable global-require */
import { TranslationKeys } from '../../types/translations';
import { Localizable } from '../../packages/i18n';

Localizable.fallbacks = true;
Localizable.defaultLocale = 'en';

Localizable.translations = {
  en: require('./languages/en.json'),
};

export const translate = (translationKey: TranslationKeys) =>
  Localizable.t(translationKey);
