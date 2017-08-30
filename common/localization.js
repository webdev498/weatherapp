import I18n from 'react-native-i18n';

import en from './locales/en/translations.js';
import es from './locales/es/translations.js';
import zh from './locales/zh/translations.js';

I18n.fallbacks = true;
I18n.translations = {
  en,
  es,
  zh
};

export default I18n; 