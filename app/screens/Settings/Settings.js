import I18n from '../../utils/I18n/I18n';
import React from 'react';
import {
  I18nManager,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import SettingsItem from '../../components/common/SettingsItem/SettingsItem';
import Divider from '../../components/kit/Divider/Divider';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
import {asyncStorageGet} from '../../utils/StorageManager';
import {changeLanguage, setI18nConfig} from '../../utils/TraslationManager';

const Settings = props => {
  //   const authContext = useContext(AuthContext);
  //   const [loggingOut, setLoggingOut] = useState(false);

  //   const logout = async () => {
  //     setLoggingOut(true);
  //     await refreshSession()
  //       .then(async res => {
  //         await logoutUser()
  //           .then(() => {
  //             setLoggingOut(false);
  //             authContext.setIsLoggedIn(false);
  //           })
  //           .catch(err => {
  //             Alert.alert(
  //               err.response
  //                 ? err.response.data.message
  //                 : JSON.stringify(err.message),
  //             );
  //             setLoggingOut(false);
  //           });
  //       })
  //       .catch(err => {
  //         Alert.alert(
  //           err.response
  //             ? err.response.data.message
  //             : JSON.stringify(err.message),
  //         );
  //         setLoggingOut(false);
  //       });
  //   };

  //   const refreshSession = async () => {
  //     await refreshToken().catch(err => {
  //       Alert.alert(
  //         err.response ? err.response.data.message : JSON.stringify(err.message),
  //       );
  //       setLoggingOut(false);
  //     });
  //   };

  const toggleLanguage = async () => {
    const currLang = await asyncStorageGet('language');
    if (currLang === 'en') {
      await changeLanguage('ar');
    } else {
      await changeLanguage('en');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        style={{flex: 1}}
        contentContainerStyle={{height: '100%'}}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <ScreenTitle
          title={I18n.t('settings.settings')}
          // backButton={true}
          // onBackPress={() => {
          //   props.navigation.goBack();
          // }}
        />
        <View style={{marginTop: 30}}>
          <SettingsItem
            onPress={toggleLanguage}
            text={
              I18nManager.isRTL === false
                ? 'التحويل للعربية'
                : 'Switch to English'
            }
          />
          <Divider color="#E6E9EB" width="100%" thickness={1} />
          <SettingsItem
            onPress={() => {
              Linking.openURL('mailto:shataably@gmail.com');
            }}
            text={I18n.t('settings.contactUs')}
          />
          {/* <Divider color="#E6E9EB" width="100%" thickness={1} />
          <SettingsItem
            onPress={logout}
            text={loggingOut ? '...' : I18n.t('settings.signOut')}
            faded={true}
          /> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default Settings;
