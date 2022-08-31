import React from 'react';
import {View, StyleSheet, Text, TextInput, I18nManager} from 'react-native';
import {Input} from 'react-native-elements';
import {darkBlue, darkGray} from '../../../theme/colors';

const InputField = props => {
  return (
    <View style={styles.container}>
      <Input
        {...props}
        placeholder={props.placeholder}
        value={props.value}
        onChangeText={props.onChangeText}
        style={[
          {color: darkGray, textAlign: I18nManager.isRTL ? 'right' : 'left'},
          props.textStyle ? props.textStyle : {},
        ]}
        placeholderTextColor="#ABB4BD"
        inputContainerStyle={{
          borderWidth: 1,
          paddingVertical: 8,
          paddingHorizontal: 15,
          borderRadius: 12,
          borderColor: '#E6E9EA',
        }}
        containerStyle={[
          props.style ? props.style : {},
          {height: 55, marginBottom: 12},
        ]}
        selectionColor={darkBlue}
        secureTextEntry={props.secureTextEntry}
        autoCorrect={false}
        labelStyle={{fontSize: 14, fontWeight: 'normal', textAlign: 'left'}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  textInputStyle: {
    width: '100%',
    borderColor: 'black',
    borderWidth: 1,
  },
});

export default InputField;
