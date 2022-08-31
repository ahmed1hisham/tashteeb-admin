import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import {darkGray} from '../../../theme/colors';
const SettingsItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.container}>
      <Text
        style={{
          fontSize: 18,
          color: darkGray,
          fontWeight: '500',
          opacity: props.faded ? 0.5 : 1,
        }}>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
  },
});

export default SettingsItem;
