/* eslint-disable global-require */
import Localizable from 'react-native-i18n';
import { TranslationKeys } from '../../types/translations';

Localizable.fallbacks = true;
Localizable.defaultLocale = 'en';

Localizable.translations = {
  en: require('./languages/en.json'),
};

export const translate = (translationKey: TranslationKeys) =>
  Localizable.t(translationKey);
