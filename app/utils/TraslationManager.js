import I18n from '../utils/I18n/I18n';
import {I18nManager} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNRestart from 'react-native-restart';

export const setI18nConfig = lang => {
  I18n.locale = lang;
};

export const changeLanguage = async lang => {
  setI18nConfig(lang);
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  if (lang === 'ar' && I18nManager.isRTL === false) {
    RNRestart.Restart();
  }
  if (lang === 'en' && I18nManager.isRTL === true) {
    RNRestart.Restart();
  }
  await AsyncStorage.setItem('language', lang);
  return;
};

export const chooseLanguage = async lang => {
  setI18nConfig(lang);
  if (lang === 'ar') {
    I18nManager.forceRTL(true);
  } else {
    I18nManager.forceRTL(false);
  }
  setI18nConfig(lang);
  await AsyncStorage.setItem('language', lang);
  return;
};

export const getCurrentLanguage = () => {
  return I18n.locale;
};

export function parseNum(number) {
  let language = I18n.locale;
  if (language == 'ar') {
    return convertToArabic(number);
  } else {
    return number;
  }
}
convertToArabic = number => {
  var id = ['۰', '۱', '۲', '۳', '٤', '۵', '٦', '۷', '۸', '۹'];
  number = number.toString();
  return number.replace(/[0-9]/g, function (w) {
    return id[+w];
  });
};
