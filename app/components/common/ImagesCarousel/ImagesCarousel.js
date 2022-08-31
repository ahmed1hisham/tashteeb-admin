import React, {useRef, useState} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import Carousel from 'react-native-snap-carousel';

const ImagesCarousel = ({images = []}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const ref = useRef(null);

  const renderImage = ({item, index}) => {
    return (
      <Image
        style={{width: '100%', height: 200, resizeMode: 'contain'}}
        source={{uri: item}}
      />
    );
  };

  return (
    <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center'}}>
      <Carousel
        layout="default"
        ref={ref}
        data={images}
        keyExtractor={(item, index) => index}
        sliderWidth={300}
        itemWidth={300}
        renderItem={renderImage}
        onSnapToItem={index => setActiveIndex(index)}
        removeClippedSubviews={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ImagesCarousel;
