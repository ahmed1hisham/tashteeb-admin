import React from 'react';
import {
  ActivityIndicator,
  Alert,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {blue, darkBlue, primary} from '../../../theme/colors';

const WideButton = props => {
  const {width, height} = useWindowDimensions();
  return (
    <Pressable
      onPress={props.onPress}
      disabled={props.disabled}
      style={[
        styles.container,
        {width: width - 40},
        props.style ? props.style : {},
        props.disabled ? {backgroundColor: 'grey'} : {},
      ]}>
      {props.isLoading ? (
        <ActivityIndicator size="small" color="white" />
      ) : (
        <Text
          style={[styles.titleStyle, props.titleStyle ? props.titleStyle : {}]}>
          {props.title}
        </Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: primary,
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
    fontWeight: '400',
    textAlign: 'center',
  },
});
export default WideButton;
