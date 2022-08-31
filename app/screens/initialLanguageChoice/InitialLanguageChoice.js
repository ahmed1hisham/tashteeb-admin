import I18n from '../../utils/I18n/I18n';
import React, {useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  SafeAreaView,
  StatusBar,
  useWindowDimensions,
} from 'react-native';
import WideButton from '../../components/kit/WideButton/WideButton';
import {changeLanguage, chooseLanguage} from '../../utils/TraslationManager';
import AuthContext from '../../contexts/AuthContext/AuthContext';

const InitialLanguageChoice = props => {
  const {width, height} = useWindowDimensions();
  const authContext = useContext(AuthContext);

  const arabicLanguage = async () => {
    await changeLanguage('ar');
    authContext.setIsLoggedIn(true);
  };

  const englishLanguage = async () => {
    await chooseLanguage('en');
    authContext.setIsLoggedIn(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
      <View style={styles.container}>
        <View
          style={{
            flex: 1,
            paddingTop: 50,
            paddingBottom: 100,
            paddingHorizontal: 20,
            alignItems: 'center',
          }}>
          {/* <Image
            source={require('../../assets/images/logo.png')}
            style={{
              width: width * 0.4,
              height: width * 0.4,
              resizeMode: 'contain',
              marginBottom: 40,
            }}
          /> */}
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <WideButton
              style={{marginBottom: 15}}
              titleStyle={{fontWeight: 'normal'}}
              title={I18n.t('languageChoice.continueInEnglish')}
              onPress={englishLanguage}
            />
            <WideButton
              title={I18n.t('languageChoice.continueInArabic')}
              titleStyle={{fontWeight: 'normal'}}
              onPress={arabicLanguage}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default InitialLanguageChoice;
