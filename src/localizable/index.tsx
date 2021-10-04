/* eslint-disable global-require */
import { TranslationKeys } from '../../types/translations';
import { Localizable } from '../../packages/i18n';
import * as en from './languages/en.json'

Localizable.fallbacks = true;
Localizable.defaultLocale = 'en';

Localizable.translations = {
  en,
};

export const translate = (translationKey: TranslationKeys) =>
  Localizable.t(translationKey);
