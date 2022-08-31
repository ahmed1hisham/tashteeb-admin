import I18n from 'i18n-js';
import * as RNLocalize from 'react-native-localize';

import en from './locales/en';
import ar from './locales/ar';

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
}

I18n.defaultLocale = 'en';
I18n.fallbacks = true;
I18n.translations = {
  en,
  ar,
};
I18n.langs = ['en', 'ar'];

I18n.switchLanguage = () => {
  const index = I18n.langs.indexOf(I18n.locale);
  if (index === I18n.langs.length - 1) I18n.locale = I18n.langs[0];
  else I18n.locale = I18n.langs[index + 1];
};

export default I18n;
