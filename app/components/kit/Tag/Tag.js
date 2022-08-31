import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {lightBg} from '../../../theme/colors';

const Tag = ({text, large}) => {
  return (
    <View style={[styles.container, large && {borderRadius: 20}]}>
      <Text style={[{fontSize: 12, color: 'black'}, large && {fontSize: 14}]}>
        {text}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: lightBg,
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginEnd: 3,
    marginBottom: 2,
  },
});

export default Tag;
