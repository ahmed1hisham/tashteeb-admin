import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import RatingRow from '../RatingRow/RatingRow';

const ReviewCard = ({reviewerName, rating, description}) => {
  return (
    <View style={styles.container}>
      <RatingRow title={reviewerName} rating={rating.toFixed(1)} />
      <Text
        style={{
          fontSize: 14,
          color: '#A4ACAD',
          lineHeight: 20,
          width: '100%',
          textAlign: 'left',
        }}>
        {description}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    height: 135,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 16,
    alignItems: 'center',
  },
});

export default ReviewCard;
