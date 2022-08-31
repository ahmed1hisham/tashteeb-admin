import React from 'react';
import {View} from 'react-native';
const Divider = props => {
  return (
    <View
      style={{
        borderTopColor: props.color ? props.color : '#E6E9EB',
        borderTopWidth: props.thickness ? props.thickness : 1,
        width: props.width ? props.width : '100%',
      }}
    />
  );
};

export default Divider;
