import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  I18nManager,
  Pressable,
} from 'react-native';
import WideButton from '../../kit/WideButton/WideButton';
import StarRating from 'react-native-star-rating';
import Tag from '../../kit/Tag/Tag';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {black, yellow} from '../../../theme/colors';
import I18n from 'i18n-js';
import {services} from '../../../utils/constants';

const {width, height} = Dimensions.get('window');

const ProfessionalCard = props => {
  const {professional} = props;
  const overallRating =
    (professional.rating.speed +
      professional.rating.quality +
      professional.rating.manners +
      professional.rating.pricing) /
    4;
  return (
    <Pressable
      onPress={() => {
        props.navigation.navigate('Profile', {
          professional: professional,
          category: props.category,
        });
      }}
      style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{alignItems: 'center', width: 60}}>
            <Image
              style={{
                width: 60,
                height: 60,
                borderRadius: 50,
                overflow: 'hidden',
                resizeMode: 'contain',
                marginBottom: 5,
              }}
              // source={{
              //   uri: 'https://kerrpanel.com/wp-content/uploads/2018/05/default_avatar-2.gif',
              // }}
              source={
                professional.image
                  ? {uri: professional.image}
                  : require('../../../assets/images/generic-sanay3i.png')
              }
            />
            {/* <Text
              style={{
                fontSize: 12,
                color: black,
                textAlign: 'right',
                fontWeight: 'normal',
                alignSelf: 'flex-start',
              }}>
              {` (${
                I18nManager.isRTL
                  ? professional?.areaOfOperation?.ar
                  : professional?.areaOfOperation?.en
              })`}
            </Text> */}
          </View>
          <View style={{marginLeft: 10}}>
            <Text style={{fontSize: 16, fontWeight: 'bold', textAlign: 'left'}}>
              {I18nManager.isRTL
                ? professional?.name?.ar
                : professional?.name?.en}
            </Text>
            <View
              style={{
                width: 170,
                // backgroundColor: 'red',
                flexDirection: 'row',
                alignItems: 'center',
                marginVertical: 8,
                flexWrap: 'wrap',
              }}>
              {professional.services.map(item => (
                <Tag key={item} text={I18n.t(`home.${item}`)} />
              ))}
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <View style={{width: 100, marginRight: 5}}>
                <StarRating
                  disabled={true}
                  maxStars={5}
                  fullStarColor={yellow}
                  // halfStarColor={yellow}
                  emptyStarColor={yellow}
                  halfStar={'star'}
                  // starStyle={{backgroundColor: 'red', transform: {scaleX: -1}}}
                  halfStarEnabled={false}
                  rating={overallRating}
                  starSize={20}
                  selectedStar={() => {}}
                />
              </View>
              {/* <Text>(333)</Text> */}
            </View>
          </View>
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'flex-end',
          }}>
          <Text
            style={{
              width: '100%',
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'right',
            }}>
            {`${professional.pricing[props.category]} ${
              I18nManager.isRTL ? 'ج.م.' : 'EGP'
            }`}
          </Text>
        </View>
      </View>
      <View style={{width: '100%', flexDirection: 'row'}}></View>
      <View style={{width: '100%', marginTop: 20}}>
        <WideButton
          onPress={() => {
            props.navigation.navigate('Profile', {
              professional: professional,
              category: props.category,
            });
          }}
          style={{width: '100%'}}
          title={I18n.t('profile.bookNow')}
        />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width - 40,
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white',
    // shadowColor: '#000000',
    // shadowOpacity: 0.1,
    // shadowRadius: 10,
    // shadowOffset: {
    //   height: 0,
    //   width: 0,
    // },
    // elevation: 10,
    alignSelf: 'center',
  },
});

export default ProfessionalCard;
