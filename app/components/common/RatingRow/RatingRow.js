import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {black, yellow} from '../../../theme/colors';
import IconLabel from '../../kit/IconLabel/IconLabel';

const RatingRow = ({title, rating}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.c}>{title}</Text>
      <View style={{width: 50, alignItems: 'flex-start'}}>
        <IconLabel text={rating} iconName="star" iconColor={yellow} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  titleStyle: {
    fontSize: 14,
    color: black,
    fontWeight: '500',
    textAlign: 'left',
  },
});

export default RatingRow;
