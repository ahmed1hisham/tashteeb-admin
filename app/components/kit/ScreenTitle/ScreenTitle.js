import React from 'react';
import {I18nManager, Pressable, StyleSheet, Text, View} from 'react-native';
import {black, darkGray} from '../../../theme/colors';
import Icon from 'react-native-vector-icons/AntDesign';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

const ScreenTitle = ({
  title,
  settings,
  backButton,
  onBackPress,
  titleStyle,
  titleHidden,
  onSettingsPress,
}) => {
  return (
    <View style={styles.container}>
      <View
        style={{
          justifyContent: 'center',
          marginLeft: 15,
        }}>
        {settings && !backButton ? <View style={{width: 28}} /> : null}
        {backButton ? (
          <Pressable style={{width: 28, height: 28}} onPress={onBackPress}>
            <Icon
              name={I18nManager.isRTL === true ? 'right' : 'left'}
              size={20}
              color={darkGray}
            />
          </Pressable>
        ) : null}
      </View>
      <Text
        style={[
          styles.titleStyle,
          titleStyle ? titleStyle : {},
          titleHidden && {color: 'transparent'},
        ]}>
        {title}
      </Text>

      <View
        style={{
          justifyContent: 'center',
          marginRight: 15,
        }}>
        {backButton && !settings ? <View style={{width: 28}} /> : null}
        {settings ? (
          <Pressable onPress={onSettingsPress} hitSlop={5}>
            <MaterialIcon name="settings" size={28} color={black} />
          </Pressable>
        ) : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleStyle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: black,
    flexWrap: 'wrap',
    marginBottom: 10,
    marginTop: 15,
    maxWidth: 220,
    textAlign: 'center',
  },
});
export default ScreenTitle;
