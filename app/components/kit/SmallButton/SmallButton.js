import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
} from 'react-native';
import {blue, darkBlue, primary, yellow} from '../../../theme/colors';

const SmallButton = ({
  title,
  style,
  titleStyle,
  onPress,
  disabled,
  isLoading,
}) => {
  const {width, height} = useWindowDimensions();
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.container,
        style ? style : {},
        disabled ? {backgroundColor: 'grey'} : {},
      ]}>
      {isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text style={[styles.titleStyle, titleStyle ? titleStyle : {}]}>
          {title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
    width: 135,
    paddingVertical: 6,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    // shadowColor: blue,
    // shadowOpacity: 0.2,
    // shadowRadius: 20,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // elevation: 10,
  },
  titleStyle: {
    fontSize: 16,
    color: 'white',
    fontWeight: '500',
    textAlign: 'center',
  },
});
export default SmallButton;
