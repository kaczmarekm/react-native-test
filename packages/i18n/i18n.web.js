export const Localizable = {
  fallbacks: true,
  defaultLocale: 'en',
  translations: {},
  t: (key) => {
    return Localizable.translations[Localizable.defaultLocale].key;
  },
};
