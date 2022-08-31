import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {darkGray, primary} from '../../../theme/colors';
const {width, height} = Dimensions.get('window');
const CategoryCard = props => {
  return (
    <Pressable
      onPress={props.onPress}
      style={[styles.container, props.style ? props.style : {}]}>
      <Image style={styles.imageStyle} source={props.image} />
      <Text style={styles.textStyle}>{props.text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: (width - 60) / 2,
    height: 170,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 16,
    // shadowColor: '#000000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // elevation: 10,
    padding: 10,
  },
  imageStyle: {
    width: 70,
    height: 90,
    resizeMode: 'contain',
    marginBottom: 15,
    tintColor: primary,
  },
  textStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: darkGray,
    textAlign: 'center',
  },
});

export default React.memo(CategoryCard);
