import React, {useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  SafeAreaView,
  Alert,
  ScrollView,
  FlatList,
  I18nManager,
} from 'react-native';
import ScreenTitle from '../../components/kit/ScreenTitle/ScreenTitle';
import Tag from '../../components/kit/Tag/Tag';
import {black, blue, darkBlue, primary, yellow} from '../../theme/colors';
import StarRating from 'react-native-star-rating';
import SmallButton from '../../components/kit/SmallButton/SmallButton';
import IconLabel from '../../components/kit/IconLabel/IconLabel';
import WideButton from '../../components/kit/WideButton/WideButton';
import RatingRow from '../../components/common/RatingRow/RatingRow';
import ReviewCard from '../../components/common/ReviewCard/ReviewCard';
import I18n from 'i18n-js';
import ImagesCarousel from '../../components/common/ImagesCarousel/ImagesCarousel';

export default Profile = props => {
  const professional = props.route.params.professional;
  const category = props.route.params.category;
  const overallRating =
    (professional.rating.speed +
      professional.rating.quality +
      professional.rating.manners +
      professional.rating.pricing) /
    4;

  return (
    <SafeAreaView style={styles.container}>
      <ScreenTitle
        title="Profile"
        backButton={true}
        onBackPress={() => props.navigation.goBack()}
        titleHidden
      />
      <ScrollView
        contentContainerStyle={{paddingBottom: 20}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            // source={{
            //   uri: 'https://kerrpanel.com/wp-content/uploads/2018/05/default_avatar-2.gif',
            // }}
            source={
              professional.image
                ? {uri: professional.image}
                : require('../../assets/images/generic-sanay3i.png')
            }
          />
          <Text style={styles.name}>
            {I18nManager.isRTL
              ? professional?.name?.ar
              : professional?.name?.en}
          </Text>
          <View
            style={{
              width: 140,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <IconLabel
              text={`${professional.pricing[category]} ${
                I18nManager.isRTL ? 'ج.م.' : 'EGP'
              }`}
              iconName={'payments'}
              iconColor={primary}
            />
            <IconLabel
              text={overallRating}
              iconName={'star'}
              iconColor={yellow}
            />
          </View>
          <View style={{height: 7}} />
          <IconLabel
            text={
              I18nManager.isRTL
                ? professional?.areaOfOperation?.ar
                : professional?.areaOfOperation?.en
            }
            iconName={'location-pin'}
            iconColor={primary}
          />
        </View>
        <View style={styles.bodyContent}>
          <View style={{width: '100%'}}>
            <Text style={styles.sectionTitle}>
              {I18n.t('profile.services')}
            </Text>
            <View style={styles.tagsContainer}>
              {professional.services.map(item => (
                <Tag key={item} text={I18n.t(`home.${item}`)} large />
              ))}
            </View>
          </View>
          {professional.description != '' && (
            <View style={{width: '100%', marginBottom: 20}}>
              <Text style={styles.sectionTitle}>{I18n.t('profile.about')}</Text>
              <Text style={styles.description}>{professional.description}</Text>
            </View>
          )}
          {professional.previousWork != [] && (
            <View style={{width: '100%'}}>
              <Text style={styles.sectionTitle}>
                {I18n.t('profile.previousWork')}
              </Text>
              <ImagesCarousel images={professional.previousWork} />
            </View>
          )}

          <View style={{width: '100%', marginTop: 25}}>
            <View style={styles.ratingSectionTitleStyle}>
              <Text style={styles.sectionTitle}>
                {I18n.t('profile.ratings')}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Text style={styles.ratingNumberStyle}>{overallRating}</Text>

                <View style={{width: 100}}>
                  <StarRating
                    disabled={true}
                    maxStars={5}
                    fullStarColor={yellow}
                    halfStarColor={yellow}
                    emptyStarColor={yellow}
                    // emptyStar="star"
                    rating={4}
                    starSize={20}
                    selectedStar={() => {}}
                  />
                </View>
              </View>
            </View>
            <RatingRow title={I18n.t('profile.workSpeed')} rating={'4.8'} />
            <RatingRow title={I18n.t('profile.workQuality')} rating={'5.0'} />
            <RatingRow title={I18n.t('profile.manners')} rating={'3.7'} />
            <RatingRow title={I18n.t('profile.valueForPrice')} rating={'4.3'} />
          </View>
        </View>
        <FlatList
          style={{marginTop: 20}}
          contentContainerStyle={{paddingLeft: 15}}
          data={professional.reviews}
          renderItem={({item}) => (
            <ReviewCard
              reviewerName={item.reviewerName}
              rating={item.rating}
              description={item.descriptiion}
            />
          )}
          horizontal
          ItemSeparatorComponent={() => <View style={{width: 15}} />}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
        />
      </ScrollView>
      <WideButton
        style={{paddingVertical: 15, alignSelf: 'center', marginBottom: 5}}
        title={I18n.t('profile.bookNow')}
        onPress={() => {
          // Alert.alert('Form to be filled');
          props.navigation.navigate('BookingForm', {
            professional: professional,
            category: category,
          });
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    alignSelf: 'center',
  },
  tagsContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 5,
    marginBottom: 20,
  },
  headerContent: {
    alignItems: 'center',
  },
  bodyContent: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  name: {
    fontSize: 18,
    color: black,
    fontWeight: '600',
    marginVertical: 5,
  },
  info: {
    fontSize: 18,
    color: black,
    marginBottom: 10,
  },
  description: {
    width: '100%',
    textAlign: 'left',
    fontSize: 14,
    color: '#A4ACAD',
    lineHeight: 20,
  },
  sectionTitle: {
    fontSize: 16,
    color: black,
    fontWeight: 'bold',
    textAlign: 'left',
    marginBottom: 8,
  },
  ratingNumberStyle: {
    fontSize: 16,
    fontWeight: '700',
    color: black,
    marginRight: 10,
  },
  ratingSectionTitleStyle: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
});
