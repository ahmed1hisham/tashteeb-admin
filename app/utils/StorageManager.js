import AsyncStorage from '@react-native-async-storage/async-storage';

export const asyncStorageSave = async (key, value) => {
  try {
    return await AsyncStorage.setItem(key, value);
  } catch (e) {
    console.log(e);
  }
};

export const asyncStorageGet = async key => {
  try {
    return await AsyncStorage.getItem(key);
  } catch (e) {
    console.log(e);
  }
};

export const asyncStorageRemove = async key => {
  return await AsyncStorage.removeItem(key).catch(e => {
    console.log(e);
  });
};
