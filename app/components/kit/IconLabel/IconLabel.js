import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black} from '../../../theme/colors';

const IconLabel = ({text, iconName, iconColor}) => {
  return (
    <View style={styles.container}>
      <Icon name={iconName} size={20} color={iconColor} />
      <Text style={styles.textStyle}>{text}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 14,
    color: black,
    marginLeft: 3,
    fontWeight: '500',
  },
});

export default IconLabel;
